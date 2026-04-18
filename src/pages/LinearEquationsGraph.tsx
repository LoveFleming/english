import { useState, useMemo } from "react";

// Parse equation from string like "2x + 3y = 6" or "y = 2x + 1"
interface LineData {
  a: number; // coefficient of x (standard form: ax + by = c)
  b: number; // coefficient of y
  c: number; // constant
  color: string;
  label: string;
}

// Convert standard form ax + by = c to y = mx + k
function toSlopeIntercept(a: number, b: number, c: number) {
  if (b === 0) return { slope: Infinity, intercept: NaN, isVertical: true, xIntercept: c / a };
  const slope = -a / b;
  const intercept = c / b;
  return { slope, intercept, isVertical: false, xIntercept: c / a };
}

// Get y value for a given x
function getY(a: number, b: number, c: number, x: number): number | null {
  if (b === 0) return null;
  return (c - a * x) / b;
}

// Solve system of two equations
function solveSystem(l1: LineData, l2: LineData) {
  const det = l1.a * l2.b - l2.a * l1.b;
  if (det === 0) return null; // parallel or coincident
  const x = (l1.c * l2.b - l2.c * l1.b) / det;
  const y = (l1.a * l2.c - l2.a * l1.c) / det;
  return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
}

function formatEq(a: number, b: number, c: number): string {
  let parts: string[] = [];
  if (a !== 0) {
    if (a === 1) parts.push("x");
    else if (a === -1) parts.push("-x");
    else parts.push(`${a}x`);
  }
  if (b !== 0) {
    if (b > 0 && parts.length > 0) parts.push(`+ ${b === 1 ? "" : Math.abs(b)}y`);
    else if (b < 0) parts.push(`- ${Math.abs(b) === 1 ? "" : Math.abs(b)}y`);
    else if (parts.length === 0) parts.push(`${b === 1 ? "" : b}y`);
    else parts.push(`+ ${b === 1 ? "" : b}y`);
  }
  // Fix: handle b=1 case
  let eq = parts.join(" ");
  // clean up double spaces and "1y" -> "y"
  eq = eq.replace(/ 1y/g, " y").replace(/^- 1y/, "-y");
  return `${eq} = ${c}`;
}

interface PresetExample {
  name: string;
  l1: LineData;
  l2: LineData;
  description: string;
}

const PRESETS: PresetExample[] = [
  {
    name: "✅ 唯一解（交於一點）",
    l1: { a: 1, b: 1, c: 4, color: "#ef4444", label: "L₁" },
    l2: { a: 2, b: -1, c: 1, color: "#3b82f6", label: "L₂" },
    description: "兩條線交於一點，有唯一解 (x, y)",
  },
  {
    name: "❌ 無解（平行線）",
    l1: { a: 1, b: 1, c: 2, color: "#ef4444", label: "L₁" },
    l2: { a: 1, b: 1, c: 5, color: "#3b82f6", label: "L₂" },
    description: "兩條線平行，永遠不會相交 → 無解",
  },
  {
    name: "♾️ 無限多解（重合）",
    l1: { a: 1, b: 2, c: 4, color: "#ef4444", label: "L₁" },
    l2: { a: 2, b: 4, c: 8, color: "#3b82f6", label: "L₂" },
    description: "兩條線完全重疊 → 任何在線上的點都是解",
  },
  {
    name: "📐 垂直相交",
    l1: { a: 0, b: 1, c: 2, color: "#ef4444", label: "L₁" },
    l2: { a: 1, b: 0, c: 3, color: "#3b82f6", label: "L₂" },
    description: "一條水平線 + 一條垂直線，必交於一點",
  },
];

