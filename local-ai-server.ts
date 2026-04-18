// Local AI Report Server - runs on Mac mini
// Receives exam data, calls AI, returns chart config
// Start: node local-ai-server.js

import express from 'express';
import cors from 'cors';

const ZAI_API_KEY = process.env.ZAI_API_KEY;
const AI_API_URL = process.env.AI_API_URL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const AI_MODEL = process.env.AI_MODEL || 'glm-4-flash';
const PORT = process.env.AI_PORT || 3456;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ai: ZAI_API_KEY ? 'configured' : 'missing key' });
});

app.post('/analyze', async (req, res) => {
  const { scores, username } = req.body;
  if (!scores || !username) {
    return res.status(400).json({ error: 'missing scores or username' });
  }
  if (!ZAI_API_KEY) {
    return res.status(500).json({ error: 'AI API key not configured' });
  }

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
  "summary": {
    "totalExams": 總考試次數,
    "averageScore": 平均分,
    "bestSubject": "最好科目",
    "weakestSubject": "最弱科目",
    "trend": "進步中 或 穩定 或 需要加油"
  },
  "charts": [
    {
      "type": "line",
      "title": "各科成績趨勢",
      "xKey": "date",
      "yKey": "score",
      "data": [{"date": "M/D", "score": 分數, "subject": "科目名"}],
      "color": "#4f46e5"
    },
    {
      "type": "bar",
      "title": "各科目平均分",
      "xKey": "subject",
      "yKey": "avgScore",
      "data": [{"subject": "科目", "avgScore": 平均分, "examCount": 次數}],
      "color": "#10b981"
    },
    {
      "type": "pie",
      "title": "錯題類型分佈",
      "data": [{"name": "錯題類型", "value": 次數, "color": "#顏色"}]
    }
  ],
  "recommendations": ["具體建議1", "具體建議2", "具體建議3"],
  "encouragement": "一句鼓勵的話"
}

注意：
1. 錯題類型從 wrongQuestions 的 explanation 歸納（雙重所有格、主格受格混淆等）
2. 趨勢圖按時間正序
3. 建議要具體
4. 只輸出 JSON`;

  try {
    const aiRes = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    const aiData = await aiRes.json();
    const content = aiData.choices?.[0]?.message?.content || '';
    
    let jsonStr = content.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const report = JSON.parse(jsonStr);
    report._source = 'ai';
    res.json(report);
  } catch (err: any) {
    console.error('AI call failed:', err);
    res.status(500).json({ error: 'AI 分析失敗', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 AI Report Server running on http://localhost:${PORT}`);
  console.log(`   AI: ${ZAI_API_KEY ? 'configured' : '⚠️  ZAI_API_KEY not set'}`);
});
