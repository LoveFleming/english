import { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'LoveFleming/english-data';
const GITHUB_API = 'https://api.github.com';

function hashPassword(password: string): string {
  return Buffer.from(password + 'english_app_salt_2026').toString('base64');
}

async function readDB(): Promise<any> {
  const res = await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/db.json`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { data: JSON.parse(content), sha: data.sha };
}

async function writeDB(content: any, sha: string): Promise<void> {
  await fetch(`${GITHUB_API}/repos/${GITHUB_REPO}/contents/db.json`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `update data ${new Date().toISOString()}`,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
      sha,
    }),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;

  try {
    // Register
    if (action === 'register' && req.method === 'POST') {
      const { username, password } = req.body;
      if (!username || !password || username.length < 3 || password.length < 3) {
        return res.status(400).json({ error: '帳號和密碼至少需要 3 個字元' });
      }
      const db = await readDB();
      if (db.data.users[username]) {
        return res.status(409).json({ error: '帳號已存在' });
      }
      db.data.users[username] = {
        password: hashPassword(password),
        createdAt: new Date().toISOString(),
      };
      db.data.scores[username] = [];
      await writeDB(db.data, db.sha);
      return res.json({ success: true, username });
    }

    // Login
    if (action === 'login' && req.method === 'POST') {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: '請輸入帳號和密碼' });
      }
      const db = await readDB();
      const user = db.data.users[username];
      if (!user || user.password !== hashPassword(password)) {
        return res.status(401).json({ error: '帳號或密碼錯誤' });
      }
      return res.json({ success: true, username, createdAt: user.createdAt });
    }

    // Get scores
    if (action === 'scores' && req.method === 'GET') {
      const { username } = req.query;
      if (!username) return res.status(400).json({ error: 'missing username' });
      const db = await readDB();
      return res.json(db.data.scores[username] || []);
    }

    // Save score
    if (action === 'save-score' && req.method === 'POST') {
      const { username, score } = req.body;
      if (!username || !score) return res.status(400).json({ error: 'missing data' });
      const db = await readDB();
      if (!db.data.scores[username]) db.data.scores[username] = [];
      db.data.scores[username] = [score, ...db.data.scores[username]];
      await writeDB(db.data, db.sha);
      return res.json({ success: true });
    }

    return res.status(404).json({ error: 'unknown action' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