// SVG Graph Component
function Graph({ lines, solution, xRange, yRange }: {
  lines: LineData[];
  solution: { x: number; y: number } | null;
  xRange: [number, number];
  yRange: [number, number];
}) {
  const width = 360;
  const height = 360;
  const padding = 40;
  const plotW = width - padding * 2;
  const plotH = height - padding * 2;

  const xMin = xRange[0], xMax = xRange[1];
  const yMin = yRange[0], yMax = yRange[1];

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * plotW;
  const toSvgY = (y: number) => padding + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

  // Grid lines
  const xTicks = [];
  const yTicks = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) xTicks.push(x);
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) yTicks.push(y);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[360px]">
      {/* Background */}
      <rect x={padding} y={padding} width={plotW} height={plotH} fill="#fafafa" stroke="#e5e7eb" />

      {/* Grid */}
      {xTicks.map(x => (
        <line key={`gx-${x}`} x1={toSvgX(x)} y1={padding} x2={toSvgX(x)} y2={padding + plotH} stroke="#e5e7eb" strokeWidth={x === 0 ? 1.5 : 0.5} />
      ))}
      {yTicks.map(y => (
        <line key={`gy-${y}`} x1={padding} y1={toSvgY(y)} x2={padding + plotW} y2={toSvgY(y)} stroke="#e5e7eb" strokeWidth={y === 0 ? 1.5 : 0.5} />
      ))}

      {/* Axes */}
      <line x1={padding} y1={toSvgY(0)} x2={padding + plotW} y2={toSvgY(0)} stroke="#374151" strokeWidth={2} />
      <line x1={toSvgX(0)} y1={padding} x2={toSvgX(0)} y2={padding + plotH} stroke="#374151" strokeWidth={2} />

      {/* Axis labels */}
      <text x={padding + plotW + 8} y={toSvgY(0) + 4} fontSize={12} fill="#374151" fontWeight="bold">x</text>
      <text x={toSvgX(0)} y={padding - 8} fontSize={12} fill="#374151" fontWeight="bold">y</text>

      {/* Tick labels */}
      {xTicks.filter(x => x !== 0).map(x => (
        <text key={`tx-${x}`} x={toSvgX(x)} y={toSvgY(0) + 14} fontSize={9} fill="#6b7280" textAnchor="middle">{x}</text>
      ))}
      {yTicks.filter(y => y !== 0).map(y => (
        <text key={`ty-${y}`} x={toSvgX(0) - 8} y={toSvgY(y) + 3} fontSize={9} fill="#6b7280" textAnchor="end">{y}</text>
      ))}
      <text x={toSvgX(0) - 8} y={toSvgY(0) + 14} fontSize={9} fill="#6b7280" textAnchor="end">O</text>

      {/* Lines */}
      {lines.map((line, idx) => {
        const points: string[] = [];
        if (line.b === 0) {
          // Vertical line
          const x = line.c / line.a;
          points.push(`${toSvgX(x)},${padding}`);
          points.push(`${toSvgX(x)},${padding + plotH}`);
        } else {
          // Get two points at edges
          const y1 = getY(line.a, line.b, line.c, xMin);
          const y2 = getY(line.a, line.b, line.c, xMax);
          if (y1 !== null && y2 !== null) {
            points.push(`${toSvgX(xMin)},${toSvgY(y1)}`);
            points.push(`${toSvgX(xMax)},${toSvgY(y2)}`);
          }
        }
        return (
          <polyline
            key={idx}
            points={points.join(" ")}
            fill="none"
            stroke={line.color}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        );
      })}

      {/* Solution point */}
      {solution && (
        <>
          <circle cx={toSvgX(solution.x)} cy={toSvgY(solution.y)} r={6} fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} />
          <circle cx={toSvgX(solution.x)} cy={toSvgY(solution.y)} r={10} fill="none" stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 3" />
          <text x={toSvgX(solution.x) + 12} y={toSvgY(solution.y) - 8} fontSize={11} fill="#d97706" fontWeight="bold">
            ({solution.x}, {solution.y})
          </text>
        </>
      )}

      {/* Line labels */}
      {lines.map((line, idx) => {
        const si = toSlopeIntercept(line.a, line.b, line.c);
        let lx: number, ly: number;
        if (si.isVertical) {
          lx = toSvgX(si.xIntercept) + 6;
          ly = padding + 12;
        } else {
          lx = padding + plotW - 8;
          const endY = getY(line.a, line.b, line.c, xMax - 0.5);
          ly = endY !== null ? toSvgY(endY) - 6 : padding + 12;
        }
        return (
          <text key={`lbl-${idx}`} x={lx} y={ly} fontSize={11} fill={line.color} fontWeight="bold">
            {line.label}: {formatEq(line.a, line.b, line.c)}
          </text>
        );
      })}
    </svg>
  );
}

