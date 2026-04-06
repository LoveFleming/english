import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  // Time 相關 (1-10)
  { question: "We arrived just ___ time for the meeting.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in time = 及時（差點來不及）" },
  { question: "The train arrived ___ time.", options: ["in", "on", "at", "by"], correct: 1, explanation: "on time = 準時" },
  { question: "I'm busy ___ the moment.", options: ["in", "on", "at", "by"], correct: 2, explanation: "at the moment = 目前" },
  { question: "Please book the tickets ___ advance.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in advance = 事先" },
  { question: "The project is ___ schedule.", options: ["in", "on", "at", "by"], correct: 1, explanation: "on schedule = 按照進度" },
  { question: "We'll finish ___ the end of this week.", options: ["by", "in", "on", "at"], correct: 0, explanation: "by the end of = 在...結束前" },
  { question: "___ the beginning of the sprint, we plan our tasks.", options: ["At", "In", "On", "By"], correct: 0, explanation: "at the beginning of = 在...開始時" },
  { question: "He has been working here ___ 2010.", options: ["since", "for", "from", "during"], correct: 0, explanation: "since + 年份 = 自從" },
  { question: "I'll be there ___ 10 minutes.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in + 時間 = 在...之後（未來）" },
  { question: "She works ___ the evening.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in the evening = 在晚上" },

  // Place & Direction (11-18)
  { question: "The car is parked ___ front of the office.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in front of = 在...前面" },
  { question: "Sit ___ to me in the meeting.", options: ["next", "near", "close", "beside"], correct: 0, explanation: "next to = 在...旁邊" },
  { question: "I'll grab coffee ___ the way to work.", options: ["in", "on", "at", "by"], correct: 1, explanation: "on the way = 在路上" },
  { question: "The store is ___ the corner of Main St.", options: ["in", "on", "at", "by"], correct: 2, explanation: "at the corner of = 在...轉角" },
  { question: "I was ___ the middle of a code review.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in the middle of = 在...中間" },
  { question: "The cat is hiding ___ the table.", options: ["under", "below", "beneath", "down"], correct: 0, explanation: "under = 在...下面" },
  { question: "She lives ___ the third floor.", options: ["in", "on", "at", "by"], correct: 1, explanation: "on the floor = 在...樓" },
  { question: "We met ___ the entrance of the park.", options: ["in", "on", "at", "by"], correct: 2, explanation: "at the entrance = 在入口處" },

  // Work & Business (19-35)
  { question: "She is ___ charge of the deployment.", options: ["on", "at", "in", "for"], correct: 2, explanation: "in charge of = 負責" },
  { question: "I'm calling ___ behalf of my team.", options: ["on", "in", "at", "for"], correct: 0, explanation: "on behalf of = 代表" },
  { question: "___ to the spec, this should work.", options: ["According", "Due", "Thanks", "In response"], correct: 0, explanation: "according to = 根據" },
  { question: "___ response to your email, here are the details.", options: ["In", "On", "At", "By"], correct: 0, explanation: "in response to = 回應" },
  { question: "I deleted the file ___ mistake.", options: ["by", "in", "on", "at"], correct: 0, explanation: "by mistake = 不小心" },
  { question: "___ example, we can use a cache here.", options: ["For", "In", "On", "By"], correct: 0, explanation: "for example = 例如" },
  { question: "Let me explain the issue ___ detail.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in detail = 詳細地" },
  { question: "The deployment is ___ progress.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in progress = 進行中" },
  { question: "He is ___ duty this weekend.", options: ["in", "on", "at", "by"], correct: 1, explanation: "on duty = 值班" },
  { question: "The release is ___ risk of being delayed.", options: ["in", "on", "at", "under"], correct: 2, explanation: "at risk = 有風險" },
  { question: "These two modules have a lot ___ common.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in common = 共同點" },
  { question: "This library is ___ of date.", options: ["out", "in", "on", "by"], correct: 0, explanation: "out of date = 過時的" },
  { question: "Make sure your dependencies are ___ to date.", options: ["up", "in", "on", "by"], correct: 0, explanation: "up to date = 最新的" },
  { question: "Don't worry, the issue is ___ control.", options: ["in", "on", "at", "under"], correct: 3, explanation: "under control = 在控制中" },
  { question: "The server is ___ trouble again.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in trouble = 有麻煩" },
  { question: "She took care ___ the deployment.", options: ["of", "for", "about", "with"], correct: 0, explanation: "take care of = 照顧/處理" },
  { question: "We need to keep track ___ all bugs.", options: ["of", "for", "about", "with"], correct: 0, explanation: "keep track of = 追蹤" },

  // Communication (36-46)
  { question: "___ other words, we need to refactor this.", options: ["By", "In", "On", "At"], correct: 1, explanation: "in other words = 換句話說" },
  { question: "___ the way, did you see the new PR?", options: ["By", "In", "On", "At"], correct: 0, explanation: "by the way = 順便一提" },
  { question: "Let's discuss this ___ person.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in person = 親自" },
  { question: "Nobody breaks the build ___ purpose.", options: ["in", "on", "at", "by"], correct: 1, explanation: "on purpose = 故意的" },
  { question: "___ general, our tests are reliable.", options: ["In", "On", "At", "By"], correct: 0, explanation: "in general = 一般來說" },
  { question: "___ be honest, I'm not sure about this approach.", options: ["By", "In", "To", "On"], correct: 2, explanation: "to be honest = 老實說" },
  { question: "___ a matter of fact, I just fixed that bug.", options: ["As", "In", "On", "By"], correct: 0, explanation: "as a matter of fact = 事實上" },
  { question: "He is good ___ explaining complex ideas.", options: ["at", "in", "on", "by"], correct: 0, explanation: "good at = 擅長" },
  { question: "She is interested ___ learning new technologies.", options: ["at", "in", "on", "by"], correct: 1, explanation: "interested in = 對...有興趣" },
  { question: "I agree ___ you on this issue.", options: ["at", "in", "on", "with"], correct: 3, explanation: "agree with = 同意（某人）" },
  { question: "We need to focus ___ the main problem.", options: ["at", "in", "on", "with"], correct: 2, explanation: "focus on = 專注於" },

  // Cause & Effect (47-58)
  { question: "The build failed ___ of a syntax error.", options: ["because", "due", "as a result", "since"], correct: 0, explanation: "because of = 因為" },
  { question: "The outage was ___ to a network issue.", options: ["because", "due", "as a result", "since"], correct: 1, explanation: "due to = 由於（後接名詞）" },
  { question: "___ a result, we missed the deadline.", options: ["As", "In", "On", "By"], correct: 0, explanation: "as a result = 結果" },
  { question: "___ order to fix this, we need more logs.", options: ["In", "On", "At", "By"], correct: 0, explanation: "in order to = 為了" },
  { question: "Use async/await ___ of callbacks.", options: ["because", "instead", "in addition", "thanks"], correct: 1, explanation: "instead of = 而不是" },
  { question: "___ to the new tool, we're 2x faster.", options: ["Because", "Instead", "In addition", "Thanks"], correct: 3, explanation: "thanks to = 多虧" },
  { question: "He was late ___ of the traffic.", options: ["because", "due", "instead", "regardless"], correct: 0, explanation: "because of = 因為" },
  { question: "We succeeded ___ spite of the difficulties.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in spite of = 儘管" },
  { question: "___ of quitting, she kept trying.", options: ["Instead", "Because", "In front", "By means"], correct: 0, explanation: "instead of = 而不是" },
  { question: "The event was cancelled due ___ the storm.", options: ["because", "to", "for", "of"], correct: 1, explanation: "due to = 由於" },
  { question: "___ a consequence, the system went down.", options: ["As", "In", "On", "By"], correct: 0, explanation: "as a consequence = 作為結果" },
  { question: "She smiled ___ response to the good news.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in response to = 回應" },

  // Action & Movement (59-68)
  { question: "We need to fix this ___ once.", options: ["in", "on", "at", "by"], correct: 2, explanation: "at once = 立刻" },
  { question: "I know the API endpoints ___ heart.", options: ["in", "on", "at", "by"], correct: 3, explanation: "by heart = 背起來" },
  { question: "Don't push code ___ a hurry.", options: ["in", "on", "at", "by"], correct: 0, explanation: "in a hurry = 匆忙" },
  { question: "Let's debug this step ___ step.", options: ["in", "on", "by", "at"], correct: 2, explanation: "step by step = 一步一步" },
  { question: "___ the other hand, this approach is simpler.", options: ["By", "In", "On", "At"], correct: 2, explanation: "on the other hand = 另一方面" },
  { question: "He ran ___ of ideas during the meeting.", options: ["in", "on", "at", "out"], correct: 3, explanation: "run out of = 用完" },
  { question: "The team came up ___ a great solution.", options: ["in", "on", "at", "with"], correct: 3, explanation: "come up with = 想出" },
  { question: "She got rid ___ the old code.", options: ["in", "on", "at", "of"], correct: 3, explanation: "get rid of = 刪除/擺脫" },
  { question: "Look ___ the error in the log file.", options: ["at", "in", "on", "for"], correct: 3, explanation: "look for = 尋找" },
  { question: "The manager put ___ the meeting until next week.", options: ["in", "on", "off", "by"], correct: 2, explanation: "put off = 延遲" },

  // Misc - Others (69-100)
  { question: "___ instance, you could use a different algorithm.", options: ["For", "In", "On", "By"], correct: 0, explanation: "for instance = 例如" },
  { question: "___ fact, this bug has been there for months.", options: ["By", "In", "On", "At"], correct: 1, explanation: "in fact = 事實上" },
  { question: "___ course, we should add tests first.", options: ["By", "In", "Of", "At"], correct: 2, explanation: "of course = 當然" },
  { question: "At ___ we caught the bug before release.", options: ["most", "least", "best", "last"], correct: 1, explanation: "at least = 至少" },
  { question: "___ addition to code review, we need E2E tests.", options: ["By", "In", "On", "At"], correct: 1, explanation: "in addition to = 此外" },
  { question: "She is responsible ___ the project delivery.", options: ["at", "in", "on", "for"], correct: 3, explanation: "responsible for = 對...負責" },
  { question: "He depends ___ his team for support.", options: ["at", "in", "on", "for"], correct: 2, explanation: "depend on = 依賴" },
  { question: "We are looking forward ___ the new release.", options: ["at", "in", "on", "to"], correct: 3, explanation: "look forward to = 期待" },
  { question: "The app consists ___ three main modules.", options: ["at", "in", "on", "of"], correct: 3, explanation: "consist of = 由...組成" },
  { question: "She apologized ___ the delay.", options: ["at", "in", "on", "for"], correct: 3, explanation: "apologize for = 為...道歉" },
  { question: "He insisted ___ doing it his way.", options: ["at", "in", "on", "for"], correct: 2, explanation: "insist on = 堅持" },
  { question: "I'm proud ___ my team's work.", options: ["at", "in", "on", "of"], correct: 3, explanation: "proud of = 驕傲" },
  { question: "She complained ___ the slow performance.", options: ["at", "in", "on", "about"], correct: 3, explanation: "complain about = 抱怨" },
  { question: "We need to deal ___ this issue immediately.", options: ["at", "in", "on", "with"], correct: 3, explanation: "deal with = 處理" },
  { question: "The result depends ___ the input quality.", options: ["at", "in", "on", "for"], correct: 2, explanation: "depend on = 取決於" },
  { question: "I'm tired ___ fixing the same bug.", options: ["at", "in", "on", "of"], correct: 3, explanation: "tired of = 厭倦" },
  { question: "She reminded me ___ the deadline.", options: ["at", "in", "on", "about"], correct: 3, explanation: "remind about = 提醒" },
  { question: "He succeeded ___ passing the certification.", options: ["at", "in", "on", "by"], correct: 1, explanation: "succeed in = 成功做某事" },
  { question: "We participated ___ the hackathon.", options: ["at", "in", "on", "by"], correct: 1, explanation: "participate in = 參加" },
  { question: "She applied ___ the senior position.", options: ["at", "in", "on", "for"], correct: 3, explanation: "apply for = 申請" },
  { question: "The company provided us ___ new equipment.", options: ["at", "in", "on", "with"], correct: 3, explanation: "provide with = 提供" },
  { question: "He's been waiting ___ a response for days.", options: ["at", "in", "on", "for"], correct: 3, explanation: "wait for = 等待" },
  { question: "I'm worried ___ the deadline.", options: ["at", "in", "on", "about"], correct: 3, explanation: "worried about = 擔心" },
  { question: "She's excited ___ the new project.", options: ["at", "in", "on", "about"], correct: 3, explanation: "excited about = 興奮" },
  { question: "He was surprised ___ the test results.", options: ["at", "in", "on", "by"], correct: 3, explanation: "surprised by = 驚訝" },
  { question: "The app belongs ___ the engineering team.", options: ["at", "in", "on", "to"], correct: 3, explanation: "belong to = 屬於" },
  { question: "We need to adapt ___ the new requirements.", options: ["at", "in", "on", "to"], correct: 3, explanation: "adapt to = 適應" },
  { question: "She contributed ___ the open source project.", options: ["at", "in", "on", "to"], correct: 3, explanation: "contribute to = 貢獻" },
  { question: "The error resulted ___ a system crash.", options: ["at", "in", "on", "to"], correct: 1, explanation: "result in = 導致" },
  { question: "I'm familiar ___ this codebase.", options: ["at", "in", "on", "with"], correct: 3, explanation: "familiar with = 熟悉" },
  { question: "She's capable ___ solving complex problems.", options: ["at", "in", "on", "of"], correct: 3, explanation: "capable of = 有能力" },
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
