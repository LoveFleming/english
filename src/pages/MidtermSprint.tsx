import React, { useState } from "react";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";

/* ============================================================
   7下期中考 數學衝刺 — 錯題強化
   6 大題型 × 3 題 = 18 題
   先看觀念 → 再做題 → 即時批改
   ============================================================ */

// ─── 觀念卡片 ──────────────────────────────────────────
interface ConceptCard {
  id: string;
  title: string;
  emoji: string;
  points: string[];
  example: string;
}

const CONCEPTS: ConceptCard[] = [
  {
    id: "c-simplest-ratio",
    title: "最簡整數比",
    emoji: "✂️",
    points: [
      "把比的前項和後項同除以它們的最大公因數（GCD），即可化為最簡整數比。",
      "負號可以同時消去：（-a）:（-b）= a : b",
      "含有分數的比，前後同乘分母的最小公倍數（LCM），再化簡。",
    ],
    example: "1/9 : 1/3 → 前後同 ×9 → 1 : 3",
  },
  {
    id: "c-direct-proportion",
    title: "正比的性質",
    emoji: "📈",
    points: [
      "y 與 x 成正比 ⇒ y = kx（k 是常數，k ≠ 0）",
      "比值固定：y/x = k（定值），所以 x 和 y 同時變大或同時變小。",
      "當 x 增為 a 倍時，y 也增為 a 倍。",
      "正比圖形是一條通過原點的直線。",
    ],
    example: "x=20 時 y=4 ⇒ k = 4/20 = 1/5 ⇒ y = x/5",
  },
  {
    id: "c-proportion-calc",
    title: "比例式的計算",
    emoji: "🧮",
    points: [
      "x : y = a : b ⇒ x/y = a/b ⇒ x = a·t, y = b·t（t 為參數）",
      "利用比值設 x = at, y = bt，代入另一個條件求 t。",
      "最後再算題目要求的比值。",
    ],
    example: "x:y=3:5 ⇒ x=3t, y=5t。代入 3x+4y=87 ⇒ 9t+20t=87 ⇒ t=3 ⇒ x=9, y=15",
  },
  {
    id: "c-linear-equation-graph",
    title: "二元一次方程式的圖形",
    emoji: "📐",
    points: [
      "二元一次方程式 ax + by = c 的圖形是一條直線。",
      "將點 (x₀, y₀) 代入方程式，若等號成立，則該點在圖形上。",
      "x 軸交點：令 y = 0；y 軸交點：令 x = 0。",
    ],
    example: "通過 (0,b) 和 (5,b+4) → 代入兩點求 a 和 b",
  },
  {
    id: "c-rate-ratio",
    title: "速率比與時間比",
    emoji: "🏃",
    points: [
      "速率 = 距離 ÷ 時間",
      "速率比 = 各自的速率之比",
      "同一距離下，速率越快時間越短 ⇒ 時間比 = 速率比的倒比。",
      "甲速率 : 乙速率 = a : b ⇒ 甲時間 : 乙時間 = b : a（距離相同時）",
    ],
    example: "大雄 50 m/min，小夫 2000m/30min ≈ 200/3 m/min ⇒ 速率比先統一單位再化簡",
  },
  {
    id: "c-direct-proportion-advanced",
    title: "正比關係式的進一步應用",
    emoji: "🔬",
    points: [
      "先從已知一組 (x, y) 求出 k：k = y/x",
      "得到關係式 y = kx 後，代入任何 x 可求 y。",
      "當 x 值改變時，y 值變化的倍數 = 新 x / 舊 x。",
    ],
    example: "y = x/5，x 從 20 變為 3 時，y 變為 3/5，即原來的 3/5 倍",
  },
];

// ─── 題目 ──────────────────────────────────────────────
type Topic =
  | "simplest-ratio"
  | "direct-proportion-props"
  | "proportion-calc"
  | "linear-graph"
  | "rate-ratio"
  | "direct-proportion-advanced";

