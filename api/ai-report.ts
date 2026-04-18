import { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'LoveFleming/english-data';

async function readDB(): Promise<any> {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/db.json`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return JSON.parse(content);
}

function generateFallbackReport(scores: any[]) {
  const subjectMap: Record<string, number[]> = {};
  const errorTypes: Record<string, number> = {};

  for (const s of scores) {
    if (!subjectMap[s.subject]) subjectMap[s.subject] = [];
    subjectMap[s.subject].push(s.score);
    for (const wq of (s.wrongQuestions || [])) {
      const type = wq.explanation?.split('：')[0] || wq.explanation?.split('→')[0] || '其他';
      errorTypes[type] = (errorTypes[type] || 0) + 1;
    }
  }

  const trendData = [...scores].reverse().map(s => ({
    date: new Date(s.date).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' }),
    score: s.score,
    subject: s.subject,
  }));

  const barData = Object.entries(subjectMap).map(([subject, scrs]) => ({
    subject,
    avgScore: Math.round(scrs.reduce((a, b) => a + b, 0) / scrs.length),
    examCount: scrs.length,
  }));

  const pieData = Object.entries(errorTypes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value], i) => ({
      name,
      value,
      color: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'][i],
    }));

  const avgScore = scores.length ? Math.round(scores.reduce((a: number, s: any) => a + s.score, 0) / scores.length) : 0;

  // Generate basic recommendations from data
  const recs: string[] = [];
  const weakSubjects = barData.filter(b => b.avgScore < 90).sort((a, b) => a.avgScore - b.avgScore);
  if (weakSubjects.length > 0) {
    recs.push(`${weakSubjects[0].subject} 平均 ${weakSubjects[0].avgScore} 分，建議多練習這個單元`);
  }
  const topErrors = Object.entries(errorTypes).sort((a, b) => b[1] - a[1]).slice(0, 2);
  for (const [type, count] of topErrors) {
    recs.push(`「${type}」類型錯了 ${count} 次，需要加強理解`);
  }
  if (recs.length === 0) recs.push('表現非常好！繼續保持！');

  return {
    summary: {
      totalExams: scores.length,
      averageScore: avgScore,
      bestSubject: barData.sort((a, b) => b.avgScore - a.avgScore)[0]?.subject || '',
      weakestSubject: barData.sort((a, b) => a.avgScore - b.avgScore)[0]?.subject || '',
      trend: avgScore >= 90 ? '穩定' : avgScore >= 70 ? '進步中' : '需要加油',
    },
    charts: [
      { type: 'line', title: '各科成績趨勢', xKey: 'date', yKey: 'score', data: trendData, color: '#4f46e5' },
      { type: 'bar', title: '各科目平均分', xKey: 'subject', yKey: 'avgScore', data: barData, color: '#10b981' },
      { type: 'pie', title: '錯題類型分佈', data: pieData },
    ],
    recommendations: recs,
    encouragement: avgScore >= 90 ? '小元寶國王太厲害了！保持下去 👑' : '小元寶國王加油！每次進步一點點 💪',
    _source: 'local',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'missing username' });

  try {
    const rawDb = await readDB();
    const scores = rawDb.scores?.[username] || [];
    if (scores.length === 0) return res.status(404).json({ error: '尚無考試記錄' });

    // If AI prompt provided, forward to local AI (Mac mini proxy)
    // Otherwise return basic chart data
    const report = generateFallbackReport(scores);
    return res.json(report);

  } catch (err: any) {
    console.error('Report error:', err);
    return res.status(500).json({ error: '生成報告失敗', detail: String(err) });
  }
}
