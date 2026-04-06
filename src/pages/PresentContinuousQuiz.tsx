import React, { useState } from "react";
import { Card } from "../components/ui/shared";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";
import quizDataRaw from "../data/present_continuous/quiz_questions.json";

type QuizItem = {
  id: string;
  question: string;
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

const CATEGORY_LABELS: Record<string, string> = {
  basic_form: "基本句型",
  negative: "否定句",
  question: "疑問句",
  spelling: "拼字規則",
  vs_simple: "簡單式 vs 進行式",
};

const FILTER_OPTIONS: { key: FilterMode; label: string; emoji: string; desc: string }[] = [
  { key: "new", label: "未考過", emoji: "🆕", desc: "只出還沒答對的題目" },
  { key: "failed", label: "錯題複習", emoji: "🔄", desc: "只出之前答錯的題目" },
  { key: "all", label: "全部", emoji: "📚", desc: "所有題目隨機出" },
  { key: "easy", label: "簡單", emoji: "🟢", desc: "難度：簡單" },
  { key: "medium", label: "中等", emoji: "🟡", desc: "難度：中等" },
  { key: "hard", label: "困難", emoji: "🔴", desc: "難度：困難" },
];

export default function PresentContinuousQuiz() {
  const { isAuthenticated, saveScore, user, questionStatus } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "result">("setup");
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
      case "new":
        return allQuestions.filter(q => questionStatus[q.id] !== 'success');
      case "failed":
        return allQuestions.filter(q => questionStatus[q.id] === 'fail');
      case "easy":
        return allQuestions.filter(q => q.difficulty === 'easy');
      case "medium":
        return allQuestions.filter(q => q.difficulty === 'medium');
      case "hard":
        return allQuestions.filter(q => q.difficulty === 'hard');
      default:
        return allQuestions;
    }
  };

  const availableCount = getFilteredQuestions(filter).length;
  const newCount = allQuestions.filter(q => questionStatus[q.id] !== 'success').length;
  const failedCount = allQuestions.filter(q => questionStatus[q.id] === 'fail').length;
  const masteredCount = allQuestions.filter(q => questionStatus[q.id] === 'success').length;

  const handleStartQuiz = () => {
    let pool = getFilteredQuestions(filter);
    pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, questionCount);
    if (selected.length === 0) {
      alert("沒有符合的題目！請換一個篩選條件");
      return;
    }
    setItems(selected);
    setCurrentIndex(0);
    setAnswers({});
    setPhase("active");
  };

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [items[currentIndex].id]: option });
  };

  const submitQuiz = () => {
    const graded: GradedItem[] = items.map(item => {
      const userAnswer = answers[item.id] || "";
      return {
        id: item.id,
        question: item.question,
        userAnswer,
        correctAnswer: item.correctAnswer,
        explanation: item.explanation,
        isCorrect: userAnswer === item.correctAnswer,
      };
    });
    const correctCount = graded.filter(g => g.isCorrect).length;
    const scorePct = Math.round((correctCount / graded.length) * 100);
    setScore(scorePct);
    setGradedResults(graded);
    setPhase("result");

    if (isAuthenticated && user) {
      const wrongQuestions: WrongQuestion[] = graded
        .filter(item => !item.isCorrect)
        .map(item => ({
          id: item.id,
          question: item.question,
          userAnswer: item.userAnswer,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation,
        }));
      const examScore: ExamScore = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        subject: "現在進行式",
        score: scorePct,
        totalQuestions: items.length,
        correctAnswers: correctCount,
        wrongAnswers: wrongQuestions.length,
        wrongQuestions,
      };
      const questionResults = graded.map(g => ({ id: g.id, isCorrect: g.isCorrect }));
      saveScore(examScore, questionResults);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuiz();
    }
  };

  // ─── SETUP PHASE ───
  if (phase === "setup") {
    return (
      <div className="max-w-2xl mx-auto py-6 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">📝 現在進行式 Quiz</h1>
        <p className="text-stone-500 mb-6">選擇題目類型，開始測驗！</p>

        {/* Category breakdown */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-stone-700 mb-2">📋 題目分類</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <span key={key} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                {label} ({allQuestions.filter(q => q.category === key).length}題)
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-blue-700">{allQuestions.length}</div>
            <div className="text-xs text-blue-500">總題數</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{masteredCount}</div>
            <div className="text-xs text-green-500">✓ 已學會</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-amber-600">{newCount}</div>
            <div className="text-xs text-amber-500">🆕 未考過</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-red-500">{failedCount}</div>
            <div className="text-xs text-red-500">❌ 答錯待複習</div>
          </div>
        </div>

        {/* Filter */}
        <Card className="shadow-md border-zinc-200 mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-3">🎯 選擇出題範圍</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FILTER_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setFilter(opt.key)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      filter === opt.key
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-zinc-200 hover:border-zinc-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.emoji} {opt.label}</div>
                    <div className="text-xs text-stone-500 mt-1">{opt.desc}</div>
                    <div className="text-xs text-stone-400 mt-1">可用: {getFilteredQuestions(opt.key).length} 題</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">題數</label>
              <div className="flex flex-wrap gap-2 items-center">
                {[5, 10, 15, 20, 30, 50].map(n => (
                  <button
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all ${
                      questionCount === n
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-zinc-200 text-stone-600 hover:border-blue-300'
                    }`}
                  >
                    {n} 題
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={availableCount === 0}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              {availableCount === 0 ? "沒有符合的題目" : `開始測驗 (${Math.min(questionCount, availableCount)} 題)`}
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // ─── RESULT PHASE ───
  if (phase === "result") {
    const passed = score >= 80;
    const failedItems = gradedResults.filter(g => !g.isCorrect);

    return (
      <div className="max-w-2xl mx-auto py-6 px-2">
        <Card className={`shadow-xl ${passed ? "border-green-400" : "border-red-400"}`}>
          <div className="flex flex-col items-center py-6 space-y-4">
            <h2 className={`text-5xl sm:text-6xl font-black ${passed ? "text-green-500" : "text-red-500"}`}>{score}%</h2>
            <div className={`text-xl font-semibold ${passed ? "text-green-600" : "text-red-500"}`}>
              {passed ? "🎉 太棒了！" : "💪 再加油！"}
            </div>
            <p className="text-stone-600">
              答對 {gradedResults.length - failedItems.length} / {gradedResults.length} 題
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
              {failedItems.length > 0 && (
                <button
                  onClick={() => {
                    const failedQ = items.filter(i => failedItems.some(f => f.id === i.id));
                    setItems(failedQ);
                    setCurrentIndex(0);
                    setAnswers({});
                    setPhase("active");
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all flex-1"
                >
                  🔄 重考錯題 ({failedItems.length})
                </button>
              )}
              <button
                onClick={() => { setPhase("setup"); }}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl border border-stone-300 transition-all flex-1"
              >
                ↩ 回到選單
              </button>
            </div>
          </div>
        </Card>

        {failedItems.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-bold text-stone-800">📝 錯題解析</h3>
            {failedItems.map((item, idx) => (
              <Card key={item.id} className="border-red-200 bg-red-50/30">
                <div className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
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

  // ─── ACTIVE QUIZ PHASE ───
  const currentItem = items[currentIndex];
  if (!currentItem) return null;
  const selected = answers[currentItem.id];

  return (
    <div className="max-w-2xl mx-auto py-6 px-2">
      {/* Progress */}
      <div className="mb-4 flex justify-between items-center text-sm font-medium text-stone-500">
        <span>第 <span className="text-blue-600 font-bold">{currentIndex + 1}</span> / {items.length} 題</span>
        <div className="w-40 sm:w-56 bg-zinc-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="border-blue-200 shadow-lg !rounded-2xl overflow-hidden">
        <div className="bg-blue-50/50 -mx-4 -mt-4 mb-5 px-5 py-6 border-b border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              currentItem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentItem.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentItem.difficulty === 'easy' ? '簡單' : currentItem.difficulty === 'medium' ? '中等' : '困難'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-700">
              {CATEGORY_LABELS[currentItem.category] || currentItem.category}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-stone-900 leading-relaxed">
            {currentItem.question}
          </h2>
        </div>

        <div className="space-y-2.5 px-1">
          {currentItem.options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${
                selected === option
                  ? "border-blue-500 bg-blue-50 font-medium shadow-md scale-[1.01]"
                  : "border-zinc-200 hover:border-blue-300 hover:bg-zinc-50 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                  selected === option ? "border-blue-500 bg-blue-500" : "border-zinc-300"
                }`}>
                  {selected === option && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-base">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end px-1 pb-1">
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`px-8 py-3 rounded-xl font-bold text-base transition-all flex items-center gap-2 ${
              selected
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
            }`}
          >
            {currentIndex < items.length - 1 ? "下一題" : "交卷 ✓"}
          </button>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <button
          onClick={() => setPhase("setup")}
          className="text-stone-400 text-sm hover:text-stone-600 transition-colors"
        >
          取消測驗
        </button>
      </div>
    </div>
  );
}
