import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "../components/ui/shared";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";
import quizDataRaw from "../data/phrases/dixon_verbs.json";

type QuizItem = {
  id: string;
  phrase: string;
  meaning: string;
  example: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  difficulty: string;
};

type GradedItem = {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
};

type FilterMode = "new" | "failed" | "all" | "easy" | "medium" | "hard";

const FILTER_OPTIONS: { key: FilterMode; label: string; emoji: string; desc: string }[] = [
  { key: "new", label: "未考過", emoji: "🆕", desc: "只出還沒答對的題目" },
  { key: "failed", label: "錯題複習", emoji: "🔄", desc: "只出之前答錯的題目" },
  { key: "all", label: "全部", emoji: "📚", desc: "所有題目隨機出" },
  { key: "easy", label: "簡單", emoji: "🟢", desc: "難度：簡單" },
  { key: "medium", label: "中等", emoji: "🟡", desc: "難度：中等" },
  { key: "hard", label: "困難", emoji: "🔴", desc: "難度：困難" },
];

export default function DixonPhrasalVerbs({ openApp }: { openApp: (id: string) => void }) {
  const { isAuthenticated, saveScore, user, questionStatus } = useAuth();
  const [mode, setMode] = useState<"intro" | "setup" | "active" | "result">("intro");
  const [filter, setFilter] = useState<FilterMode>("new");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [items, setItems] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [gradedResults, setGradedResults] = useState<GradedItem[]>([]);

  const allQuestions = quizDataRaw as QuizItem[];

  const getFilteredQuestions = (mode: FilterMode): QuizItem[] => {
    switch (mode) {
      case "new": return allQuestions.filter(q => questionStatus[q.id] !== 'success');
      case "failed": return allQuestions.filter(q => questionStatus[q.id] === 'fail');
      case "easy": return allQuestions.filter(q => q.difficulty === 'easy');
      case "medium": return allQuestions.filter(q => q.difficulty === 'medium');
      case "hard": return allQuestions.filter(q => q.difficulty === 'hard');
      default: return allQuestions;
    }
  };

  const availableCount = getFilteredQuestions(filter).length;
  const newCount = allQuestions.filter(q => questionStatus[q.id] !== 'success').length;
  const failedCount = allQuestions.filter(q => questionStatus[q.id] === 'fail').length;
  const masteredCount = allQuestions.filter(q => questionStatus[q.id] === 'success').length;

  const categories = [...new Set(allQuestions.map(q => q.category))];

  const handleStartQuiz = () => {
    let pool = getFilteredQuestions(filter);
    pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, questionCount);
    if (selected.length === 0) { alert("沒有符合的題目！"); return; }
    setItems(selected);
    setCurrentIndex(0);
    setAnswers({});
    setMode("active");
  };

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [items[currentIndex].id]: option });
  };

  const submitQuiz = () => {
    const graded: GradedItem[] = items.map(item => {
      const userAnswer = answers[item.id] || "";
      return { id: item.id, question: item.example, userAnswer, correctAnswer: item.correctAnswer, explanation: item.explanation, isCorrect: userAnswer === item.correctAnswer };
    });
    const correctCount = graded.filter(g => g.isCorrect).length;
    const scorePct = Math.round((correctCount / graded.length) * 100);
    setScore(scorePct);
    setGradedResults(graded);
    setMode("result");

    if (isAuthenticated && user) {
      const wrongQuestions: WrongQuestion[] = graded.filter(i => !i.isCorrect).map(i => ({ id: i.id, question: i.question, userAnswer: i.userAnswer, correctAnswer: i.correctAnswer, explanation: i.explanation }));
      const examScore: ExamScore = { id: Date.now().toString(), date: new Date().toISOString(), subject: "狄克森動詞片語", score: scorePct, totalQuestions: items.length, correctAnswers: correctCount, wrongAnswers: wrongQuestions.length, wrongQuestions };
      saveScore(examScore, graded.map(g => ({ id: g.id, isCorrect: g.isCorrect })));
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) setCurrentIndex(currentIndex + 1);
    else submitQuiz();
  };

  // ─── INTRO ───
  if (mode === "intro") {
    return (
      <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200">
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">狄克森動詞片語 (Dixon Phrasal Verbs)</h1>
          <button onClick={() => setMode("setup")} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
            開始考試
          </button>
        </div>

        <div className="markdown-body">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-800 mb-3">📖 什麼是狄克森動詞片語？</h2>
            <p className="text-stone-700 text-lg leading-relaxed mb-4">
              <strong>狄克森動詞片語 (Dixon's Essential Phrasal Verbs)</strong> 是英語學習中最重要、最常用的片語動詞集合。
              動詞片語由「動詞 + 介系詞/副詞」組成，意思通常<strong>不能從字面猜出</strong>。
            </p>
            <p className="text-stone-700 text-lg leading-relaxed mb-4">
              例如：<strong>give up</strong> 不是「給上去」，而是<strong>「放棄」</strong>！
            </p>
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <h3 className="font-bold text-stone-800 mb-2">💡 學習要訣：</h3>
              <ul className="list-disc pl-6 text-stone-700 space-y-1">
                <li>每個片語要整組記住，不要拆開看</li>
                <li>多看例句，理解使用情境</li>
                <li>同一個片語可能有多種意思</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-stone-800 mb-3">📋 100 個片語涵蓋以下動詞：</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <span key={cat} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                  {cat} ({allQuestions.filter(q => q.category === cat).length})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── SETUP ───
  if (mode === "setup") {
    return (
      <div className="max-w-2xl mx-auto py-6 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">📝 狄克森動詞片語 Quiz</h1>
        <p className="text-stone-500 mb-6">選擇題目類型，開始測驗！</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-blue-700">{allQuestions.length}</div><div className="text-xs text-blue-500">總題數</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{masteredCount}</div><div className="text-xs text-green-500">✓ 已學會</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-amber-600">{newCount}</div><div className="text-xs text-amber-500">🆕 未考過</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-red-500">{failedCount}</div><div className="text-xs text-red-500">❌ 答錯待複習</div>
          </div>
        </div>

        <Card className="shadow-md border-zinc-200 mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-3">🎯 選擇出題範圍</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FILTER_OPTIONS.map(opt => (
                  <button key={opt.key} onClick={() => setFilter(opt.key)} className={`p-3 rounded-xl border-2 text-left transition-all ${filter === opt.key ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-zinc-200 hover:border-zinc-300 bg-white'}`}>
                    <div className="font-bold text-sm">{opt.emoji} {opt.label}</div>
                    <div className="text-xs text-stone-500 mt-1">{opt.desc}</div>
                    <div className="text-xs text-stone-400 mt-1">可用: {getFilteredQuestions(opt.key).length} 題</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">題數</label>
              <div className="flex flex-wrap gap-2">
                {[10, 20, 30, 50, 100].map(n => (
                  <button key={n} onClick={() => setQuestionCount(n)} className={`px-4 py-2 rounded-lg border-2 text-sm font-bold ${questionCount === n ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-zinc-200 text-stone-600 hover:border-blue-300'}`}>{n} 題</button>
                ))}
              </div>
            </div>
            <button onClick={handleStartQuiz} disabled={availableCount === 0} className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98]">
              {availableCount === 0 ? "沒有符合的題目" : `開始測驗 (${Math.min(questionCount, availableCount)} 題)`}
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // ─── RESULT ───
  if (mode === "result") {
    const passed = score >= 80;
    const failedItems = gradedResults.filter(g => !g.isCorrect);
    return (
      <div className="max-w-2xl mx-auto py-6 px-2">
        <Card className={`shadow-xl ${passed ? "border-green-400" : "border-red-400"}`}>
          <div className="flex flex-col items-center py-6 space-y-4">
            <h2 className={`text-5xl sm:text-6xl font-black ${passed ? "text-green-500" : "text-red-500"}`}>{score}%</h2>
            <div className={`text-xl font-semibold ${passed ? "text-green-600" : "text-red-500"}`}>{passed ? "🎉 太棒了！" : "💪 再加油！"}</div>
            <p className="text-stone-600">答對 {gradedResults.length - failedItems.length} / {gradedResults.length} 題</p>
            <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
              {failedItems.length > 0 && (
                <button onClick={() => { const fq = items.filter(i => failedItems.some(f => f.id === i.id)); setItems(fq); setCurrentIndex(0); setAnswers({}); setMode("active"); }} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all flex-1">🔄 重考錯題 ({failedItems.length})</button>
              )}
              <button onClick={() => setMode("setup")} className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl border border-stone-300 transition-all flex-1">↩ 回到選單</button>
            </div>
          </div>
        </Card>
        {failedItems.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-bold text-stone-800">📝 錯題解析</h3>
            {failedItems.map((item, idx) => (
              <Card key={item.id} className="border-red-200 bg-red-50/30">
                <div className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">{item.question}</p>
                    <div className="space-y-1 mb-3 text-sm">
                      <p className="text-red-600 bg-red-100 px-3 py-1 rounded-md inline-block mr-2">❌ 你答: {item.userAnswer || "未作答"}</p>
                      <p className="text-green-700 bg-green-100 px-3 py-1 rounded-md inline-block">✅ 正確: {item.correctAnswer}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-red-100 text-sm text-stone-700">
                      <span className="font-bold text-blue-600">解析：</span>{item.explanation}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── ACTIVE ───
  const currentItem = items[currentIndex];
  if (!currentItem) return null;
  const selected = answers[currentItem.id];

  return (
    <div className="max-w-2xl mx-auto py-6 px-2">
      <div className="mb-4 flex justify-between items-center text-sm font-medium text-stone-500">
        <span>第 <span className="text-blue-600 font-bold">{currentIndex + 1}</span> / {items.length} 題</span>
        <div className="w-40 sm:w-56 bg-zinc-200 rounded-full h-2.5 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} />
        </div>
      </div>

      <Card className="border-blue-200 shadow-lg !rounded-2xl overflow-hidden">
        <div className="bg-blue-50/50 -mx-4 -mt-4 mb-5 px-5 py-6 border-b border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${currentItem.difficulty === 'easy' ? 'bg-green-100 text-green-700' : currentItem.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
              {currentItem.difficulty === 'easy' ? '簡單' : currentItem.difficulty === 'medium' ? '中等' : '困難'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-700">{currentItem.meaning}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-stone-900 leading-relaxed">{currentItem.example}</h2>
        </div>

        <div className="space-y-2.5 px-1">
          {currentItem.options.map(option => (
            <button key={option} onClick={() => handleSelect(option)} className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${selected === option ? "border-blue-500 bg-blue-50 font-medium shadow-md scale-[1.01]" : "border-zinc-200 hover:border-blue-300 hover:bg-zinc-50 bg-white"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${selected === option ? "border-blue-500 bg-blue-500" : "border-zinc-300"}`}>
                  {selected === option && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-base">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end px-1 pb-1">
          <button onClick={handleNext} disabled={!selected} className={`px-8 py-3 rounded-xl font-bold text-base transition-all flex items-center gap-2 ${selected ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"}`}>
            {currentIndex < items.length - 1 ? "下一題" : "交卷 ✓"}
          </button>
        </div>
      </Card>
      <div className="mt-6 text-center">
        <button onClick={() => setMode("setup")} className="text-stone-400 text-sm hover:text-stone-600 transition-colors">取消測驗</button>
      </div>
    </div>
  );
}
