import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  // Basic Form (1-10)
  { question: "She ___ a book right now.", options: ["reads", "is reading", "read", "reading"], correct: 1, explanation: "現在進行式：is + V-ing" },
  { question: "They ___ football at the moment.", options: ["play", "are playing", "plays", "played"], correct: 1, explanation: "現在進行式：are + V-ing" },
  { question: "I ___ TV now.", options: ["watch", "am watching", "watches", "watched"], correct: 1, explanation: "現在進行式：am + V-ing" },
  { question: "He ___ his homework.", options: ["does", "is doing", "do", "did"], correct: 1, explanation: "現在進行式：is + V-ing" },
  { question: "We ___ dinner at the moment.", options: ["cook", "are cooking", "cooks", "cooked"], correct: 1, explanation: "現在進行式：are + V-ing" },
  { question: "The baby ___ loudly.", options: ["cries", "is crying", "cry", "cried"], correct: 1, explanation: "現在進行式：is + V-ing（cry → crying）" },
  { question: "It ___ outside right now.", options: ["rains", "is raining", "rain", "rained"], correct: 1, explanation: "現在進行式：is + V-ing（rain → raining）" },
  { question: "You ___ very fast today.", options: ["run", "are running", "runs", "ran"], correct: 1, explanation: "現在進行式：are + V-ing（run → running）" },
  { question: "My sister ___ a letter to her friend.", options: ["writes", "is writing", "write", "wrote"], correct: 1, explanation: "現在進行式：is + V-ing（write → writing，去 e）" },
  { question: "The students ___ a test now.", options: ["take", "are taking", "takes", "took"], correct: 1, explanation: "現在進行式：are + V-ing（take → taking，去 e）" },

  // Negative Form (11-18)
  { question: "She ___ right now. She is sleeping.", options: ["isn't working", "doesn't work", "not working", "don't work"], correct: 0, explanation: "現在進行式否定：isn't + V-ing" },
  { question: "They ___ TV. They are studying.", options: ["aren't watching", "don't watch", "not watching", "doesn't watch"], correct: 0, explanation: "現在進行式否定：aren't + V-ing" },
  { question: "I ___ a movie. I'm reading a book.", options: ["am not watching", "don't watch", "not watch", "doesn't watch"], correct: 0, explanation: "現在進行式否定：am not + V-ing" },
  { question: "He ___ to music. He is sleeping.", options: ["isn't listening", "doesn't listen", "not listen", "don't listen"], correct: 0, explanation: "現在進行式否定：isn't + V-ing" },
  { question: "We ___ English now. We are playing.", options: ["aren't learning", "don't learn", "not learn", "doesn't learn"], correct: 0, explanation: "現在進行式否定：aren't + V-ing" },
  { question: "The dog ___ . It is sleeping.", options: ["isn't barking", "doesn't bark", "not bark", "don't bark"], correct: 0, explanation: "現在進行式否定：isn't + V-ing" },
  { question: "You ___ attention. Please focus!", options: ["aren't paying", "don't pay", "not pay", "doesn't pay"], correct: 0, explanation: "現在進行式否定：aren't + V-ing" },
  { question: "It ___ today. The sun is shining.", options: ["isn't raining", "doesn't rain", "not rain", "don't rain"], correct: 0, explanation: "現在進行式否定：isn't + V-ing" },

  // Question Form (19-26)
  { question: "___ she ___ a book right now?", options: ["Is / reading", "Does / read", "Are / reading", "Do / read"], correct: 0, explanation: "現在進行式疑問：Is + 主詞 + V-ing" },
  { question: "___ they ___ football?", options: ["Are / playing", "Do / play", "Is / playing", "Does / play"], correct: 0, explanation: "現在進行式疑問：Are + 主詞 + V-ing" },
  { question: "___ you ___ for the bus?", options: ["Are / waiting", "Do / wait", "Is / waiting", "Does / wait"], correct: 0, explanation: "現在進行式疑問：Are + 主詞 + V-ing" },
  { question: "___ he ___ to school now?", options: ["Is / walking", "Does / walk", "Are / walking", "Do / walk"], correct: 0, explanation: "現在進行式疑問：Is + 主詞 + V-ing" },
  { question: "___ it ___ outside?", options: ["Is / snowing", "Does / snow", "Are / snowing", "Do / snow"], correct: 0, explanation: "現在進行式疑問：Is + 主詞 + V-ing" },
  { question: "___ your mom ___ dinner?", options: ["Is / cooking", "Does / cook", "Are / cooking", "Do / cook"], correct: 0, explanation: "現在進行式疑問：Is + 主詞 + V-ing" },
  { question: "What ___ you ___ right now?", options: ["are / doing", "do / do", "is / doing", "does / do"], correct: 0, explanation: "現在進行式疑問：are + 主詞 + V-ing" },
  { question: "Where ___ she ___?", options: ["is / going", "does / go", "are / going", "do / go"], correct: 0, explanation: "現在進行式疑問：is + 主詞 + V-ing" },

  // Spelling Rules (27-36)
  { question: "He is ___ (run) in the park.", options: ["running", "runing", "runnung", "runs"], correct: 0, explanation: "短母音+子音結尾 → 雙寫子音：run → running" },
  { question: "She is ___ (swim) in the pool.", options: ["swimming", "swiming", "swimning", "swims"], correct: 0, explanation: "短母音+子音結尾 → 雙寫子音：swim → swimming" },
  { question: "They are ___ (sit) on the chair.", options: ["sitting", "siting", "sitning", "sits"], correct: 0, explanation: "短母音+子音結尾 → 雙寫子音：sit → sitting" },
  { question: "The baby is ___ (smile) at me.", options: ["smiling", "smilling", "smilng", "smiles"], correct: 0, explanation: "e 結尾 → 去 e + ing：smile → smiling" },
  { question: "I am ___ (write) a story.", options: ["writing", "writeing", "writting", "writes"], correct: 0, explanation: "e 結尾 → 去 e + ing：write → writing" },
  { question: "She is ___ (dance) beautifully.", options: ["dancing", "danceing", "dancning", "dances"], correct: 0, explanation: "e 結尾 → 去 e + ing：dance → dancing" },
  { question: "He is ___ (make) a cake.", options: ["making", "makeing", "makking", "makes"], correct: 0, explanation: "e 結尾 → 去 e + ing：make → making" },
  { question: "They are ___ (shop) at the mall.", options: ["shopping", "shoping", "shoppping", "shops"], correct: 0, explanation: "短母音+子音結尾 → 雙寫子音：shop → shopping" },
  { question: "She is ___ (study) English now.", options: ["studying", "studyng", "studying", "studies"], correct: 0, explanation: "y 結尾 → 直接加 ing：study → studying" },
  { question: "He is ___ (lie) on the bed.", options: ["lying", "lieing", "lying", "lies"], correct: 0, explanation: "ie 結尾 → 改 y + ing：lie → lying" },

  // Present Simple vs Present Continuous (37-50)
  { question: "She ___ coffee every morning. (habit)", options: ["drinks", "is drinking", "drink", "drinking"], correct: 0, explanation: "習慣/例行公事 → 現在簡單式" },
  { question: "She ___ coffee right now. (now)", options: ["drinks", "is drinking", "drink", "drinking"], correct: 1, explanation: "正在做 → 現在進行式" },
  { question: "They ___ to school every day. (habit)", options: ["walk", "are walking", "walks", "walking"], correct: 0, explanation: "習慣/例行公事 → 現在簡單式" },
  { question: "They ___ to school now. (now)", options: ["walk", "are walking", "walks", "walking"], correct: 1, explanation: "正在做 → 現在進行式" },
  { question: "The sun ___ in the east. (fact)", options: ["rises", "is rising", "rise", "rising"], correct: 0, explanation: "事實/真理 → 現在簡單式" },
  { question: "Look! The sun ___ . (now)", options: ["rises", "is rising", "rise", "rising"], correct: 1, explanation: "Look! → 現在進行式" },
  { question: "He ___ Japanese. (ability)", options: ["speaks", "is speaking", "speak", "speaking"], correct: 0, explanation: "能力/事實 → 現在簡單式" },
  { question: "He ___ Japanese right now. (now)", options: ["speaks", "is speaking", "speak", "speaking"], correct: 1, explanation: "正在做 → 現在進行式" },
  { question: "I ___ what you mean. (state)", options: ["understand", "am understanding", "understands", "understanding"], correct: 0, explanation: "狀態動詞（understand, know, like）不用進行式" },
  { question: "I ___ this song! (feeling)", options: ["love", "am loving", "loves", "loving"], correct: 0, explanation: "情感動詞（love, like, hate）通常不用進行式" },
  { question: "She ___ a new dress today. (temporary)", options: ["wears", "is wearing", "wear", "wearing"], correct: 1, explanation: "today 強調臨時狀態 → 現在進行式" },
  { question: "She ___ glasses. (permanent)", options: ["wears", "is wearing", "wear", "wearing"], correct: 0, explanation: "永久狀態 → 現在簡單式" },
  { question: "Be quiet! The baby ___ .", options: ["sleeps", "is sleeping", "sleep", "sleeping"], correct: 1, explanation: "Be quiet! → 正在發生 → 現在進行式" },
  { question: "Water ___ at 100 degrees. (fact)", options: ["boils", "is boiling", "boil", "boiling"], correct: 0, explanation: "科學事實 → 現在簡單式" },
];

