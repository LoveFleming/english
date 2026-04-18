import { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac } from 'crypto';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'LoveFleming/english-data';
const ZAI_API_KEY = process.env.ZAI_API_KEY;
const AI_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const AI_MODEL = 'glm-5.1';

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

async function generateJWT(): Promise<string> {
  const [id, secret] = ZAI_API_KEY!.split('.');
  const now = Date.now();
  const payload = JSON.stringify({
    api_key: id,
    exp: now + 3600 * 1000,
    timestamp: now,
  });
  const header = JSON.stringify({ alg: 'HS256', sign_type: 'SIGN', typ: 'JWT' });
  const base64url = (s: string) => Buffer.from(s).toString('base64url');
  const headerB64 = base64url(header);
  const payloadB64 = base64url(payload);
  const signature = createHmac('sha256', secret)
    .update(`${headerB64}.${payloadB64}`)
    .digest('base64url');
  return `${headerB64}.${payloadB64}.${signature}`;
}

async function callAI(prompt: string): Promise<string> {
  const token = await generateJWT();
  const res = await fetch(AI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(`AI error: ${data.error.code} ${data.error.message}`);
  }
  return data.choices?.[0]?.message?.content || '';
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
    _source: 'fallback',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'missing username' });

  try {
    const rawDb = await readDB();
    const scores = rawDb.scores?.[username] || [];
    if (scores.length === 0) return res.status(404).json({ error: '尚無考試記錄' });

    // Try AI analysis first
    if (ZAI_API_KEY) {
      try {
        const summary = scores.map((s: any) => ({
          subject: s.subject,
          score: s.score,
          totalQuestions: s.totalQuestions,
          correctAnswers: s.correctAnswers,
          date: s.date?.slice(0, 10),
          wrongQuestions: (s.wrongQuestions || []).map((wq: any) => ({
            id: wq.id,
            question: wq.question?.slice(0, 60),
            correctAnswer: wq.correctAnswer,
            userAnswer: wq.userAnswer,
            explanation: wq.explanation?.slice(0, 80),
          })),
        }));

        const prompt = `你是小元寶國王的英文學習分析師。根據以下考試記錄，生成學習報告。

考試記錄（按時間倒序）：
${JSON.stringify(summary, null, 2)}

請嚴格按照以下 JSON 格式回應（不要加 markdown code block，直接輸出 JSON）：

{
  "summary": { "totalExams": 總次數, "averageScore": 平均分, "bestSubject": "最好科目", "weakestSubject": "最弱科目", "trend": "進步中/穩定/需要加油" },
  "charts": [
    { "type": "line", "title": "各科成績趨勢", "xKey": "date", "yKey": "score", "data": [{"date":"M/D","score":分數,"subject":"科目"}], "color": "#4f46e5" },
    { "type": "bar", "title": "各科目平均分", "xKey": "subject", "yKey": "avgScore", "data": [{"subject":"科目","avgScore":平均分,"examCount":次數}], "color": "#10b981" },
    { "type": "pie", "title": "錯題類型分佈", "data": [{"name":"類型","value":次數,"color":"#顏色"}] }
  ],
  "recommendations": ["具體建議1","具體建議2","具體建議3"],
  "encouragement": "一句鼓勵的話"
}

注意：1.錯題類型從 explanation 歸納 2.趨勢圖按時間正序 3.只輸出JSON`;

        const content = await callAI(prompt);
        if (content) {
          let jsonStr = content.trim();
          if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
          }
          const report = JSON.parse(jsonStr);
          report._source = 'ai';
          return res.json(report);
        }
      } catch (aiErr: any) {
        console.error('AI failed, using fallback:', aiErr.message);
      }
    }

    // Fallback: basic chart data
    const report = generateFallbackReport(scores);
    return res.json(report);

  } catch (err: any) {
    console.error('Report error:', err);
    return res.status(500).json({ error: '生成報告失敗', detail: String(err) });
  }
}
