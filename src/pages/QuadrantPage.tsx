import { useState } from "react";

function generatePoint() {
  const x = Math.floor(Math.random() * 21) - 10; // -10 to 10
  const y = Math.floor(Math.random() * 21) - 10;
  return { x, y };
}

function getQuadrant(x: number, y: number): number {
  if (x > 0 && y > 0) return 1;
  if (x < 0 && y > 0) return 2;
  if (x < 0 && y < 0) return 3;
  if (x > 0 && y < 0) return 4;
  return 0;
}

function getQuadrantLabel(q: number): string {
  switch (q) {
    case 1: return "第一象限 (I) 🟦";
    case 2: return "第二象限 (II) 🟧";
    case 3: return "第三象限 (III) 🟪";
    case 4: return "第四象限 (IV) 🟩";
    default: return "在軸上";
  }
}

function getQuadrantColor(q: number): string {
  switch (q) {
    case 1: return "bg-blue-500";
    case 2: return "bg-amber-500";
    case 3: return "bg-purple-500";
    case 4: return "bg-green-500";
    default: return "bg-stone-400";
  }
}

export default function QuadrantPage() {
  const [targetPoint, setTargetPoint] = useState<{ x: number; y: number } | null>(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState<number | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | "">("");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [placedPoints, setPlacedPoints] = useState<{ x: number; y: number; quadrant: number }[]>([]);

  const startGame = () => {
    setPlacedPoints([]);
    nextRound();
  };

  const nextRound = () => {
    let point = generatePoint();
    // Avoid points on axes
    while (point.x === 0 || point.y === 0) {
      point = generatePoint();
    }
    setTargetPoint(point);
    setSelectedQuadrant(null);
    setResult("");
  };

  const handleSelect = (q: number) => {
    if (!targetPoint) return;
    setSelectedQuadrant(q);
    const correct = getQuadrant(targetPoint.x, targetPoint.y);
    const isCorrect = q === correct;
    setResult(isCorrect ? "correct" : "wrong");
    setTotal(t => t + 1);
    if (isCorrect) {
      setScore(s => s + 1);
      setPlacedPoints(prev => [...prev, { x: targetPoint.x, y: targetPoint.y, quadrant: correct }]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">📐 象限座標挑戰</h1>
      <p className="text-stone-500 mb-6">判斷座標點在哪個象限！</p>

      {/* Score */}
      <div className="flex gap-6 mb-6">
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold">✓ {score}</span>
        <span className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg">題數: {total}</span>
      </div>

      {/* Coordinate Plane */}
      <div className="relative mb-6" style={{ width: 400, height: 400 }}>
        <svg viewBox="-210 -210 420 420" width="400" height="400" className="border-2 border-stone-300 rounded-lg bg-white">
          {/* Quadrant backgrounds */}
          <rect x="0" y="-200" width="200" height="200" fill="#dbeafe" />
          <rect x="-200" y="-200" width="200" height="200" fill="#fef3c7" />
          <rect x="-200" y="0" width="200" height="200" fill="#ede9fe" />
          <rect x="0" y="0" width="200" height="200" fill="#dcfce7" />

          {/* Grid lines */}
          {Array.from({ length: 21 }, (_, i) => {
            const pos = -200 + i * 20;
            return (
              <g key={`grid-${i}`}>
                <line x1={pos} y1="-200" x2={pos} y2="200" stroke="#e5e7eb" strokeWidth="0.5" />
                <line x1="-200" y1={pos} x2="200" y2={pos} stroke="#e5e7eb" strokeWidth="0.5" />
              </g>
            );
          })}

          {/* Axes */}
          <line x1="-200" y1="0" x2="200" y2="0" stroke="#374151" strokeWidth="2" />
          <line x1="0" y1="-200" x2="0" y2="200" stroke="#374151" strokeWidth="2" />

          {/* Axis numbers */}
          {Array.from({ length: 9 }, (_, i) => {
            const val = i + 1;
            return (
              <g key={`num-${i}`}>
              <text x={val * 20} y={15} textAnchor="middle" fill="#94a3b8" fontSize="10">{val}</text>
              <text x={-val * 20} y={15} textAnchor="middle" fill="#94a3b8" fontSize="10">{-val}</text>
              <text x={12} y={-val * 20 + 4} fill="#94a3b8" fontSize="10">{val}</text>
              <text x={12} y={val * 20 + 4} fill="#94a3b8" fontSize="10">{-val}</text>
            </g>
            );
          })}

          {/* Quadrant labels */}
          <text x="100" y="-180" textAnchor="middle" fill="#93c5fd" fontSize="16" fontWeight="bold">I</text>
          <text x="-100" y="-180" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">II</text>
          <text x="-100" y="180" textAnchor="middle" fill="#a5b4fc" fontSize="16" fontWeight="bold">III</text>
          <text x="100" y="180" textAnchor="middle" fill="#86efac" fontSize="16" fontWeight="bold">IV</text>

          {/* Placed points */}
          {placedPoints.map((p, i) => {
            const colors = ["#3B82F6", "#F59E0B", "#8B5CF6", "#22C55E"];
            return (
              <circle key={`placed-${i}`} cx={p.x * 20} cy={-p.y * 20} r="4" fill={colors[p.quadrant - 1]} opacity="0.5" />
            );
          })}

          {/* Target point */}
          {targetPoint && (
            <g>
              <circle cx={targetPoint.x * 20} cy={-targetPoint.y * 20} r="10" fill="#ef4444" opacity="0.3">
                <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx={targetPoint.x * 20} cy={-targetPoint.y * 20} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
              <text x={targetPoint.x * 20 + 15} y={-targetPoint.y * 20 - 10} fill="#1e293b" fontSize="13" fontWeight="bold">
                ({targetPoint.x}, {targetPoint.y})
              </text>
            </g>
          )}

          {/* Origin label */}
          <text x={8} y={15} fill="#374151" fontSize="11">O</text>
        </svg>
      </div>

      {/* Quadrant Buttons */}
      {targetPoint && !selectedQuadrant && (
        <div className="mb-4">
          <p className="text-lg font-bold text-stone-700 mb-3">
            點 ({targetPoint.x}, {targetPoint.y}) 在哪個象限？
          </p>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map(q => (
              <button
                key={q}
                onClick={() => handleSelect(q)}
                className={`px-6 py-3 text-lg font-bold rounded-xl text-white transition-all hover:scale-105 ${getQuadrantColor(q)}`}
              >
                {getQuadrantLabel(q)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`text-xl font-bold mb-4 ${result === "correct" ? "text-green-600" : "text-red-500"}`}>
          {result === "correct" ? "🎉 答對了！" : `😅 燒對了是 ${getQuadrantLabel(getQuadrant(targetPoint!.x, targetPoint!.y))}`}
        </div>
      )}

      {/* Start / Next */}
      <button
        onClick={targetPoint ? nextRound : startGame}
        className="mt-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-colors"
      >
        {targetPoint ? (result ? "下一題 →" : "跳過") : "開始挑戰！ 🎮"}
      </button>

      {/* Legend */}
      <div className="mt-6 bg-white rounded-xl p-4 border border-stone-200">
        <p className="text-sm font-bold text-stone-600 mb-2">📐 象限規則：</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>I: x &gt; 0, y &gt; 0（右上）</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span>II: x &lt; 0, y &gt; 0（左上）</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <span>III: x &lt; 0, y &lt; 0（左下）</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>IV: x &gt; 0, y &lt; 0（右下）</span>
          </div>
        </div>
      </div>
    </div>
  );
}