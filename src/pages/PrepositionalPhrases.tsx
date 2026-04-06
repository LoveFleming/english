import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "We arrived just ___ time for the meeting.",
    options: ["in", "on", "at", "by"],
    correct: 0,
    explanation: "in time = 及時（差點來不及）"
  },
  {
    question: "The train arrived ___ time.",
    options: ["in", "on", "at", "by"],
    correct: 1,
    explanation: "on time = 準時"
  },
  {
    question: "She is ___ charge of the deployment.",
    options: ["on", "at", "in", "for"],
    correct: 2,
    explanation: "in charge of = 負責"
  },
  {
    question: "___ to the spec, this should work.",
    options: ["According", "Due", "Thanks", "In response"],
    correct: 0,
    explanation: "according to = 根據"
  },
    {
    question: "The outage was ___ a network issue.",
    options: ["because", "due to", "as a result", "since"],
    correct: 1,
    explanation: "due to = 由於（後接名詞）"
  },
  {
    question: "I'll grab coffee ___ the way to work.",
    options: ["in", "on", "at", "by"],
    correct: 1,
    explanation: "on the way = 在路上"
  },
  {
    question: "Use async/await ___ callbacks.",
    options: ["because of", "instead of", "in addition to", "thanks to"],
    correct: 1,
    explanation: "instead of = 而不是"
  },
  {
    question: "The build failed ___ a syntax error.",
    options: ["due to", "as a result", "instead of", "for example"],
    correct: 0,
    explanation: "because of = 因為（後接名詞）"
  },
  {
    question: "Let's debug this step ___ step.",
    options: ["in", "on", "by", "at"],
    correct: 2,
    explanation: "step by step = 一步一步"
  },
  {
    question: "I was ___ the middle of a code review.",
    options: ["in", "on", "at", "by"],
    correct: 0,
    explanation: "in the middle of = 在...中間"
  },
  {
    question: "Don't push code ___ a hurry.",
    options: ["in", "on", "at", "by"],
    correct: 0,
    explanation: "in a hurry = 匆忙"
  },
  {
    question: "___ other words, we need to refactor this.",
    options: ["By", "In", "On", "At"],
    correct: 1,
    explanation: "in other words = 換句話說"
  },
  {
    question: "The project is ___ schedule.",
    options: ["in", "on", "at", "by"],
    correct: 1,
    explanation: "on schedule = 按照進度"
  },
  {
    question: "We need to fix this ___ once.",
    options: ["in", "on", "at", "by"],
    correct: 2,
    explanation: "at once = 立刻"
  },
  {
    question: "I'm busy ___ the moment.",
    options: ["in", "on", "at", "by"],
    correct: 2,
    explanation: "at the moment = 目前"
  },
  {
    question: "___ a result, we missed the deadline.",
    options: ["As", "In", "On", "By"],
    correct: 0,
    explanation: "as a result = 結果"
  },
  {
    question: "___ the way, did you see the new PR?",
    options: ["By", "In", "On", "At"],
    correct: 0,
    explanation: "by the way = 順便一提"
  },
  {
    question: "___ fact, this bug has been there for months.",
    options: ["By", "In", "On", "At"],
    correct: 1,
    explanation: "in fact = 事實上"
  },
  {
    question: "Don't worry, the issue is ___ control.",
    options: ["in", "on", "at", "under"],
    correct: 3,
    explanation: "under control = 在控制中"
  },
  {
    question: "I know the API endpoints ___ heart.",
    options: ["in", "on", "at", "by"],
    correct: 3,
    explanation: "by heart = 背起來"
  },
];

export default function PrepositionalPhrases({ openApp }: { openApp: (id: string) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selected === questions[currentQ].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const finalScore = score + (selected === questions[currentQ].correct ? 1 : 0);
      setFinished(true);
      // Save score
      const saved = JSON.parse(localStorage.getItem("ppScores") || "[]");
      saved.push({ score: finalScore, total: questions.length, date: new Date().toISOString() });
      localStorage.setItem("ppScores", JSON.stringify(saved));
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
    setAnswers(Array(questions.length).fill(null));
  };

  const q = questions[currentQ];

  if (finished) {
    const finalScore = score + (selected === questions[currentQ].correct ? 1 : 0);
    const pct = Math.round((finalScore / questions.length) * 100);
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">🎯 測驗結束！</h2>
          <div className="text-6xl font-bold mb-4">
            {finalScore}/{questions.length}
          </div>
          <p className="text-lg text-gray-600 mb-2">{pct}% 正確</p>
          <p className="text-xl mb-6">
            {pct >= 90 ? "🌟 太棒了！" : pct >= 70 ? "👍 不錯！" : pct >= 50 ? "💪 繼續加油！" : "📖 多練習幾次吧！"}
          </p>
          <div className="space-y-2 mb-6 text-left">
            {questions.map((qq, i) => (
              <div key={i} className={`p-3 rounded ${answers[i] === qq.correct ? "bg-green-50 border-l-4 border-green-500" : "bg-red-50 border-l-4 border-red-500"}`}>
                <p className="text-sm font-medium">{i + 1}. {qq.question}</p>
                <p className="text-xs text-gray-600 mt-1">{qq.explanation}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={restart} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700">
              再考一次
            </button>
            <button onClick={() => openApp("present-simple")} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300">
              回到首頁
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">題目 {currentQ + 1} / {questions.length}</span>
          <span className="text-sm font-medium text-indigo-600">得分: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>

        <h3 className="text-lg font-semibold mb-6">{q.question}</h3>

        <div className="space-y-3 mb-6">
          {q.options.map((opt, i) => {
            let cls = "border-2 border-gray-200 hover:border-indigo-400";
            if (showResult) {
              if (i === q.correct) cls = "border-2 border-green-500 bg-green-50";
              else if (i === selected && i !== q.correct) cls = "border-2 border-red-500 bg-red-50";
            } else if (i === selected) {
              cls = "border-2 border-indigo-500 bg-indigo-50";
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg transition ${cls}`}
              >
                <span className="font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg mb-4 ${selected === q.correct ? "bg-green-50" : "bg-red-50"}`}>
            <p className="font-medium">{selected === q.correct ? "✅ 正確！" : "❌ 錯了！"}</p>
            <p className="text-sm text-gray-600 mt-1">{q.explanation}</p>
          </div>
        )}

        {!showResult ? (
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            確認答案
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700"
          >
            {currentQ + 1 < questions.length ? "下一題 →" : "看成績 📊"}
          </button>
        )}
      </div>
    </div>
  );
}