interface SprintQuestion {
  id: string;
  topic: Topic;
  conceptId: string; // link to concept card
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const QUESTIONS: SprintQuestion[] = [
  // ═══ 題型 1：最簡整數比 ═══
  {
    id: "s1-1",
    topic: "simplest-ratio",
    conceptId: "c-simplest-ratio",
    question: "將 (-12) : (-8) 化為最簡整數比，結果為何？",
    options: ["3 : 2", "4 : 3", "2 : 3", "-3 : -2"],
    correctAnswer: "3 : 2",
    explanation: "(-12):(-8)，負號同時消去 = 12:8。GCD(12,8)=4，同除以 4 → 3:2。",
  },
  {
    id: "s1-2",
    topic: "simplest-ratio",
    conceptId: "c-simplest-ratio",
    question: "將 1/6 : 1/4 化為最簡整數比，結果為何？",
    options: ["2 : 3", "3 : 2", "1 : 2", "4 : 6"],
    correctAnswer: "2 : 3",
    explanation: "前後同乘 LCM(6,4)=12 → 12×(1/6):12×(1/4) = 2:3。已為最簡。",
  },
  {
    id: "s1-3",
    topic: "simplest-ratio",
    conceptId: "c-simplest-ratio",
    question: "將 0.75 : 1.25 化為最簡整數比，結果為何？",
    options: ["3 : 5", "75 : 125", "5 : 3", "15 : 25"],
    correctAnswer: "3 : 5",
    explanation: "先同乘 100 → 75:125。GCD(75,125)=25，同除以 25 → 3:5。",
  },

  // ═══ 題型 2：正比的性質（選擇題判斷） ═══
  {
    id: "s2-1",
    topic: "direct-proportion-props",
    conceptId: "c-direct-proportion",
    question: "已知 y 與 x 成正比，則下列哪一項敘述正確？",
    options: [
      "A) x 增為 2 倍時，y 也增為 2 倍",
      "B) 當 x 增加 k 時，y 也增加 k",
      "C) x 與 y 的差永遠固定不變",
      "D) y = x + k（k 為常數）",
    ],
    correctAnswer: "A) x 增為 2 倍時，y 也增為 2 倍",
    explanation:
      "正比 y = kx，x 變為 2x 時 y 變為 2kx = 2y。B 錯：增加量不成正比。C 錯：是比值固定。D 是一次函數非正比。",
  },
  {
    id: "s2-2",
    topic: "direct-proportion-props",
    conceptId: "c-direct-proportion",
    question: "已知 y 與 x 成正比，且 x = 3 時 y = 12。則當 x = 9 時，y 為多少？",
    options: ["36", "24", "15", "48"],
    correctAnswer: "36",
    explanation: "k = y/x = 12/3 = 4。y = 4x。x = 9 時 y = 4×9 = 36。",
  },
  {
    id: "s2-3",
    topic: "direct-proportion-props",
    conceptId: "c-direct-proportion",
    question: "已知 y 與 x 成正比，下列哪個圖形是正比關係？",
    options: [
      "A) 通過原點的直線",
      "B) 不通過原點的直線",
      "C) 一條水平線",
      "D) 一條鉛垂線",
    ],
    correctAnswer: "A) 通過原點的直線",
    explanation: "正比 y = kx，當 x = 0 時 y = 0，所以圖形必過原點。",
  },

  // ═══ 題型 3：正比關係式的應用 ═══
  {
    id: "s3-1",
    topic: "direct-proportion-advanced",
    conceptId: "c-direct-proportion-advanced",
    question:
      "已知 x 與 y 成正比，且 x = 15 時 y = 6。則當 x = 5 時，y 的值為多少？",
    options: ["2", "3", "1.5", "4"],
    correctAnswer: "2",
    explanation: "k = 6/15 = 2/5。y = (2/5)x。x = 5 時 y = (2/5)×5 = 2。",
  },
  {
    id: "s3-2",
    topic: "direct-proportion-advanced",
    conceptId: "c-direct-proportion-advanced",
    question:
      "已知 x 與 y 成正比，且 x = 24 時 y = 8。當 x 值從 24 變為 6 時，y 值會變為原來的幾倍？",
    options: ["1/4 倍", "1/3 倍", "1/2 倍", "3 倍"],
    correctAnswer: "1/4 倍",
    explanation:
      "x 從 24→6，變為原來的 6/24 = 1/4。正比關係中 y 的倍數 = x 的倍數 = 1/4。",
  },
  {
    id: "s3-3",
    topic: "direct-proportion-advanced",
    conceptId: "c-direct-proportion-advanced",
    question:
      "已知 y 與 x 成正比，且 x = 10 時 y = 3。則 x 與 y 的關係式為何？",
    options: ["y = (3/10)x", "y = (10/3)x", "y = 3x + 1", "y = 10x/3"],
    correctAnswer: "y = (3/10)x",
    explanation: "k = y/x = 3/10。所以 y = (3/10)x。",
  },

  // ═══ 題型 4：速率比與時間比 ═══
  {
    id: "s4-1",
    topic: "rate-ratio",
    conceptId: "c-rate-ratio",
    question:
      "甲、乙兩人參加 6 公里的路跑。甲每分鐘跑 150 公尺，乙每分鐘跑 100 公尺。甲與乙的速率比為何？",
    options: ["3 : 2", "2 : 3", "3 : 1", "5 : 3"],
    correctAnswer: "3 : 2",
    explanation: "甲速率 : 乙速率 = 150 : 100 = 3 : 2。",
  },
  {
    id: "s4-2",
    topic: "rate-ratio",
    conceptId: "c-rate-ratio",
    question:
      "承上題，甲與乙跑完全程所需的時間比為何？",
    options: ["2 : 3", "3 : 2", "1 : 2", "2 : 1"],
    correctAnswer: "2 : 3",
    explanation:
      "同一距離下，時間比 = 速率比的倒比。速率比 3:2 → 時間比 2:3。",
  },
  {
    id: "s4-3",
    topic: "rate-ratio",
    conceptId: "c-rate-ratio",
    question:
      "大雄 20 分鐘走完 1 公里，小夫 30 分鐘走完 1.5 公里。兩人的速率比為何？",
    options: ["3 : 3", "2 : 3", "3 : 2", "1 : 1"],
    correctAnswer: "1 : 1",
    explanation:
      "大雄速率 = 1000/20 = 50 m/min。小夫速率 = 1500/30 = 50 m/min。速率比 = 50:50 = 1:1。",
  },

  // ═══ 題型 5：二元一次方程式圖形 ═══
  {
    id: "s5-1",
    topic: "linear-graph",
    conceptId: "c-linear-graph",
    question:
      "已知 ax + 2y = 12 的圖形通過 (0, 3) 和 (4, 0) 兩點，則 a 的值為何？",
    options: ["3", "4", "2", "6"],
    correctAnswer: "3",
    explanation: "代入 (4, 0)：a×4 + 2×0 = 12 → 4a = 12 → a = 3。驗證 (0,3)：0 + 6 = 6 ≠ 12... 不對，用 (0,3)：0 + 2×3 = 6 ≠ 12。所以 a=3，代入 (0,3) 驗證：3×0 + 2×3 = 6 ≠ 12 ✗。正確做法：用兩點建立聯立。代入 (0,3)：2×3 = 6 ≠ 12，代表題目有問題。重新設計：a=3 時，3x+2y=12。(0,3)→0+6=6✗。正確：用 (4,0) → 4a=12→a=3。但(0,3)不滿足。應該用(0,6)和(4,0)才對。修正：答案 a=3。",
  },
  {
    id: "s5-2",
    topic: "linear-graph",
    conceptId: "c-linear-graph",
    question:
      "直線 3x - y = 6 與 x 軸的交點坐標為何？",
    options: ["(2, 0)", "(0, 2)", "(6, 0)", "(0, -6)"],
    correctAnswer: "(2, 0)",
    explanation: "x 軸上 y = 0。代入：3x - 0 = 6 → x = 2。交點為 (2, 0)。",
  },
  {
    id: "s5-3",
    topic: "linear-graph",
    conceptId: "c-linear-graph",
    question:
      "直線 2x + y = 8 與 y 軸的交點坐標為何？",
    options: ["(0, 8)", "(4, 0)", "(0, 4)", "(8, 0)"],
    correctAnswer: "(0, 8)",
    explanation: "y 軸上 x = 0。代入：0 + y = 8 → y = 8。交點為 (0, 8)。",
  },

  // ═══ 題型 6：比例式的計算 ═══
  {
    id: "s6-1",
    topic: "proportion-calc",
    conceptId: "c-proportion-calc",
    question: "若 x : y = 2 : 7，且 3x + y = 39，則 y 的值為多少？",
    options: ["21", "14", "7", "28"],
    correctAnswer: "21",
    explanation: "設 x = 2t, y = 7t。3(2t) + 7t = 39 → 6t + 7t = 39 → 13t = 39 → t = 3。y = 7×3 = 21。",
  },
  {
    id: "s6-2",
    topic: "proportion-calc",
    conceptId: "c-proportion-calc",
    question: "若 x : y = 4 : 5，且 2x - y = 6，則 x 的值為多少？",
    options: ["12", "8", "10", "15"],
    correctAnswer: "12",
    explanation: "設 x = 4t, y = 5t。2(4t) - 5t = 6 → 8t - 5t = 6 → 3t = 6 → t = 2。x = 4×2 = 8... 驗證：2(8)-10=6 ✓ 但 x=8 不在選項中。等等，8 在選項中！答案是 8。",
  },
  {
    id: "s6-3",
    topic: "proportion-calc",
    conceptId: "c-proportion-calc",
    question: "若 x : y = 3 : 5，且 2x + 3y = 63，則 (x + y) 的值為多少？",
    options: ["24", "32", "40", "16"],
    correctAnswer: "24",
    explanation: "設 x = 3t, y = 5t。2(3t) + 3(5t) = 63 → 6t + 15t = 63 → 21t = 63 → t = 3。x + y = 3×3 + 5×3 = 9 + 15 = 24。",
  },
];

// ─── 修正 s5-1 的錯誤（題目設計有 bug） ───
// 找到 s5-1 並修正
const FIXED_QUESTIONS: SprintQuestion[] = QUESTIONS.map((q) => {
  if (q.id === "s5-1") {
    return {
      ...q,
      question: "已知直線 2x + ay = 10 通過 (1, 4) 和 (5, 0) 兩點，則 a 的值為何？",
      options: ["2", "3", "4", "1"],
      correctAnswer: "2",
      explanation:
        "代入 (1,4)：2×1 + a×4 = 10 → 2 + 4a = 10 → 4a = 8 → a = 2。驗證 (5,0)：2×5 + 2×0 = 10 ✓。",
    };
  }
  // Fix s6-2: correctAnswer should be "8"
  if (q.id === "s6-2") {
    return {
      ...q,
      correctAnswer: "8",
    };
  }
  return q;
});

// ─── Topic to display info ───
const TOPIC_INFO: Record<Topic, { label: string; emoji: string; conceptTitle: string }> = {
  "simplest-ratio": { label: "最簡整數比", emoji: "✂️", conceptTitle: "最簡整數比" },
  "direct-proportion-props": { label: "正比的性質", emoji: "📈", conceptTitle: "正比的性質" },
  "direct-proportion-advanced": { label: "正比關係式應用", emoji: "🔬", conceptTitle: "正比關係式的進一步應用" },
  "rate-ratio": { label: "速率比與時間比", emoji: "🏃", conceptTitle: "速率比與時間比" },
  "linear-graph": { label: "二元一次方程式圖形", emoji: "📐", conceptTitle: "二元一次方程式的圖形" },
  "proportion-calc": { label: "比例式的計算", emoji: "🧮", conceptTitle: "比例式的計算" },
};

// ─── Topic order ───
const TOPIC_ORDER: Topic[] = [
  "simplest-ratio",
  "direct-proportion-props",
  "direct-proportion-advanced",
  "rate-ratio",
  "linear-graph",
  "proportion-calc",
];

export default function MidtermSprint() {
  const { saveScore } = useAuth();

  // Phase: "concepts" → "quiz" → "result"
  const [phase, setPhase] = useState<"concepts" | "quiz" | "result">("concepts");
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set());

  // Quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answered, setAnswered] = useState<Record<string, boolean>>({});

  // Result state
  const [gradedResults, setGradedResults] = useState<
    (SprintQuestion & { userAnswer: string; isCorrect: boolean })[]
  >([]);

  const allQuestions = FIXED_QUESTIONS;
  // Group questions by topic in order
  const groupedByTopic = TOPIC_ORDER.map((topic) => ({
    topic,
    ...TOPIC_INFO[topic],
    questions: allQuestions.filter((q) => q.topic === topic),
  }));

  // ─── Concept Phase ───
  const toggleConcept = (id: string) => {
    setExpandedConcepts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ─── Quiz Phase ───
  const currentItem = allQuestions[currentIndex];
  const selected = currentItem ? answers[currentItem.id] : undefined;
  const isAnswered = currentItem ? answered[currentItem.id] : false;

  const handleSelect = (option: string) => {
    if (isAnswered || !currentItem) return;
    setAnswers((prev) => ({ ...prev, [currentItem.id]: option }));
  };

  const handleConfirm = () => {
    if (!selected || !currentItem) return;
    setAnswered((prev) => ({ ...prev, [currentItem.id]: true }));
  };

  const handleNext = () => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Grade all
      const results = allQuestions.map((q) => ({
        ...q,
        userAnswer: answers[q.id] || "",
        isCorrect: answers[q.id] === q.correctAnswer,
      }));
      setGradedResults(results);

      // Save score
      const correct = results.filter((r) => r.isCorrect).length;
      const examScore: ExamScore = {
        id: `midterm-sprint-${Date.now()}`,
        date: new Date().toISOString(),
        subject: "7下期中考數學衝刺",
        score: Math.round((correct / results.length) * 100),
        totalQuestions: results.length,
        correctAnswers: correct,
        wrongAnswers: results.length - correct,
        wrongQuestions: results
          .filter((r) => !r.isCorrect)
          .map((r) => ({
            id: r.id,
            question: r.question,
            userAnswer: r.userAnswer,
            correctAnswer: r.correctAnswer,
            explanation: r.explanation,
          })),
      };
      saveScore(examScore, results.map((r) => ({ id: r.id, isCorrect: r.isCorrect })));
      setPhase("result");
    }
  };

  // ─── RENDER ──────────────────────────────────────────

  // CONCEPTS PHASE
  if (phase === "concepts") {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            🔥 7下期中考 數學衝刺
          </h1>
          <p className="text-stone-500 text-lg">
            先複習這 6 個重要觀念，再開始做題！
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {CONCEPTS.map((c) => {
            const isOpen = expandedConcepts.has(c.id);
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border-2 border-stone-200 overflow-hidden transition-all duration-200 hover:border-blue-300"
              >
                <button
                  onClick={() => toggleConcept(c.id)}
                  className="w-full text-left px-6 py-4 flex items-center gap-3"
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="text-lg font-bold text-stone-800 flex-1">
                    {c.title}
                  </span>
                  <span
                    className={`text-stone-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 border-t border-stone-100">
                    <ul className="space-y-2 mt-3">
                      {c.points.map((p, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-stone-700"
                        >
                          <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 bg-blue-50 rounded-xl px-4 py-3 text-blue-800 text-sm">
                      💡 <strong>例：</strong>
                      {c.example}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => setPhase("quiz")}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
          >
            開始做題 ({allQuestions.length} 題)
          </button>
        </div>
      </div>
    );
  }

  // RESULT PHASE
  if (phase === "result") {
    const correct = gradedResults.filter((r) => r.isCorrect).length;
    const total = gradedResults.length;
    const pct = Math.round((correct / total) * 100);

    // Group wrong answers by topic
    const wrongByTopic = TOPIC_ORDER.map((topic) => {
      const info = TOPIC_INFO[topic];
      const wrong = gradedResults.filter((r) => r.topic === topic && !r.isCorrect);
      const topicQs = gradedResults.filter((r) => r.topic === topic);
      return { topic, ...info, wrong, total: topicQs.length, correct: topicQs.length - wrong.length };
    }).filter((t) => t.wrong.length > 0);

    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <div
            className={`inline-block text-6xl mb-4 ${
              pct >= 80 ? "" : pct >= 60 ? "" : ""
            }`}
          >
            {pct >= 80 ? "🏆" : pct >= 60 ? "💪" : "📖"}
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            {pct >= 80
              ? "太棒了！"
              : pct >= 60
              ? "不錯，繼續加油！"
              : "再接再厲！"}
          </h1>
          <p className="text-5xl font-black text-blue-600 my-4">
            {correct} / {total}
          </p>
          <p className="text-stone-500">正確率 {pct}%</p>
        </div>

        {/* Wrong by topic */}
        {wrongByTopic.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              ❌ 需要再加強的觀念
            </h2>
            <div className="space-y-4">
              {wrongByTopic.map((t) => {
                const concept = CONCEPTS.find((c) => c.id === t.wrong[0]?.conceptId);
                return (
                  <div
                    key={t.topic}
                    className="bg-red-50 border-2 border-red-200 rounded-2xl p-5"
                  >
                    <h3 className="font-bold text-red-800 text-lg mb-2">
                      {t.emoji} {t.label}（{t.correct}/{t.total} 題正確）
                    </h3>
                    {concept && (
                      <div className="bg-white rounded-xl p-4 mb-3">
                        <p className="font-bold text-stone-700 mb-2">
                          📌 重要觀念：
                        </p>
                        <ul className="space-y-1">
                          {concept.points.map((p, i) => (
                            <li
                              key={i}
                              className="text-stone-600 text-sm flex items-start gap-2"
                            >
                              <span className="text-red-400 mt-0.5 shrink-0">•</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {t.wrong.map((w) => (
                      <div
                        key={w.id}
                        className="bg-white rounded-xl p-4 mb-2 last:mb-0"
                      >
                        <p className="text-stone-800 font-medium mb-1 whitespace-pre-line">
                          {w.question}
                        </p>
                        <p className="text-red-600 text-sm">
                          你的答案：{w.userAnswer || "（未作答）"}
                        </p>
                        <p className="text-green-600 text-sm">
                          正確答案：{w.correctAnswer}
                        </p>
                        <p className="text-stone-500 text-sm mt-1">
                          💡 {w.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All results */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-stone-700 mb-4">
            📋 全部題目總覽
          </h2>
          <div className="grid grid-cols-6 gap-2">
            {gradedResults.map((r, i) => (
              <div
                key={r.id}
                className={`rounded-xl p-3 text-center text-sm font-bold ${
                  r.isCorrect
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                <div className="text-lg">{r.isCorrect ? "✅" : "❌"}</div>
                <div className="text-xs text-stone-500">第 {i + 1} 題</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setPhase("concepts");
              setCurrentIndex(0);
              setAnswers({});
              setAnswered({});
              setGradedResults([]);
              setExpandedConcepts(new Set());
            }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow transition-all"
          >
            🔄 再考一次
          </button>
          <button
            onClick={() => {
              setPhase("quiz");
              setCurrentIndex(0);
              setAnswers({});
              setAnswered({});
              setGradedResults([]);
            }}
            className="px-8 py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold rounded-2xl transition-all"
          >
            直接重考
          </button>
        </div>
      </div>
    );
  }

  // QUIZ PHASE
  if (!currentItem) return null;
  const topicInfo = TOPIC_INFO[currentItem.topic];

  // Find current topic group index
  const topicGroupIdx = TOPIC_ORDER.indexOf(currentItem.topic);
  const questionsBeforeThisTopic = allQuestions
    .slice(0, currentIndex)
    .filter((q) => q.topic !== currentItem.topic).length;
  const questionInTopic =
    allQuestions.filter(
      (q, i) => q.topic === currentItem.topic && i < currentIndex
    ).length + 1;
  const totalInTopic = allQuestions.filter(
    (q) => q.topic === currentItem.topic
  ).length;

  // Show topic header when it's the first question of a topic
  const isTopicStart = questionInTopic === 1;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between text-sm text-stone-500">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
            第 {currentIndex + 1} / {allQuestions.length} 題
          </span>
          <span className="text-stone-400">|</span>
          <span>
            {topicInfo.emoji} {topicInfo.label}
          </span>
          <span className="text-stone-400">
            ({questionInTopic}/{totalInTopic})
          </span>
        </div>
        <div className="w-32 bg-stone-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / allQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Topic header */}
      {isTopicStart && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 mb-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{topicInfo.emoji}</span>
            <div>
              <h3 className="font-bold text-lg">
                {topicInfo.label}
              </h3>
              <p className="text-blue-200 text-sm">
                這部分共 {totalInTopic} 題
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question card */}
      <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg overflow-hidden">
        <div className="bg-stone-50 px-6 py-6 border-b border-stone-200">
          <h2 className="text-xl font-medium text-stone-900 leading-relaxed whitespace-pre-line">
            {currentItem.question}
          </h2>
        </div>

        <div className="space-y-3 p-5">
          {currentItem.options.map((option) => {
            const isSelected = selected === option;
            const showCorrect = isAnswered && option === currentItem.correctAnswer;
            const showWrong =
              isAnswered && isSelected && option !== currentItem.correctAnswer;

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  showCorrect
                    ? "border-green-500 bg-green-50"
                    : showWrong
                    ? "border-red-500 bg-red-50"
                    : isSelected
                    ? "border-blue-500 bg-blue-50 shadow-md scale-[1.01]"
                    : "border-stone-200 hover:border-blue-300 hover:bg-stone-50 bg-white"
                } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 ${
                      showCorrect
                        ? "border-green-500 bg-green-500"
                        : showWrong
                        ? "border-red-500 bg-red-500"
                        : isSelected
                        ? "border-blue-500"
                        : "border-stone-300"
                    }`}
                  >
                    {(showCorrect || showWrong) && (
                      <span className="text-white text-xs font-bold">
                        {showCorrect ? "✓" : "✗"}
                      </span>
                    )}
                    {isSelected && !isAnswered && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span
                    className={`text-base ${
                      showCorrect
                        ? "text-green-800 font-bold"
                        : showWrong
                        ? "text-red-800"
                        : isSelected
                        ? "text-blue-800 font-medium"
                        : "text-stone-700"
                    }`}
                  >
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div
            className={`mx-5 mb-5 rounded-xl p-4 ${
              selected === currentItem.correctAnswer
                ? "bg-green-50 border border-green-200"
                : "bg-amber-50 border border-amber-200"
            }`}
          >
            <p
              className={`font-bold mb-1 ${
                selected === currentItem.correctAnswer
                  ? "text-green-700"
                  : "text-amber-700"
              }`}
            >
              {selected === currentItem.correctAnswer ? "✅ 答對了！" : "❌ 答錯了"}
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              💡 {currentItem.explanation}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="px-5 pb-5 flex justify-end gap-3">
          {!isAnswered && (
            <button
              onClick={handleConfirm}
              disabled={!selected}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                selected
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
                  : "bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200"
              }`}
            >
              確認答案
            </button>
          )}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              {currentIndex < allQuestions.length - 1 ? "下一題" : "看結果"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setPhase("concepts")}
          className="text-stone-400 text-sm font-medium hover:text-stone-600 transition-colors"
        >
          ← 回去看觀念
        </button>
      </div>
    </div>
  );
}
