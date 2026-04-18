import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const API_BASE = 'https://english-eight-wine.vercel.app/api/auth';
const AI_REPORT_API = 'https://english-eight-wine.vercel.app/api/ai-report';
const LOCAL_AI = 'http://localhost:3456';

interface ChartConfig {
  type: 'line' | 'bar' | 'pie';
  title: string;
  xKey?: string;
  yKey?: string;
  data: any[];
  color?: string;
}

interface ReportConfig {
  summary: {
    totalExams: number;
    averageScore: number;
    bestSubject: string;
    weakestSubject: string;
    trend: string;
  };
  charts: ChartConfig[];
  recommendations: string[];
  encouragement: string;
  _fallback?: boolean;
  _source?: string;
}

export default function LearningReport() {
  const [username] = useState(() => localStorage.getItem('english_user') || '');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportConfig | null>(null);
  const [error, setError] = useState('');

  const generateReport = async () => {
    if (!username) {
      setError('請先登入');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Step 1: Get scores from Vercel
      const scoresRes = await fetch(`${API_BASE}?action=scores&username=${username}`);
      const scores = await scoresRes.json();
      if (!scores.length) throw new Error('尚無考試記錄');

      // Step 2: Try local AI first
      let report: ReportConfig | null = null;
      try {
        const localRes = await fetch(`${LOCAL_AI}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, scores }),
          signal: AbortSignal.timeout(30000),
        });
        if (localRes.ok) {
          report = await localRes.json();
        }
      } catch {
        // Local AI not available, fall through
      }

      // Step 3: Fallback to Vercel basic report
      if (!report) {
        const res = await fetch(`${AI_REPORT_API}?username=${username}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || '生成失敗');
        }
        report = await res.json();
      }

      setReport(report);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-load on mount
  useEffect(() => {
    if (username) generateReport();
  }, [username]);

  const renderChart = (chart: ChartConfig, index: number) => {
    if (chart.type === 'line' && chart.xKey && chart.yKey) {
      // Group by subject for multi-line
      const subjects = [...new Set(chart.data.map((d: any) => d.subject))];
      const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
      
      return (
        <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">{chart.title}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={chart.xKey} tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {subjects.map((subj, i) => (
                <Line
                  key={subj}
                  type="monotone"
                  dataKey={chart.yKey!}
                  data={chart.data.filter((d: any) => d.subject === subj)}
                  name={subj}
                  stroke={colors[i % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (chart.type === 'bar' && chart.xKey && chart.yKey) {
      return (
        <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">{chart.title}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={chart.xKey} tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey={chart.yKey} fill={chart.color || '#10b981'} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (chart.type === 'pie') {
      return (
        <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">{chart.title}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={{ strokeWidth: 1 }}
              >
                {chart.data.map((entry: any, i: number) => (
                  <Cell key={i} fill={entry.color || ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'][i % 6]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
  };

  if (!username) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">請先登入查看學習報告</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📊 學習報告</h1>
            <p className="text-sm text-gray-500 mt-1">AI 分析小元寶國王的英文學習狀況</p>
          </div>
          <button
            onClick={generateReport}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                AI 分析中...
              </>
            ) : (
              '🔄 重新分析'
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading && !report && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 text-center">
            <div className="animate-bounce text-4xl mb-4">🤖</div>
            <p className="text-indigo-700 font-medium">AI 正在分析考試記錄...</p>
            <p className="text-indigo-500 text-sm mt-2">這需要幾秒鐘，請稍候</p>
          </div>
        )}

        {report && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 text-white">
                <p className="text-xs opacity-80">總考試次數</p>
                <p className="text-2xl font-bold">{report.summary.totalExams}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
                <p className="text-xs opacity-80">平均分</p>
                <p className="text-2xl font-bold">{report.summary.averageScore}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <p className="text-xs opacity-80">最強科目</p>
                <p className="text-sm font-bold mt-1">{report.summary.bestSubject}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white">
                <p className="text-xs opacity-80">最弱科目</p>
                <p className="text-sm font-bold mt-1">{report.summary.weakestSubject}</p>
              </div>
              <div className={`bg-gradient-to-br ${report.summary.trend === '進步中' ? 'from-green-500 to-green-600' : report.summary.trend === '穩定' ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-xl p-4 text-white`}>
                <p className="text-xs opacity-80">學習趨勢</p>
                <p className="text-lg font-bold mt-1">{report.summary.trend}</p>
              </div>
            </div>

            {/* AI Badge */}
            {report._source === 'ai' ? (
              <div className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 text-xs text-purple-600 flex items-center gap-2">
                🤖 AI 分析報告 — 由 Mac mini 本地 AI 即時生成
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 flex items-center gap-2">
                📊 基礎圖表模式（啟動 local AI server 可獲得 AI 分析）
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.charts.map((chart, i) => renderChart(chart, i))}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                💡 AI 建議
              </h3>
              <ul className="space-y-2">
                {report.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-indigo-500 mt-0.5">▸</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Encouragement */}
            <div className="bg-gradient-to-r from-pink-50 to-indigo-50 rounded-xl border border-pink-100 p-6 text-center">
              <p className="text-lg font-medium text-gray-700">{report.encouragement}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
