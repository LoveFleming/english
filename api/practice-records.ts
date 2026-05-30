import { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_REPO = 'LoveFleming/english-data';
const GITHUB_API = 'https://api.github.com';

async function readFile(path: string): Promise<{ content: any; sha: string }> {
  const res = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (res.status === 404) return { content: null, sha: '' };
  const data = await res.json();
  return { content: data.content ? JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8')) : null, sha: data.sha };
}

async function writeFile(path: string, content: any, sha: string | null, message: string): Promise<void> {
  const body: any = { message, content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64') };
  if (sha) body.sha = sha;
  await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify(body),
  });
}

async function uploadImage(filename: string, base64Data: string): Promise<string> {
  const path = `practice-images/${filename}`;
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
    body: JSON.stringify({ message: `upload ${filename}`, content: base64Data, ...(sha ? { sha } : {}) }),
  });
  // For private repos, return a path that the frontend can use
  // We'll serve via /api/practice-records?action=image&path=xxx
  return `/api/practice-records?action=image&path=${encodeURIComponent(path)}`;
}

async function getImageContent(path: string, res: VercelResponse) {
  const ghRes = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/${path}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (!ghRes.ok) return res.status(404).json({ error: 'image not found' });
  const data = await ghRes.json();
  const buffer = Buffer.from(data.content, 'base64');
  const ext = path.split('.').pop()?.toLowerCase();
  const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'gif' ? 'image/gif' : 'image/png';
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'public, max-age=86400');
  return res.status(200).send(buffer);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;
  const RECORDS_PATH = 'practice-records.json';

  try {
    // ── Serve image from GitHub ──
    if (action === 'image' && req.method === 'GET') {
      const { path } = req.query;
      if (!path || typeof path !== 'string') return res.status(400).json({ error: 'missing path' });
      return await getImageContent(path, res);
    }

    // ── GET records ──
    if (action === 'list' && req.method === 'GET') {
      const { username } = req.query;
      const { content } = await readFile(RECORDS_PATH);
      const records = content || [];
      const filtered = username ? records.filter((r: any) => r.username === username) : records;
      return res.json(filtered);
    }

    // ── POST create record ──
    if (action === 'create' && req.method === 'POST') {
      const { username, valueKey, date, what, reflection, imagesBase64 } = req.body;
      if (!username || !valueKey || !what) return res.status(400).json({ error: 'missing required fields' });

      const images: string[] = [];
      if (imagesBase64 && imagesBase64.length > 0) {
        for (const img of imagesBase64) {
          const filename = `${username}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${img.ext}`;
          const url = await uploadImage(filename, img.base64);
          images.push(url);
        }
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
        images,
        createdAt: Date.now(),
      };
      records.unshift(newRecord);
      if (records.length > 200) records.length = 200;
      await writeFile(RECORDS_PATH, records, sha, `add practice record ${newRecord.id}`);
      return res.json({ success: true, record: newRecord });
    }

    // ── POST update record ──
    if (action === 'update' && req.method === 'POST') {
      const { username, recordId, valueKey, date, what, reflection, imagesBase64 } = req.body;
      if (!username || !recordId) return res.status(400).json({ error: 'missing data' });

      const { content, sha } = await readFile(RECORDS_PATH);
      const records: any[] = content || [];
      const idx = records.findIndex((r: any) => r.id === recordId && r.username === username);
      if (idx === -1) return res.status(404).json({ error: 'record not found' });

      // Preserve existing images
      const existing = records[idx];
      let images: string[] = existing.images ? [...existing.images] : [];
      // Migrate legacy imageUrl
      if (existing.imageUrl && !images.includes(existing.imageUrl)) {
        images.unshift(existing.imageUrl);
      }
      // Append new images
      if (imagesBase64 && imagesBase64.length > 0) {
        for (const img of imagesBase64) {
          const filename = `${username}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${img.ext}`;
          const url = await uploadImage(filename, img.base64);
          images.push(url);
        }
      }

      records[idx] = {
        ...existing,
        valueKey: valueKey ?? existing.valueKey,
        date: date ?? existing.date,
        what: what ?? existing.what,
        reflection: reflection ?? existing.reflection,
        images,
        imageUrl: undefined,
      };
      await writeFile(RECORDS_PATH, records, sha, `update practice record ${recordId}`);
      return res.json({ success: true, record: records[idx] });
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
