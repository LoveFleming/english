import React, { useState } from "react";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";

interface ShiftQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: "shift" | "letter-coefficient" | "reverse-solve" | "range" | "number-line";
}

const QUESTIONS: ShiftQuestion[] = [
  // ===== 基礎移項（★1-8）=====
  {
    id: "is-1",
    question: "設 a > 0，且 4ax ≤ 12a，則 x 的範圍為？",
    options: ["x ≤ 3", "x ≥ 3", "x < 3", "x ≤ 12"],
    correctAnswer: "x ≤ 3",
    explanation: "4ax ≤ 12a，因為 a > 0 所以 4a > 0。兩邊同除 4a（正數，不變號），x ≤ 12a/4a = 3。",
    difficulty: "easy",
    topic: "shift",
  },
  {
    id: "is-2",
    question: "設 a > 0，且 -6a + 3ax ≥ 0，則 x 的範圍為？",
    options: ["x ≥ 2", "x ≤ 2", "x > 2", "x ≥ -2"],
    correctAnswer: "x ≥ 2",
    explanation: "移項得 3ax ≥ 6a，兩邊同除 3a（正數，不變號），x ≥ 6a/3a = 2。",
    difficulty: "easy",
    topic: "shift",
  },
  {
    id: "is-3",
    question: "設 a > 0，且 5a - 2ax ≤ a，則 x 的範圍為？",
    options: ["x ≥ 2", "x ≤ 2", "x > 2", "x ≥ -2"],
    correctAnswer: "x ≥ 2",
    explanation: "移項得 -2ax ≤ a - 5a = -4a，兩邊同除 -2a（負數，要變號！），x ≥ -4a/-2a = 2。",
    difficulty: "easy",
    topic: "shift",
  },
  {
    id: "is-4",
    question: "設 a > 0，且 7ax - 14a > 0，則 x 的範圍為？",
    options: ["x > 2", "x < 2", "x ≥ 2", "x > -2"],
    correctAnswer: "x > 2",
    explanation: "移項得 7ax > 14a，兩邊同除 7a（正數，不變號），x > 14a/7a = 2。",
    difficulty: "easy",
    topic: "shift",
  },
  {
    id: "is-5",
    question: "設 a > 0，且 3ax + 6a ≤ 0，則 x 的範圍為？",
    options: ["x ≤ -2", "x ≥ -2", "x < -2", "x ≤ 2"],
    correctAnswer: "x ≤ -2",
    explanation: "移項得 3ax ≤ -6a，兩邊同除 3a（正數，不變號），x ≤ -6a/3a = -2。",
    difficulty: "easy",
    topic: "shift",
  },
  {
    id: "is-6",
    question: "設 a > 0，且 -5ax < 15a，則 x 的範圍為？",
    options: ["x > -3", "x < -3", "x ≥ -3", "x > 3"],
    correctAnswer: "x > -3",
    explanation: "-5ax < 15a，兩邊同除 -5a（負數，要變號！），x > 15a/-5a = -3。",
    difficulty: "easy",
    topic: "shift",
  },
  {
    id: "is-7",
    question: "設 a > 0，且 8a - 2ax ≥ 4a，則 x 的範圍為？",
    options: ["x ≤ 2", "x ≥ 2", "x < 2", "x ≤ -2"],
    correctAnswer: "x ≤ 2",
    explanation: "移項得 -2ax ≥ 4a - 8a = -4a，兩邊同除 -2a（負數，要變號！），x ≤ -4a/-2a = 2。",
    difficulty: "easy",
    topic: "shift",
  },
  {
    id: "is-8",
    question: "設 a > 0，且 6ax + 3a > 9a，則 x 的範圍為？",
    options: ["x > 1", "x < 1", "x ≥ 1", "x > -1"],
    correctAnswer: "x > 1",
    explanation: "移項得 6ax > 9a - 3a = 6a，兩邊同除 6a（正數，不變號），x > 6a/6a = 1。",
    difficulty: "easy",
    topic: "shift",
  },

  // ===== 反求解（★9-14）=====
  {
    id: "is-9",
    question: "若 5x - 2 ≤ ax + 10 的解為 x ≤ 4，則 a 的值為？",
    options: ["2", "3", "4", "1"],
    correctAnswer: "2",
    explanation: "移項得 (5 - a)x ≤ 12。因為解為 x ≤ 4，所以 12/(5 - a) = 4，得 5 - a = 3，a = 2。",
    difficulty: "medium",
    topic: "reverse-solve",
  },
  {
    id: "is-10",
    question: "若 3x - 1 ≤ ax + 11 的解為 x ≤ 2，則 a 的值為？",
    options: ["-3", "3", "-2", "2"],
    correctAnswer: "-3",
    explanation: "移項得 (3 - a)x ≤ 12。因為解為 x ≤ 2，所以 12/(3 - a) = 2，得 3 - a = 6，a = -3。",
    difficulty: "medium",
    topic: "reverse-solve",
  },
  {
    id: "is-11",
    question: "若 2x + 3 ≥ ax - 1 的解為 x ≥ -4，則 a 的值為？",
    options: ["1", "-1", "2", "-2"],
    correctAnswer: "1",
    explanation: "移項得 (2 - a)x ≥ -4。因為解為 x ≥ -4，所以 -4/(2 - a) = -4，得 2 - a = 1，a = 1。",
    difficulty: "medium",
    topic: "reverse-solve",
  },
  {
    id: "is-12",
    question: "若 x > 5，則 3x + 2 的範圍為？",
    options: ["> 17", "> 15", "> 13", "≥ 17"],
    correctAnswer: "> 17",
    explanation: "x > 5 → 3x > 15 → 3x + 2 > 15 + 2 = 17。",
    difficulty: "medium",
    topic: "range",
  },
  {
    id: "is-13",
    question: "若 x ≤ -2，則 8 - 4x 的範圍為？",
    options: ["≥ 16", "> 16", "≤ 16", "≥ 8"],
    correctAnswer: "≥ 16",
    explanation: "x ≤ -2 → -4x ≥ 8 → 8 - 4x ≥ 8 + 8 = 16。",
    difficulty: "medium",
    topic: "range",
  },
  {
    id: "is-14",
    question: "若 x ≥ 1，則 5 - 2x 的範圍為？",
    options: ["≤ 3", "< 3", "≥ 3", "≤ 5"],
    correctAnswer: "≤ 3",
    explanation: "x ≥ 1 → 2x ≥ 2 → -2x ≤ -2 → 5 - 2x ≤ 5 - 2 = 3。",
    difficulty: "medium",
    topic: "range",
  },

  // ===== 挑戰題（★15-20）=====
  {
    id: "is-15",
    question: "設 a < 0，且 4ax ≤ 12a，則 x 的範圍為？",
    options: ["x ≥ 3", "x ≤ 3", "x > 3", "x ≥ -3"],
    correctAnswer: "x ≥ 3",
    explanation: "因為 a < 0 所以 4a < 0。兩邊同除 4a（負數，要變號！），x ≥ 12a/4a = 3。",
    difficulty: "hard",
    topic: "letter-coefficient",
  },
  {
    id: "is-16",
    question: "設 a < 0，且 -3ax > 6a，則 x 的範圍為？",
    options: ["x > -2", "x < -2", "x > 2", "x < 2"],
    correctAnswer: "x > -2",
    explanation: "因為 a < 0 所以 -3a > 0。兩邊同除 -3a（正數，不變號），x > 6a/(-3a) = -2。",
    difficulty: "hard",
    topic: "letter-coefficient",
  },
  {
    id: "is-17",
    question: "若 x < -4，則 7 - 3x 的範圍為？",
    options: ["> 19", "> 12", "≥ 19", "> 7"],
    correctAnswer: "> 19",
    explanation: "x < -4 → -3x > 12 → 7 - 3x > 7 + 12 = 19。",
    difficulty: "hard",
    topic: "range",
  },
  {
    id: "is-18",
    question: "設 a > 0，且 a(x - 3) ≤ 2a，則 x 的範圍為？",
    options: ["x ≤ 5", "x ≥ 5", "x < 5", "x ≤ 1"],
    correctAnswer: "x ≤ 5",
    explanation: "展開得 ax - 3a ≤ 2a → ax ≤ 5a，兩邊同除 a（正數，不變號），x ≤ 5a/a = 5。",
    difficulty: "hard",
    topic: "letter-coefficient",
  },
  {
    id: "is-19",
    question: "若 3x - 2 < ax + 6 的解為 x < 4，則 a 的值為？",
    options: ["1", "-1", "2", "-2"],
    correctAnswer: "1",
    explanation: "移項得 (3 - a)x < 8。因為解為 x < 4，所以 8/(3 - a) = 4，得 3 - a = 2，a = 1。",
    difficulty: "hard",
    topic: "reverse-solve",
  },
  {
    id: "is-20",
    question: "設 a > 0，且 a(2x - 3) ≥ 5a，則 x 的範圍為？",
    options: ["x ≥ 4", "x ≤ 4", "x ≥ 1", "x ≥ -1"],
    correctAnswer: "x ≥ 4",
    explanation: "展開得 2ax - 3a ≥ 5a → 2ax ≥ 8a，兩邊同除 2a（正數，不變號），x ≥ 8a/2a = 4。",
    difficulty: "hard",
    topic: "letter-coefficient",
  },
];

