const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());

// Read DB
function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return { users: {}, scores: {} };
  }
}

// Write DB
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Simple hash (not production-grade, but better than plain text)
function hashPassword(password) {
  return Buffer.from(password + 'english_app_salt_2026').toString('base64');
}

// Register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: '帳號和密碼至少需要 3 個字元' });
  }
  
  const db = readDB();
  if (db.users[username]) {
    return res.status(409).json({ error: '帳號已存在' });
  }
  
  db.users[username] = {
    password: hashPassword(password),
    createdAt: new Date().toISOString()
  };
  db.scores[username] = [];
  writeDB(db);
  
  res.json({ success: true, username });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '請輸入帳號和密碼' });
  }
  
  const db = readDB();
  const user = db.users[username];
  
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ error: '帳號或密碼錯誤' });
  }
  
  res.json({ success: true, username, createdAt: user.createdAt });
});

// Get scores
app.get('/api/scores/:username', (req, res) => {
  const db = readDB();
  const scores = db.scores[req.params.username] || [];
  res.json(scores);
});

// Save score
app.post('/api/scores/:username', (req, res) => {
  const db = readDB();
  if (!db.scores[req.params.username]) {
    db.scores[req.params.username] = [];
  }
  db.scores[req.params.username] = [req.body, ...db.scores[req.params.username]];
  writeDB(db);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🔐 Auth API running on http://localhost:${PORT}`);
});
