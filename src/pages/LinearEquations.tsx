import { useState } from "react";

function generateSystem() {
  const x = Math.floor(Math.random() * 9) - 4; // -4 to 4
  const y = Math.floor(Math.random() * 9) - 4;
  const a = Math.floor(Math.random() * 5) + 1;
  const b = Math.floor(Math.random() * 5) + 1;
  const d = Math.floor(Math.random() * 5) + 1;
  const e = Math.floor(Math.random() * 5) + 1;
  const c = a * x + b * y;
  const f = d * x + e * y;
  return { a, b, c, d, e, f, answerX: x, answerY: y };
}

function formatEquation(a: number, b: number, c: number): string {
  const axPart = a === 1 ? "x" : `${a}x`;
  const sign = b >= 0 ? "+" : "-";
  const byPart = Math.abs(b) === 1 ? "y" : `${Math.abs(b)}y`;
  return `${axPart} ${sign} ${byPart} = ${c}`;
}

interface Problem {
  a: number; b: number; c: number;
  d: number; e: number; f: number;
  answerX: number; answerY: number;
}

export default function LinearEquations() {
  const [problem, setProblem] = useState<Problem>(generateSystem);
  const [guessX, setGuessX] = useState("");
  const [guessY, setGuessY] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | "">("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const nextProblem = () => {
    setProblem(generateSystem());
    setGuessX("");
    setGuessY("");
    setResult("");
    setShowHint(false);
  };

  const checkAnswer = () => {
    const gx = parseInt(guessX);
    const gy = parseInt(guessY);
    if (isNaN(gx) || isNaN(gy)) return;
    const isCorrect = gx === problem.answerX && gy === problem.answerY;
    setResult(isCorrect ? "correct" : "wrong");
    setTotal(t => t + 1);
    if (isCorrect) setScore(s => s + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-2">🔢 二元一次方程式</h1>
      <p className="text-stone-500 mb-6">解聯立方程式，找出 x 和 y 的值！</p>

      {/* Score */}
      <div className="flex gap-6 mb-6">
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold">✓ {score}</span>
        <span className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg">題數: {total}</span>
      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-purple-100">
        <p className="text-stone-400 text-sm mb-3">解下列聯立方程式：</p>
        <div className="text-2xl font-mono font-bold text-stone-800 space-y-2">
          <p className="text-purple-600">❶ {formatEquation(problem.a, problem.b, problem.c)}</p>
          <p className="text-blue-600">❷ {formatEquation(problem.d, problem.e, problem.f)}</p>
        </div>
      </div>

      {/* Input */}
      {!result && (
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-lg font-bold text-stone-600">x =</label>
            <input
              type="number"
              value={guessX}
              onChange={(e) => setGuessX(e.target.value)}
              className="w-20 px-3 py-2 border-2 border-stone-300 rounded-lg text-center text-lg font-bold focus:border-purple-400 focus:outline-none"
              placeholder="?"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-lg font-bold text-stone-600">y =</label>
            <input
              type="number"
              value={guessY}
              onChange={(e) => setGuessY(e.target.value)}
              className="w-20 px-3 py-2 border-2 border-stone-300 rounded-lg text-center text-lg font-bold focus:border-purple-400 focus:outline-none"
              placeholder="?"
              onKeyDown={(e) => { if (e.key === "Enter") checkAnswer(); }}
            />
          </div>
          <button
            onClick={checkAnswer}
            disabled={guessX === "" || guessY === ""}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-stone-300 text-white rounded-xl font-bold text-lg transition-colors"
          >
            確認 ✓
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="text-center mb-4">
          <div className={`text-xl font-bold ${result === "correct" ? "text-green-600" : "text-red-500"}`}>
            {result === "correct" ? "🎉 完全正確！" : "😅 再想想看～"}
          </div>
          {result === "wrong" && (
            <p className="text-stone-500 mt-1">
              答案是：<span className="font-bold text-stone-700">x = {problem.answerX}, y = {problem.answerY}</span>
            </p>
          )}
        </div>
      )}

      {/* Next */}
      <button
        onClick={result ? nextProblem : () => setShowHint(!showHint)}
        className={`px-8 py-3 rounded-xl font-bold text-lg transition-colors ${result ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-amber-100 hover:bg-amber-200 text-amber-700"}`}
      >
        {result ? "下一題 →" : (showHint ? "隱藏提示" : "💡 籂解提示")}
      </button>

      {/* Hint */}
      {showHint && !result && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-md">
          <p className="text-sm font-bold text-amber-700 mb-2">💡 解題步驟：</p>
          <ol className="text-sm text-stone-600 space-y-1 list-decimal list-inside">
            <li>把方程式 ❶ 乘以 {problem.e}，方程式 ❷ 乘以 {problem.b}</li>
            <li>用加減消去法消掉其中一個未知數</li>
            <li>解出另一個未知數後，代回任一個方程式</li>
          </ol>
          <div className="mt-2 text-xs text-amber-600 font-mono">
            ❶×{problem.e}: {formatEquation(problem.a * problem.e, problem.b * problem.e, problem.c * problem.e)}<br/>
            ❷×{problem.b}: {formatEquation(problem.d * problem.b, problem.e * problem.b, problem.f * problem.b)}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-white rounded-xl p-4 border border-stone-200 max-w-lg">
        <p className="text-sm font-bold text-stone-600 mb-2">📝 解題技巧：</p>
        <ul className="text-sm text-stone-500 space-y-1">
          <li>🎯 <strong>加減消去法</strong>：讓同一個未知數的係數相同，再相加或相減</li>
          <li>🎯 <strong>代入消去法</strong>：從一個方程式解出一個未知數，代入另一個方程式</li>
          <li>💡 答案都是整數喔！範圍在 -4 到 4 之間</li>
        </ul>
      </div>
    </div>
  );
}