export default function InequalitiesShiftQuiz() {
  const { user, saveScore } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "result">("setup");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongList, setWrongList] = useState<ShiftQuestion[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Map<string, string>>(new Map());
  const [showWrongOnly, setShowWrongOnly] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState(20);
  const [quizItems, setQuizItems] = useState<ShiftQuestion[]>([]);

  const TOPIC_CONFIG: Record<string, { emoji: string; label: string }> = {
    shift: { emoji: "🔀", label: "基礎移項" },
    "letter-coefficient": { emoji: "🔤", label: "字母係數" },
    "reverse-solve": { emoji: "🔍", label: "反求解" },
    range: { emoji: "📊", label: "範圍推導" },
    "number-line": { emoji: "📏", label: "數線" },
  };

  const DIFF_CONFIG: Record<string, { emoji: string; label: string }> = {
    easy: { emoji: "🟢", label: "基礎" },
    medium: { emoji: "🟡", label: "進階" },
    hard: { emoji: "🔴", label: "挑戰" },
  };

  const getFilteredPool = () => {
    let pool = [...QUESTIONS];
    if (topicFilter !== "all") pool = pool.filter(q => q.topic === topicFilter);
    if (difficultyFilter !== "all") pool = pool.filter(q => q.difficulty === difficultyFilter);
    return pool;
  };

  const filteredCount = getFilteredPool().length;

  const handleStartQuiz = () => {
    let pool = getFilteredPool();
    pool.sort(() => Math.random() - 0.5);
    pool = pool.slice(0, Math.min(questionCount, pool.length));
    setQuizItems(pool);
    setPhase("active");
  };

  const questions = showWrongOnly ? wrongList : (quizItems.length > 0 ? quizItems : QUESTIONS);
  const total = questions.length;

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    setShowExplanation(true);

    const q = questions[currentIdx];
    if (option === q.correctAnswer) {
      setScore((s) => s + 1);
    } else {
      setWrongList((prev) => {
        if (!prev.find((w) => w.id === q.id)) return [...prev, q];
        return prev;
      });
      setWrongAnswers((prev) => new Map(prev).set(q.id, option));
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < total) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      const finalScore = Math.round((score / total) * 100);
      const wrongQs: WrongQuestion[] = wrongList.map(q => ({
        id: q.id,
        question: q.question,
        userAnswer: wrongAnswers.get(q.id) || "未作答",
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }));
      saveScore({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        subject: "math-j1-inequalities-shift",
        score: finalScore,
        totalQuestions: total,
        correctAnswers: score,
        wrongAnswers: wrongQs.length,
        wrongQuestions: wrongQs,
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
    setWrongList([]);
    setShowWrongOnly(false);
    setPhase("setup");
  };

  const handleRetryWrong = () => {
    setShowWrongOnly(true);
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
  };

  // Setup Phase
  if (phase === "setup") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="border-b pb-4 border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">🔀 不等式移項 20 題</h1>
          <p className="text-gray-500 mt-1">共 {QUESTIONS.length} 題 · 含字母係數、反求解與範圍推導</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <span className="text-sm text-green-600">🟢 基礎</span>
            <p className="text-xl font-bold text-green-700">{QUESTIONS.filter(q => q.difficulty === "easy").length}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
            <span className="text-sm text-yellow-600">🟡 進階</span>
            <p className="text-xl font-bold text-yellow-700">{QUESTIONS.filter(q => q.difficulty === "medium").length}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <span className="text-sm text-red-600">🔴 挑戰</span>
            <p className="text-xl font-bold text-red-700">{QUESTIONS.filter(q => q.difficulty === "hard").length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
          <h3 className="font-bold text-gray-700">📊 選擇考試範圍</h3>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">題目類型</label>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setTopicFilter("all")} className={`p-3 rounded-xl border-2 text-sm font-medium ${topicFilter === "all" ? "border-teal-500 bg-teal-50" : "border-gray-200"}`}>全部</button>
              {Object.entries(TOPIC_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={() => setTopicFilter(key)} className={`p-3 rounded-xl border-2 text-sm font-medium ${topicFilter === key ? "border-teal-500 bg-teal-50" : "border-gray-200"}`}>
                  {cfg.emoji} {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">難度</label>
            <div className="flex gap-2">
              <button onClick={() => setDifficultyFilter("all")} className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium ${difficultyFilter === "all" ? "border-teal-500 bg-teal-50" : "border-gray-200"}`}>全部</button>
              {Object.entries(DIFF_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={() => setDifficultyFilter(key)} className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium ${difficultyFilter === key ? "border-teal-500 bg-teal-50" : "border-gray-200"}`}>
                  {cfg.emoji} {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">題數</label>
            <div className="flex items-center gap-3">
              <input type="number" min={1} max={filteredCount} value={Math.min(questionCount, filteredCount)} onChange={e => setQuestionCount(Number(e.target.value))} className="w-24 p-2 border-2 border-gray-200 rounded-xl text-center font-bold" />
              <span className="text-gray-500 text-sm">/ {filteredCount} 題可用</span>
            </div>
          </div>

          <button onClick={handleStartQuiz} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition shadow-lg">
            開始測驗 🚀
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const finalScore = showWrongOnly
      ? Math.round((score / total) * 100)
      : Math.round((score / QUESTIONS.length) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">
            {showWrongOnly ? "📝 訂正結果" : "🎉 測驗完成！"}
          </h2>
          <div className="text-6xl font-black text-teal-600 mb-2">{finalScore}</div>
          <p className="text-gray-500 mb-6">
            答對 {score} / {total} 題
            {!showWrongOnly && wrongList.length > 0 && `，錯了 ${wrongList.length} 題`}
          </p>

          {finalScore >= 80 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-700 font-bold text-lg">🌟 太棒了！通過測驗！</p>
            </div>
          )}
          {finalScore < 80 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-amber-700 font-bold">💪 繼續加油！再練習一次吧！</p>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition"
            >
              🔄 重新測驗
            </button>
            {wrongList.length > 0 && !showWrongOnly && (
              <button
                onClick={handleRetryWrong}
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition"
              >
                📝 訂正錯題 ({wrongList.length} 題)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-gray-500">
          {showWrongOnly ? "📝 訂正模式" : "📝 不等式移項測驗"}
        </span>
        <span className="text-sm font-bold text-teal-600">
          {currentIdx + 1} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-teal-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Score */}
      <div className="flex justify-end mb-2">
        <span className="text-sm text-green-600 font-bold">✅ {score} 分</span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
        <p className="text-lg font-bold text-gray-800 mb-4 whitespace-pre-line">{q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt) => {
            let style = "border-gray-200 hover:border-teal-400 hover:bg-teal-50";
            if (selected) {
              if (opt === q.correctAnswer) {
                style = "border-green-400 bg-green-50";
              } else if (opt === selected) {
                style = "border-red-400 bg-red-50";
              } else {
                style = "border-gray-100 opacity-50";
              }
            }
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition ${style} ${
                  selected ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="text-gray-800">{opt}</span>
                {selected && opt === q.correctAnswer && (
                  <span className="float-right text-green-600 font-bold">✅</span>
                )}
                {selected && opt === selected && opt !== q.correctAnswer && (
                  <span className="float-right text-red-600 font-bold">❌</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-teal-700 mb-1">💡 解析</p>
          <p className="text-sm text-teal-800">{q.explanation}</p>
        </div>
      )}

      {/* Next */}
      {selected && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition"
          >
            {currentIdx + 1 < total ? "下一題 →" : "看結果 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