const categoryMap = (i: number) =>
  i < 10 ? 'Basic Form' :
  i < 18 ? 'Negative Form' :
  i < 26 ? 'Question Form' :
  i < 36 ? 'Spelling Rules' :
  'Simple vs Continuous';

export default function PresentContinuous({ openApp }: { openApp: (id: string) => void }) {
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

  const handleContinue = async () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const finalScore = score + (selected === questions[currentQ].correct ? 1 : 0);
      setFinished(true);
      const saved = JSON.parse(localStorage.getItem("pcScores") || "[]");
      saved.push({ score: finalScore, total: questions.length, date: new Date().toISOString() });
      localStorage.setItem("pcScores", JSON.stringify(saved));

      const username = localStorage.getItem("username");
      if (username) {
        try {
          const questionResults = questions.map((q, i) => ({
            id: `pc-${i}`,
            question: q.question,
            correctAnswer: q.options[q.correct],
            userAnswer: answers[i] !== null ? q.options[answers[i]!] : '(未作答)',
            isCorrect: answers[i] === q.correct,
            explanation: q.explanation,
            category: categoryMap(i),
          }));

          const examDetail = {
            date: new Date().toISOString(),
            type: 'present-continuous',
            totalQuestions: questions.length,
            correctCount: finalScore,
            percentage: Math.round((finalScore / questions.length) * 100),
            questions: questionResults,
          };

          await fetch('/api/auth?action=save-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username,
              score: { correct: finalScore, total: questions.length, percentage: Math.round((finalScore / questions.length) * 100) },
              questionResults: questionResults.map(qr => ({ id: qr.id, isCorrect: qr.isCorrect })),
              examDetail,
            }),
          });
        } catch (e) {
          console.error('Failed to save exam detail:', e);
        }
      }
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
          <div className="text-6xl font-bold mb-4">{finalScore}/{questions.length}</div>
          <p className="text-lg text-gray-600 mb-2">{pct}% 正確</p>
          <p className="text-xl mb-6">
            {pct >= 90 ? "🌟 太棒了！" : pct >= 70 ? "👍 不錯！" : pct >= 50 ? "💪 繼續加油！" : "📖 多練習幾次吧！"}
          </p>
          <details className="text-left mb-6">
            <summary className="cursor-pointer font-medium text-indigo-600 mb-2">📋 查看所有題目與解釋</summary>
            <div className="space-y-2 mt-4">
              {questions.map((qq, i) => (
                <div key={i} className={`p-3 rounded ${answers[i] === qq.correct ? "bg-green-50 border-l-4 border-green-500" : "bg-red-50 border-l-4 border-red-500"}`}>
                  <p className="text-sm font-medium">{i + 1}. {qq.question}</p>
                  <p className="text-xs text-gray-600 mt-1">{qq.explanation}</p>
                </div>
              ))}
            </div>
          </details>
          <div className="flex gap-4 justify-center">
            <button onClick={restart} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700">再考一次</button>
            <button onClick={() => openApp("present-simple")} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300">📚 回到選單</button>
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
              <button key={i} onClick={() => handleSelect(i)} disabled={showResult} className={`w-full text-left p-4 rounded-lg transition ${cls}`}>
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
          <button onClick={handleNext} disabled={selected === null} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50">確認答案</button>
        ) : (
          <button onClick={handleContinue} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
            {currentQ + 1 < questions.length ? "下一題 →" : "看成績 📊"}
          </button>
        )}
      </div>
    </div>
  );
}
