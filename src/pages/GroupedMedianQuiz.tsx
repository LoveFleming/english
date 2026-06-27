import React, { useState } from "react";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";

interface MedianQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: "concept" | "odd-count" | "even-count" | "find-position" | "application";
}

const QUESTIONS: MedianQuestion[] = [
  // ===== 基礎概念與計算（1-8）=====
  {
    id: "gm-1",
    question:
      "某班 46 位學生的體重分組如下，求中位數在哪一組？\n\n40~50: 11人, 50~60: 14人, 60~70: 7人, 70~80: 8人, 80~90: 6人",
    options: ["50~60", "40~50", "60~70", "70~80"],
    correctAnswer: "50~60",
    explanation:
      "共 46 人（偶數），找第 23 和第 24 人。\n累加：第一組 1~11，第二組 12~25。\n第 23、24 都在 50~60 組。",
    difficulty: "easy",
    topic: "even-count",
  },
  {
    id: "gm-2",
    question:
      "某班 57 位學生的成績分組如下，求中位數在哪一組？\n\n50~60: 12人, 60~70: 13人, 70~80: 7人, 80~90: 17人, 90~100: 8人",
    options: ["70~80", "60~70", "80~90", "50~60"],
    correctAnswer: "70~80",
    explanation:
      "共 57 人（奇數），找第 (57+1)/2=29 人。\n累加：12, 25, 32。\n第 29 人在第三組 70~80。",
    difficulty: "easy",
    topic: "odd-count",
  },
  {
    id: "gm-3",
    question:
      "23 人的運動時間分組如下，求中位數所在組？\n\n0~30分: 7人, 30~60分: 4人, 60~90分: 5人, 90~120分: 4人, 120~150分: 2人, 150~180分: 1人",
    options: ["60~90分", "30~60分", "0~30分", "90~120分"],
    correctAnswer: "60~90分",
    explanation:
      "共 23 人（奇數），找第 12 人。\n累加：7, 11, 16。\n第 12 人在第三組 60~90 分。",
    difficulty: "easy",
    topic: "odd-count",
  },
  {
    id: "gm-4",
    question:
      "30 位學生的身高分組如下，中位數在哪一組？\n\n140~150: 5人, 150~160: 12人, 160~170: 8人, 170~180: 5人",
    options: ["150~160", "140~150", "160~170", "170~180"],
    correctAnswer: "150~160",
    explanation:
      "共 30 人（偶數），找第 15 和 16 人。\n累加：5, 17。\n第 15、16 都在第二組 150~160。",
    difficulty: "easy",
    topic: "even-count",
  },
  {
    id: "gm-5",
    question:
      "某次考試 45 人，分數分組如下，中位數在哪一組？\n\n0~20分: 3人, 20~40分: 8人, 40~60分: 15人, 60~80分: 12人, 80~100分: 7人",
    options: ["40~60分", "20~40分", "60~80分", "80~100分"],
    correctAnswer: "40~60分",
    explanation:
      "共 45 人（奇數），找第 23 人。\n累加：3, 11, 26。\n第 23 人在第三組 40~60 分。",
    difficulty: "easy",
    topic: "odd-count",
  },
  {
    id: "gm-6",
    question:
      "40 戶家庭每月支出分組如下，中位數在哪一組？\n\n1~2萬: 6戶, 2~3萬: 10戶, 3~4萬: 14戶, 4~5萬: 7戶, 5~6萬: 3戶",
    options: ["3~4萬", "2~3萬", "4~5萬", "1~2萬"],
    correctAnswer: "3~4萬",
    explanation:
      "共 40 戶（偶數），找第 20 和 21 戶。\n累加：6, 16, 30。\n第 20、21 都在第三組 3~4萬。",
    difficulty: "easy",
    topic: "even-count",
  },
  {
    id: "gm-7",
    question: "下列哪一組資料的中位數會在第二組？",
    options: [
      "總人數 25，第一組 8 人，第二組 10 人",
      "總人數 25，第一組 15 人，第二組 5 人",
      "總人數 30，第一組 20 人，第二組 5 人",
      "總人數 20，第一組 3 人，第二組 4 人",
    ],
    correctAnswer: "總人數 25，第一組 8 人，第二組 10 人",
    explanation:
      "25 人找第 13 人。\n第一組 1~8，第二組 9~18。\n第 13 人在第二組。",
    difficulty: "medium",
    topic: "find-position",
  },
  {
    id: "gm-8",
    question: "若資料有 50 筆（偶數），中位數要找第幾個？",
    options: ["第 25 和第 26 個", "第 25 個", "第 50 個", "第 26 個"],
    correctAnswer: "第 25 和第 26 個",
    explanation: "偶數時找第 n/2=25 和第 n/2+1=26 個。",
    difficulty: "easy",
    topic: "concept",
  },

  // ===== 進階題（9-14）=====
  {
    id: "gm-9",
    question:
      "某校 80 位學生的數學成績分組如下，求中位數所在組？\n\n30~40分: 5人, 40~50分: 12人, 50~60分: 20人, 60~70分: 18人, 70~80分: 15人, 80~90分: 10人",
    options: ["60~70分", "50~60分", "70~80分", "40~50分"],
    correctAnswer: "60~70分",
    explanation:
      "共 80 人（偶數），找第 40 和 41 人。\n累加：5, 17, 37, 55。\n37 < 40 ≤ 55，第 40 和 41 都在 60~70 分組。",
    difficulty: "medium",
    topic: "even-count",
  },
  {
    id: "gm-10",
    question:
      "100 位居民年齡分組如下，中位數在哪一組？\n\n0~20歲: 22人, 20~40歲: 35人, 40~60歲: 25人, 60~80歲: 12人, 80~100歲: 6人",
    options: ["20~40歲", "0~20歲", "40~60歲", "60~80歲"],
    correctAnswer: "20~40歲",
    explanation:
      "共 100 人（偶數），找第 50 和 51 人。\n累加：22, 57。\n第 50、51 都在第二組 20~40 歲。",
    difficulty: "medium",
    topic: "even-count",
  },
  {
    id: "gm-11",
    question:
      "某班 35 人考試成績如下，中位數在哪一組？\n\n不及格: 4人, 60~70分: 9人, 70~80分: 11人, 80~90分: 7人, 90~100分: 4人",
    options: ["70~80分", "60~70分", "80~90分", "不及格"],
    correctAnswer: "70~80分",
    explanation:
      "共 35 人（奇數），找第 18 人。\n累加：4, 13, 24。\n第 18 人在第三組 70~80 分。",
    difficulty: "medium",
    topic: "odd-count",
  },
  {
    id: "gm-12",
    question:
      "60 位員工的月薪分組如下，中位數在哪一組？\n\n2~3萬: 8人, 3~4萬: 22人, 4~5萬: 18人, 5~6萬: 8人, 6萬以上: 4人",
    options: ["3~4萬", "4~5萬", "2~3萬", "5~6萬"],
    correctAnswer: "3~4萬",
    explanation:
      "共 60 人（偶數），找第 30 和 31 人。\n累加：8, 30, 48。\n第 30 人在第二組末（累計=30），在 3~4 萬組。",
    difficulty: "medium",
    topic: "even-count",
  },
  {
    id: "gm-13",
    question:
      "將 28 個資料由小到大排列，分組後各組人數為 4, 7, 9, 5, 3，中位數在第幾組？",
    options: ["第三組", "第二組", "第四組", "第一組"],
    correctAnswer: "第三組",
    explanation:
      "28 人（偶數），找第 14 和 15 人。\n累加：4, 11, 20。\n第 14、15 都在第三組。",
    difficulty: "medium",
    topic: "even-count",
  },
  {
    id: "gm-14",
    question: "某次抽樣 49 人，找中位數要找第幾個人？",
    options: ["第 25 個", "第 24 個", "第 49 個", "第 25 和 26 個"],
    correctAnswer: "第 25 個",
    explanation: "49 是奇數，找第 (49+1)/2=25 個。",
    difficulty: "easy",
    topic: "concept",
  },

  // ===== 挑戰題（15-20）=====
  {
    id: "gm-15",
    question:
      "某班 52 人身高分組如下，求中位數所在組？\n\n145~155cm: 10人, 155~165cm: 18人, 165~175cm: 16人, 175~185cm: 6人, 185~195cm: 2人",
    options: ["155~165cm", "165~175cm", "145~155cm", "175~185cm"],
    correctAnswer: "155~165cm",
    explanation:
      "共 52 人（偶數），找第 26 和 27 人。\n累加：10, 28, 44。\n第 26、27 都在第二組 155~165cm。",
    difficulty: "hard",
    topic: "even-count",
  },
  {
    id: "gm-16",
    question:
      "某公司 65 位員工年齡分組如下，中位數在哪一組？\n\n20~30歲: 12人, 30~40歲: 20人, 40~50歲: 15人, 50~60歲: 10人, 60~70歲: 8人",
    options: ["40~50歲", "30~40歲", "20~30歲", "50~60歲"],
    correctAnswer: "40~50歲",
    explanation:
      "共 65 人（奇數），找第 33 人。\n累加：12, 32, 47。\n32 < 33 ≤ 47，第 33 人在第三組 40~50 歲。",
    difficulty: "hard",
    topic: "odd-count",
  },
  {
    id: "gm-17",
    question:
      "某次民調 200 人，年齡分組如下，中位數在哪一組？\n\n18~30歲: 45人, 30~45歲: 60人, 45~60歲: 50人, 60~75歲: 30人, 75歲以上: 15人",
    options: ["30~45歲", "18~30歲", "45~60歲", "60~75歲"],
    correctAnswer: "30~45歲",
    explanation:
      "共 200 人（偶數），找第 100 和 101 人。\n累加：45, 105, 155。\n第 100、101 都在第二組 30~45 歲。",
    difficulty: "hard",
    topic: "even-count",
  },
  {
    id: "gm-18",
    question:
      "某班 24 人每周閱讀時數分組如下，中位數在哪一組？\n\n0~2小時: 5人, 2~4小時: 8人, 4~6小時: 6人, 6~8小時: 3人, 8~10小時: 2人",
    options: ["2~4小時", "0~2小時", "4~6小時", "6~8小時"],
    correctAnswer: "2~4小時",
    explanation:
      "共 24 人（偶數），找第 12 和 13 人。\n累加：5, 13, 19。\n第 12 人和第 13 人都在第二組（6~13），答案 2~4 小時。",
    difficulty: "hard",
    topic: "even-count",
  },
  {
    id: "gm-19",
    question:
      "將分組資料的累計頻率列出：6, 15, 28, 36, 40。若總人數 40 人，中位數在哪一組？",
    options: ["第三組", "第二組", "第四組", "第一組"],
    correctAnswer: "第三組",
    explanation:
      "40 人（偶數），找第 20 和 21 人。\n累計：6, 15, 28。\n第 20、21 都在第三組（16~28）。",
    difficulty: "hard",
    topic: "find-position",
  },
  {
    id: "gm-20",
    question:
      "某次測驗 33 人，成績分組為 A(1~25分)、B(26~50分)、C(51~75分)、D(76~100分)，各組人數為 3, 8, 12, 10。中位數在哪一組？",
    options: ["C組(51~75分)", "B組(26~50分)", "D組(76~100分)", "A組(1~25分)"],
    correctAnswer: "C組(51~75分)",
    explanation:
      "共 33 人（奇數），找第 17 人。\n累加：3, 11, 23。\n第 17 人在第三組 C(51~75)。",
    difficulty: "hard",
    topic: "odd-count",
  },
];

