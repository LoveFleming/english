import React, { useState } from "react";
import { Card } from "../components/ui/shared";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";
import quizDataRaw from "../data/pronouns/quiz_questions.json";

type QuizItem = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  correctAnswer: string;
  explanation: string;
};

type GradedItem = {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
};

type FilterMode = "new" | "failed" | "all" | "topic1" | "topic2" | "topic3" | "topic4";

const TOPIC_LABELS: Record<string, string> = {
  p1: "🔵 主格 vs 受格",
  p2: "🟢 所有格 vs 所有格代名詞",
  p3: "🟡 混合題",
  p4: "🔴 雙重所有格 + 特殊用法",
};

const FILTER_OPTIONS: { key: FilterMode; label: string; emoji: string; desc: string }[] = [
  { key: "new", label: "未考過", emoji: "🆕", desc: "只出還沒答對的題目" },
  { key: "failed", label: "錯題複習", emoji: "🔄", desc: "只出之前答錯的題目" },
  { key: "all", label: "全部", emoji: "📚", desc: "所有題目隨機出" },
  { key: "topic1", label: "主格 vs 受格", emoji: "🔵", desc: "I/me/he/him..." },
  { key: "topic2", label: "所有格 vs 所有格代名詞", emoji: "🟢", desc: "my/mine/her/hers..." },
  { key: "topic3", label: "混合題", emoji: "🟡", desc: "四選一綜合" },
  { key: "topic4", label: "雙重所有格", emoji: "🔴", desc: "of mine / of hers..." },
];

