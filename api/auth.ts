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

    // Save score (with question status tracking)
    if (action === 'save-score' && req.method === 'POST') {
      const { username, score, questionResults, examDetail } = req.body;
      if (!username || score === undefined) return res.status(400).json({ error: 'missing data' });
      const db = await readDB();
      if (!db.data.scores) db.data.scores = {};
      if (!db.data.scores[username]) db.data.scores[username] = [];
      db.data.scores[username] = [score, ...db.data.scores[username]];
      // Track which questions were answered correctly/incorrectly
      if (!db.data.questionStatus) db.data.questionStatus = {};
      if (!db.data.questionStatus[username]) db.data.questionStatus[username] = {};
      if (questionResults && Array.isArray(questionResults)) {
        for (const qr of questionResults) {
          db.data.questionStatus[username][qr.id] = qr.isCorrect ? 'success' : 'fail';
        }
      }
      // Save full exam detail for weakness analysis
      if (!db.data.examHistory) db.data.examHistory = {};
      if (!db.data.examHistory[username]) db.data.examHistory[username] = [];
      if (examDetail) {
        db.data.examHistory[username].unshift(examDetail);
        // Keep last 50 exams per user
        if (db.data.examHistory[username].length > 50) {
          db.data.examHistory[username] = db.data.examHistory[username].slice(0, 50);
        }
      }
      await writeDB(db.data, db.sha);
      return res.json({ success: true });
    }

    // Get question status for a user
    if (action === 'question-status' && req.method === 'GET') {
      const { username } = req.query;
      if (!username) return res.status(400).json({ error: 'missing username' });
      const db = await readDB();
      return res.json(db.data.questionStatus?.[username] || {});
    }

    // Get exam history for a user (with detail)
    if (action === 'exam-history' && req.method === 'GET') {
      const { username } = req.query;
      if (!username) return res.status(400).json({ error: 'missing username' });
      const db = await readDB();
      return res.json(db.data.examHistory?.[username] || []);
    }

    // Analyze weaknesses for a user
    if (action === 'analyze-weakness' && req.method === 'GET') {
      const { username } = req.query;
      if (!username) return res.status(400).json({ error: 'missing username' });
      const db = await readDB();
      const history = db.data.examHistory?.[username] || [];
      if (history.length === 0) return res.json({ error: '尚無考試記錄' });
      
      // Aggregate wrong questions
      const wrongQuestions: Record<string, { count: number; question: string; explanation: string; category: string }> = {};
      const categoryStats: Record<string, { total: number; wrong: number }> = {};
      
      for (const exam of history) {
        if (!exam.questions) continue;
        for (const q of exam.questions) {
          if (!q.isCorrect) {
            if (!wrongQuestions[q.questionId]) {
              wrongQuestions[q.questionId] = { count: 0, question: q.question, explanation: q.explanation, category: q.category || 'unknown' };
            }
            wrongQuestions[q.questionId].count++;
          }
          const cat = q.category || 'unknown';
          if (!categoryStats[cat]) categoryStats[cat] = { total: 0, wrong: 0 };
          categoryStats[cat].total++;
          if (!q.isCorrect) categoryStats[cat].wrong++;
        }
      }
      
      // Sort by frequency
      const weakPoints = Object.entries(wrongQuestions)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 20)
        .map(([id, data]) => ({ id, ...data }));
      
      const categoryAnalysis = Object.entries(categoryStats)
        .map(([cat, stats]) => ({ category: cat, accuracy: Math.round(((stats.total - stats.wrong) / stats.total) * 100), total: stats.total, wrong: stats.wrong }))
        .sort((a, b) => a.accuracy - b.accuracy);
      
      return res.json({ totalExams: history.length, weakPoints, categoryAnalysis });
    }

    return res.status(404).json({ error: 'unknown action' });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