export default function GroupedMedianQuiz() {
  const { user, saveScore } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "result">("setup");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongList, setWrongList] = useState<MedianQuestion[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Map<string, string>>(new Map());
  const [showWrongOnly, setShowWrongOnly] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState(20);
  const [quizItems, setQuizItems] = useState<MedianQuestion[]>([]);

  const TOPIC_CONFIG: Record<string, { emoji: string; label: string }> = {
    concept: { emoji: "💡", label: "概念題" },
    "odd-count": { emoji: "🔢", label: "奇數找中位數" },
    "even-count": { emoji: "✌️", label: "偶數找中位數" },
    "find-position": { emoji: "🎯", label: "找位置" },
    application: { emoji: "🏫", label: "應用題" },
  };

  const DIFF_CONFIG: Record<string, { emoji: string; label: string }> = {
    easy: { emoji: "🟢", label: "基礎" },
    medium: { emoji: "🟡", label: "進階" },
    hard: { emoji: "🔴", label: "挑戰" },
  };

  const getFilteredPool = () => {
    let pool = [...QUESTIONS];
    if (topicFilter !== "all") pool = pool.filter((q) => q.topic === topicFilter);
    if (difficultyFilter !== "all") pool = pool.filter((q) => q.difficulty === difficultyFilter);
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

  const questions = showWrongOnly
    ? wrongList
    : quizItems.length > 0
    ? quizItems
    : QUESTIONS;
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
      const wrongQs: WrongQuestion[] = wrongList.map((q) => ({
        id: q.id,
        question: q.question,
        userAnswer: wrongAnswers.get(q.id) || "未作答",
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }));
      saveScore({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        subject: "math-grouped-median",
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

  // ===== Setup Phase =====
  if (phase === "setup") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="border-b pb-4 border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">📊 分組資料中位數 20 題</h1>
          <p className="text-gray-500 mt-1">共 {QUESTIONS.length} 題</p>
        </div>

        {/* Manny 口訣卡片 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-5 space-y-3">
          <h2 className="text-lg font-bold text-orange-700 flex items-center gap-2">
            🌟 Manny 的口訣：先算 → 找第幾個 → 看落在哪一組
          </h2>
          <div className="space-y-2 text-sm text-orange-800">
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-7 h-7 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">
                ①
              </span>
              <span className="pt-0.5">算總人數</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-7 h-7 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">
                ②
              </span>
              <span className="pt-0.5">
                找第幾個人（奇數：第 (n+1)/2 個；偶數：第 n/2 和第 n/2+1 個）
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-7 h-7 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">
                ③
              </span>
              <span className="pt-0.5">做累加</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                ④
              </span>
              <span className="pt-0.5 font-semibold">
                找那個人落在哪一組，就是答案！
              </span>
            </div>
          </div>
        </div>

        {/* 難度統計 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <span className="text-sm text-green-600">🟢 基礎</span>
            <p className="text-xl font-bold text-green-700">
              {QUESTIONS.filter((q) => q.difficulty === "easy").length}
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
            <span className="text-sm text-yellow-600">🟡 進階</span>
            <p className="text-xl font-bold text-yellow-700">
              {QUESTIONS.filter((q) => q.difficulty === "medium").length}
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <span className="text-sm text-red-600">🔴 挑戰</span>
            <p className="text-xl font-bold text-red-700">
              {QUESTIONS.filter((q) => q.difficulty === "hard").length}
            </p>
          </div>
        </div>

        {/* 篩選器 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
          <h3 className="font-bold text-gray-700">📋 選擇考試範圍</h3>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              題目類型
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTopicFilter("all")}
                className={`p-3 rounded-xl border-2 text-sm font-medium ${
                  topicFilter === "all"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                全部
              </button>
              {Object.entries(TOPIC_CONFIG).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setTopicFilter(key)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium ${
                    topicFilter === key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  {cfg.emoji} {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              難度
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setDifficultyFilter("all")}
                className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium ${
                  difficultyFilter === "all"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                全部
              </button>
              {Object.entries(DIFF_CONFIG).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setDifficultyFilter(key)}
                  className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium ${
                    difficultyFilter === key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  {cfg.emoji} {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              題數
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={filteredCount}
                value={Math.min(questionCount, filteredCount)}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-24 p-2 border-2 border-gray-200 rounded-xl text-center font-bold"
              />
              <span className="text-gray-500 text-sm">
                / {filteredCount} 題可用
              </span>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            開始測驗 🚀
          </button>
        </div>
      </div>
    );
  }

  // ===== Result Phase =====
  if (finished) {
    const finalScore = showWrongOnly
      ? Math.round((score / total) * 100)
      : Math.round((score / (quizItems.length > 0 ? quizItems.length : QUESTIONS.length)) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {showWrongOnly ? "📝 訂正結果" : "🎉 測驗完成！"}
          </h2>
          <div className="text-6xl font-black text-blue-600 mb-2">{finalScore}</div>
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
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
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

  // ===== Active Quiz Phase =====
  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-gray-500">
          {showWrongOnly ? "📝 訂正模式" : "📊 分組資料中位數測驗"}
        </span>
        <span className="text-sm font-bold text-blue-600">
          {currentIdx + 1} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Score */}
      <div className="flex justify-end mb-2">
        <span className="text-sm text-green-600 font-bold">✅ {score} 分</span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
        <p className="text-lg font-bold text-gray-800 mb-4 whitespace-pre-line">
          {q.question}
        </p>
        <div className="space-y-3">
          {q.options.map((opt) => {
            let style = "border-gray-200 hover:border-blue-400 hover:bg-blue-50";
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-blue-700 mb-1">💡 解析</p>
          <p className="text-sm text-blue-800 whitespace-pre-line">{q.explanation}</p>
        </div>
      )}

      {/* Next */}
      {selected && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {currentIdx + 1 < total ? "下一題 →" : "看結果 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