// Quiz Component
function QuizSection() {
  const [problem, setProblem] = useState(() => generateQuiz());
  const [guessX, setGuessX] = useState("");
  const [guessY, setGuessY] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | "">("");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  function generateQuiz() {
    const x = Math.floor(Math.random() * 9) - 4;
    const y = Math.floor(Math.random() * 9) - 4;
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 4) + 1;
    const d = Math.floor(Math.random() * 4) + 1;
    const e = Math.floor(Math.random() * 4) + 1;
    const c = a * x + b * y;
    const f = d * x + e * y;
    return {
      l1: { a, b, c, color: "#ef4444", label: "L₁" },
      l2: { a: d, b: e, c: f, color: "#3b82f6", label: "L₂" },
      answerX: x,
      answerY: y,
    };
  }

  const solution = useMemo(() =>
    solveSystem(problem.l1, problem.l2),
    [problem]
  );

  const nextProblem = () => {
    setProblem(generateQuiz());
    setGuessX("");
    setGuessY("");
    setResult("");
  };

  const check = () => {
    const gx = parseFloat(guessX);
    const gy = parseFloat(guessY);
    if (isNaN(gx) || isNaN(gy)) return;
    const correct = Math.abs(gx - problem.answerX) < 0.01 && Math.abs(gy - problem.answerY) < 0.01;
    setResult(correct ? "correct" : "wrong");
    setTotal(t => t + 1);
    if (correct) setScore(s => s + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
      <h3 className="text-xl font-bold text-purple-700 mb-4">🎯 圖形解題練習</h3>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Graph lines={[problem.l1, problem.l2]} solution={result ? { x: problem.answerX, y: problem.answerY } : null} xRange={[-7, 7]} yRange={[-7, 7]} />

        <div className="flex-1">
          <p className="text-stone-500 text-sm mb-2">看圖找出兩條線的交點：</p>
          <div className="font-mono text-lg font-bold space-y-1 mb-4">
            <p className="text-red-500">❶ {formatEq(problem.l1.a, problem.l1.b, problem.l1.c)}</p>
            <p className="text-blue-500">❷ {formatEq(problem.l2.a, problem.l2.b, problem.l2.c)}</p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <span className="font-bold text-stone-600">x =</span>
              <input type="number" value={guessX} onChange={e => setGuessX(e.target.value)}
                className="w-16 px-2 py-1 border-2 border-stone-300 rounded-lg text-center font-bold focus:border-purple-400 focus:outline-none" disabled={!!result} />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-stone-600">y =</span>
              <input type="number" value={guessY} onChange={e => setGuessY(e.target.value)}
                className="w-16 px-2 py-1 border-2 border-stone-300 rounded-lg text-center font-bold focus:border-purple-400 focus:outline-none" disabled={!!result}
                onKeyDown={e => { if (e.key === "Enter") check(); }} />
            </div>
            {!result && (
              <button onClick={check} disabled={!guessX || !guessY}
                className="px-4 py-1.5 bg-purple-500 hover:bg-purple-600 disabled:bg-stone-300 text-white rounded-xl font-bold transition-colors">
                確認
              </button>
            )}
          </div>

          {result && (
            <div className={`text-lg font-bold mb-2 ${result === "correct" ? "text-green-600" : "text-red-500"}`}>
              {result === "correct" ? "🎉 正確！" : `😅 答案是 (${problem.answerX}, ${problem.answerY})`}
            </div>
          )}

          <div className="flex gap-3">
            {result && (
              <button onClick={nextProblem} className="px-4 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold transition-colors">
                下一題 →
              </button>
            )}
          </div>

          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-green-600 font-bold">✓ {score}</span>
            <span className="text-stone-400">題數: {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LinearEquationsGraph() {
  const [tab, setTab] = useState<"learn" | "practice">("learn");
  const [selectedPreset, setSelectedPreset] = useState(0);

  const preset = PRESETS[selectedPreset];
  const solution = useMemo(() => solveSystem(preset.l1, preset.l2), [preset]);
  const si1 = useMemo(() => toSlopeIntercept(preset.l1.a, preset.l1.b, preset.l1.c), [preset]);
  const si2 = useMemo(() => toSlopeIntercept(preset.l2.a, preset.l2.b, preset.l2.c), [preset]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold text-purple-700 mb-1">📐 二元一次方程式的圖形</h1>
        <p className="text-stone-500 mb-4">用圖形來理解聯立方程式的三種情況</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("learn")}
            className={`px-5 py-2 rounded-xl font-bold transition-colors ${tab === "learn" ? "bg-purple-500 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
            📖 圖形解說
          </button>
          <button onClick={() => setTab("practice")}
            className={`px-5 py-2 rounded-xl font-bold transition-colors ${tab === "practice" ? "bg-purple-500 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
            🎯 練習題
          </button>
        </div>

        {tab === "learn" ? (
          <div className="space-y-6">
            {/* Key concept */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-bold text-amber-700 mb-2">💡 核心概念</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                每一個二元一次方程式（像 2x + y = 4）在座標平面上都是一條<strong>直線</strong>。
                兩個方程式組成聯立方程式，就是找兩條線的<strong>交點</strong>。
              </p>
              <p className="text-stone-600 text-sm leading-relaxed mt-2">
                兩條直線的關係只有<strong>三種可能</strong>：交於一點、平行不相交、完全重合。
              </p>
            </div>

            {/* Preset selector */}
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button key={i} onClick={() => setSelectedPreset(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${selectedPreset === i ? "bg-purple-500 text-white" : "bg-white border border-stone-300 text-stone-600 hover:bg-stone-50"}`}>
                  {p.name}
                </button>
              ))}
            </div>

            {/* Graph + Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Graph lines={[preset.l1, preset.l2]} solution={solution} xRange={[-7, 7]} yRange={[-7, 7]} />

                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm text-stone-400 mb-1">方程式：</p>
                    <div className="font-mono text-lg font-bold space-y-1">
                      <p className="text-red-500">❶ {formatEq(preset.l1.a, preset.l1.b, preset.l1.c)}</p>
                      <p className="text-blue-500">❷ {formatEq(preset.l2.a, preset.l2.b, preset.l2.c)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-stone-400 mb-1">斜截式 (y = mx + k)：</p>
                    <div className="font-mono text-sm space-y-1">
                      <p className="text-red-400">
                        L₁: {si1.isVertical ? `垂直線 x = ${si1.xIntercept}` : `y = ${si1.slope}x + ${si1.intercept}`}
                      </p>
                      <p className="text-blue-400">
                        L₂: {si2.isVertical ? `垂直線 x = ${si2.xIntercept}` : `y = ${si2.slope}x + ${si2.intercept}`}
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="font-bold text-purple-700 text-sm mb-1">📊 結論：</p>
                    <p className="text-stone-600 text-sm">{preset.description}</p>
                    {solution && (
                      <p className="text-sm font-bold text-purple-600 mt-1">
                        交點：({solution.x}, {solution.y})
                      </p>
                    )}
                  </div>

                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="font-bold text-stone-600 text-xs mb-1">🔍 怎麼判斷？</p>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      計算判別式：D = a₁×b₂ − a₂×b₁
                    </p>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      D = {preset.l1.a}×{preset.l2.b} − {preset.l2.a}×{preset.l1.b} = {preset.l1.a * preset.l2.b} − {preset.l2.a * preset.l1.b} = <strong>{preset.l1.a * preset.l2.b - preset.l2.a * preset.l1.b}</strong>
                    </p>
                    <p className="text-stone-500 text-xs leading-relaxed mt-1">
                      {preset.l1.a * preset.l2.b - preset.l2.a * preset.l1.b !== 0
                        ? "D ≠ 0 → 有唯一解（交於一點）"
                        : "D = 0 → 無解或無限多解（需進一步判斷）"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary table */}
            <div className="bg-white rounded-xl border border-stone-200 p-4">
              <p className="font-bold text-stone-600 mb-3">📝 三種情況整理：</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <p className="font-bold text-green-700">唯一解</p>
                  <p className="text-green-600 text-xs mt-1">D ≠ 0</p>
                  <p className="text-stone-500 text-xs">兩線交於一點</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">❌</div>
                  <p className="font-bold text-red-700">無解</p>
                  <p className="text-red-600 text-xs mt-1">D = 0, c₁/b₁ ≠ c₂/b₂</p>
                  <p className="text-stone-500 text-xs">兩線平行</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">♾️</div>
                  <p className="font-bold text-blue-700">無限多解</p>
                  <p className="text-blue-600 text-xs mt-1">D = 0, 比例相同</p>
                  <p className="text-stone-500 text-xs">兩線重合</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <QuizSection />
        )}
      </div>
    </div>
  );
}
