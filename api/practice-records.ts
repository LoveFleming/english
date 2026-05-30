import { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'LoveFleming/english-data';
const GITHUB_API = 'https://api.github.com';

// ── GitHub helpers ──
async function readFile(path: string): Promise<{ content: any; sha: string }> {
  const res = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (res.status === 404) return { content: null, sha: '' };
  const data = await res.json();
  return { content: data.content ? JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')) : null, sha: data.sha };
}

async function writeFile(path: string, content: any, sha: string | null, message: string): Promise<void> {
  const body: any = {
    message,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
  };
  if (sha) body.sha = sha;
  await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify(body),
  });
}

async function uploadImage(filename: string, base64Data: string): Promise<string> {
  const path = `practice-images/${filename}`;
  // Check if exists
  let sha: string | null = null;
  try {
    const res = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
    });
    if (res.ok) { const d = await res.json(); sha = d.sha; }
  } catch {}
  await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify({ message: `upload practice image ${filename}`, content: base64Data, ...(sha ? { sha } : {}) }),
  });
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${path}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;
  const RECORDS_PATH = 'practice-records.json';

  try {
    // ── GET records ──
    if (action === 'list' && req.method === 'GET') {
      const { username } = req.query;
      const { content } = await readFile(RECORDS_PATH);
      const records = content || [];
      const filtered = username ? records.filter((r: any) => r.username === username) : records;
      return res.json(filtered);
    }

    // ── POST create record (with optional image) ──
    if (action === 'create' && req.method === 'POST') {
      const { username, valueKey, date, what, reflection, imageBase64, imageExt } = req.body;
      if (!username || !valueKey || !what) {
        return res.status(400).json({ error: 'missing required fields' });
      }

      let imageUrl: string | undefined;
      if (imageBase64) {
        const ext = imageExt || 'png';
        const filename = `${username}-${Date.now()}.${ext}`;
        imageUrl = await uploadImage(filename, imageBase64);
      }

      const { content, sha } = await readFile(RECORDS_PATH);
      const records: any[] = content || [];
      const newRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        username,
        valueKey,
        date: date || new Date().toISOString().slice(0, 10),
        what,
        reflection: reflection || '',
        imageUrl,
        createdAt: Date.now(),
      };
      records.unshift(newRecord);
      // Keep last 200 records
      if (records.length > 200) records.length = 200;
      await writeFile(RECORDS_PATH, records, sha, `add practice record ${newRecord.id}`);
      return res.json({ success: true, record: newRecord });
    }

    // ── DELETE record ──
    if (action === 'delete' && req.method === 'POST') {
      const { username, recordId } = req.body;
      if (!username || !recordId) return res.status(400).json({ error: 'missing data' });
      const { content, sha } = await readFile(RECORDS_PATH);
      const records: any[] = content || [];
      const filtered = records.filter((r: any) => !(r.id === recordId && r.username === username));
      await writeFile(RECORDS_PATH, filtered, sha, `delete practice record ${recordId}`);
      return res.json({ success: true });
    }

    return res.status(404).json({ error: 'unknown action' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
