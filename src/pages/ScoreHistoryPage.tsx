import React from "react";
import { useAuth, ExamScore } from "../contexts/AuthContext";
import { Card } from "../components/ui/shared";

export default function ScoreHistoryPage() {
  const { user, scores, exportWrongQuestions } = useAuth();

  if (!user) return null;

  const handleExport = () => {
    const data = exportWrongQuestions();
    if (!data) {
      alert("沒有錯誤題目可匯出");
      return;
    }
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wrong_questions_${user.username}_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4 border-zinc-200">
        <h1 className="text-3xl font-bold text-stone-900">📊 考試成績記錄</h1>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          匯出錯誤題目給 AI 分析
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center justify-center p-4 border-blue-200 bg-blue-50/50">
          <div className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-1">總考試次數</div>
          <div className="text-3xl font-bold text-blue-700">{scores.length}</div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 border-green-200 bg-green-50/50">
          <div className="text-sm font-medium text-green-600 uppercase tracking-wider mb-1">最高分</div>
          <div className="text-3xl font-bold text-green-600">
            {scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0}%
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 border-yellow-200 bg-yellow-50/50">
          <div className="text-sm font-medium text-yellow-600 uppercase tracking-wider mb-1">平均分數</div>
          <div className="text-3xl font-bold text-yellow-600">
            {scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length) : 0}%
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 border-purple-200 bg-purple-50/50">
          <div className="text-sm font-medium text-purple-600 uppercase tracking-wider mb-1">錯誤題目數</div>
          <div className="text-3xl font-bold text-purple-600">
            {scores.reduce((a, b) => a + b.wrongAnswers, 0)}
          </div>
        </Card>
      </div>

      {/* Score List */}
      {scores.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-stone-400 text-lg mb-2">📝 還沒有考試記錄</div>
          <p className="text-stone-500">去考試就會顯示在這裡了！</p>
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-stone-800">考試歷史</h2>
          {scores.map((score, index) => (
            <Card key={score.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className={`text-2xl font-bold px-4 py-2 rounded-lg border-2 ${getScoreColor(score.score)}`}>
                    {score.score}%
                  </div>
                  <div>
                    <div className="font-semibold text-stone-800">
                      第 {scores.length - index} 次考試
                    </div>
                    <div className="text-sm text-stone-500">
                      {formatDate(score.date)} · {score.totalQuestions} 題
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600 font-medium">✅ 答對 {score.correctAnswers} 題</span>
                  <span className="text-red-500 font-medium">❌ 答錯 {score.wrongAnswers} 題</span>
                </div>
              </div>
              
              {score.wrongQuestions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-stone-600 hover:text-stone-800 flex items-center gap-2">
                      <span className="transition-transform group-open:rotate-90">▶</span>
                      查看錯誤題目 ({score.wrongQuestions.length} 題)
                    </summary>
                    <div className="mt-3 space-y-3 pl-4">
                      {score.wrongQuestions.map((wq, i) => (
                        <div key={wq.id} className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm">
                          <p className="font-medium text-stone-800 mb-2">{i + 1}. {wq.question}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="text-red-600 bg-red-100 px-2 py-1 rounded">❌ 你的答案: {wq.userAnswer || "未作答"}</span>
                            <span className="text-green-700 bg-green-100 px-2 py-1 rounded">✅ 正確答案: {wq.correctAnswer}</span>
                          </div>
                          <p className="mt-2 text-stone-600">{wq.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}