export default function PronounsQuiz() {
  const { isAuthenticated, saveScore, user, questionStatus } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "result">("setup");
  const [filter, setFilter] = useState<FilterMode>("new");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [items, setItems] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [gradedResults, setGradedResults] = useState<GradedItem[]>([]);

  const allQuestions = (quizDataRaw as any[]).map(q => ({
    ...q,
    correctAnswer: q.answer,
    options: q.options,
  })) as QuizItem[];

  const getFilteredQuestions = (mode: FilterMode): QuizItem[] => {
    switch (mode) {
      case "new":
        return allQuestions.filter(q => questionStatus[q.id] !== 'success');
      case "failed":
        return allQuestions.filter(q => questionStatus[q.id] === 'fail');
      case "all":
        return [...allQuestions];
      case "topic1":
        return allQuestions.filter(q => q.id.startsWith("p1"));
      case "topic2":
        return allQuestions.filter(q => q.id.startsWith("p2"));
      case "topic3":
        return allQuestions.filter(q => q.id.startsWith("p3"));
      case "topic4":
        return allQuestions.filter(q => q.id.startsWith("p4"));
      default:
        return [...allQuestions];
    }
  };

  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const startQuiz = () => {
    const filtered = getFilteredQuestions(filter);
    if (filtered.length === 0) {
      alert("這個類別沒有可用的題目！");
      return;
    }
    const count = Math.min(questionCount, filtered.length);
    setItems(shuffle(filtered).slice(0, count));
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setGradedResults([]);
    setPhase("active");
  };

  const handleAnswer = (option: string) => {
    const q = items[currentIndex];
    setAnswers(prev => ({ ...prev, [q.id]: option }));
  };

  const handleNext = () => {
    const q = items[currentIndex];
    const userAns = answers[q.id];
    if (!userAns) return;

    const isCorrect = userAns === q.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    setGradedResults(prev => [...prev, {
      id: q.id,
      question: q.question,
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      isCorrect,
    }]);

    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Quiz done
      const finalScore = (isCorrect ? score + 1 : score);
      const totalQ = items.length;
      if (isAuthenticated && user) {
        const examScore: ExamScore = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          subject: "代名詞全攻略",
          score: Math.round(finalScore / totalQ * 100),
          totalQuestions: totalQ,
          correctAnswers: finalScore,
          wrongAnswers: totalQ - finalScore,
          wrongQuestions: gradedResults.filter(r => !r.isCorrect).concat(
            isCorrect ? [] : [{
              id: q.id,
              question: q.question,
              userAnswer: userAns,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              isCorrect: false,
            }]
          ).map(r => ({
            id: r.id,
            question: r.question,
            userAnswer: r.userAnswer,
            correctAnswer: r.correctAnswer,
            explanation: r.explanation,
          })),
        };
        saveScore(examScore);
      }
      setPhase("result");
    }
  };

  // Setup phase
  if (phase === "setup") {
    const available = getFilteredQuestions(filter).length;
    return (
      <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
        <h1 className="text-2xl font-bold text-stone-900">📝 代名詞全攻略 — 考試設定</h1>

        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">選擇範圍</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {FILTER_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setFilter(opt.key)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    filter === opt.key
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-zinc-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div className="text-lg">{opt.emoji}</div>
                  <div className="font-semibold text-sm text-stone-800">{opt.label}</div>
                  <div className="text-xs text-zinc-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">題數</label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map(n => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    questionCount === n
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {n} 題
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-zinc-500">
              可用題目：{available} 題
            </span>
            <button
              onClick={startQuiz}
              disabled={available === 0}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:shadow-none"
            >
              🚀 開始考試
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Active quiz
  if (phase === "active") {
    const q = items[currentIndex];
    const selectedAnswer = answers[q.id];
    const progress = ((currentIndex) / items.length) * 100;
    const topicPrefix = q.id.split("-")[0];
    const topicLabel = TOPIC_LABELS[topicPrefix] || "";

    return (
      <div className="space-y-4 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-zinc-500">{currentIndex + 1} / {items.length}</span>
          <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-medium text-blue-600">{score} 分</span>
        </div>

        {/* Question */}
        <Card className="p-6 space-y-4">
          {topicLabel && (
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 mb-2">
              {topicLabel}
            </span>
          )}
          <h2 className="text-xl font-bold text-stone-900">{q.question}</h2>

          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                  selectedAnswer === opt
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md"
                    : "border-zinc-200 hover:border-blue-300 text-stone-700 bg-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:shadow-none"
          >
            {currentIndex + 1 < items.length ? "下一題 →" : "看成績 📊"}
          </button>
        </Card>
      </div>
    );
  }

  // Result phase
  const pct = Math.round(score / items.length * 100);
  const wrongResults = gradedResults.filter(r => !r.isCorrect);
  const correctResults = gradedResults.filter(r => r.isCorrect);

  return (
    <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
      <Card className="p-8 text-center space-y-4">
        <div className="text-6xl">{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "💪"}</div>
        <h2 className="text-3xl font-bold text-stone-900">
          {score} / {items.length}
        </h2>
        <p className="text-xl text-zinc-600">
          正確率 {pct}%
        </p>
        <p className="text-sm text-zinc-500">
          {pct >= 90 ? "太厲害了！代名詞高手！🏆" :
           pct >= 80 ? "很不錯！再練習一下就完美了 ✨" :
           pct >= 60 ? "有進步！多練幾次會更好 💪" :
           "別氣餒！回去看解說再試一次 📖"}
        </p>
        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={() => { setPhase("setup"); setGradedResults([]); }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
          >
            再考一次
          </button>
        </div>
      </Card>

      {wrongResults.length > 0 && (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-red-600">❌ 錯的題目 ({wrongResults.length})</h3>
          {wrongResults.map((r, i) => (
            <div key={i} className="p-4 bg-red-50 rounded-xl border border-red-200 space-y-2">
              <p className="font-bold text-stone-900">{r.question}</p>
              <p className="text-red-600">你答：<strong>{r.userAnswer}</strong></p>
              <p className="text-green-600">正確：<strong>{r.correctAnswer}</strong></p>
              <p className="text-sm text-zinc-600 bg-white p-2 rounded-lg">💡 {r.explanation}</p>
            </div>
          ))}
        </Card>
      )}

      {correctResults.length > 0 && (
        <Card className="p-6 space-y-3">
          <h3 className="text-lg font-bold text-green-600">✅ 答對的題目 ({correctResults.length})</h3>
          {correctResults.map((r, i) => (
            <div key={i} className="p-3 bg-green-50 rounded-lg text-sm">
              <span className="text-green-600 font-bold">✓</span> {r.question} → <strong>{r.correctAnswer}</strong>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
