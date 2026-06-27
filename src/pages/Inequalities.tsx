import React from "react";

interface InequalitiesProps {
  openApp: (id: string) => void;
}

export default function Inequalities({ openApp }: InequalitiesProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-purple-800">一元一次不等式</h1>
        <p className="text-sm text-gray-500 mt-1">國中數學七年級下學期</p>
      </div>

      {/* 學習重點 */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-700 mb-3">📌 學習重點</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">●</span>
            <span className="text-purple-800">不等式的基本概念與不等號</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">●</span>
            <span className="text-purple-800">不等式的性質（乘除負數要變號！）</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">●</span>
            <span className="text-purple-800">解一元一次不等式</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">●</span>
            <span className="text-purple-800">不等式在數線上的表示</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">●</span>
            <span className="text-purple-800">生活中的不等式應用題</span>
          </div>
        </div>
      </div>

      {/* Section 1: 不等式的基本概念 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-amber-400 pb-1">
          🔸 重點 1：什麼是不等式？
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">1️⃣ 不等式的定義</h3>
          <p className="text-gray-600 mb-3">
            用不等號連接兩個數學式的句子，叫做<strong className="text-purple-600">不等式</strong>。
          </p>
          <div className="bg-amber-50 rounded-lg p-4 space-y-2">
            <p className="text-center text-lg font-mono font-bold text-amber-700">
              a &gt; b （a 大於 b）
            </p>
            <p className="text-center text-lg font-mono font-bold text-amber-700">
              a &lt; b （a 小於 b）
            </p>
            <p className="text-center text-lg font-mono font-bold text-amber-700">
              a ≥ b （a 大於或等於 b）
            </p>
            <p className="text-center text-lg font-mono font-bold text-amber-700">
              a ≤ b （a 小於或等於 b）
            </p>
            <p className="text-center text-lg font-mono font-bold text-amber-700">
              a ≠ b （a 不等於 b）
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">2️⃣ 一元一次不等式</h3>
          <p className="text-gray-600 mb-2">
            只含有一個未知數，且未知數的次數是 1 的不等式。
          </p>
          <div className="space-y-2 mt-3">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span className="text-gray-600">2x + 3 &gt; 7 （一元一次不等式）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span className="text-gray-600">5 - 3x ≤ 11 （一元一次不等式）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">❌</span>
              <span className="text-gray-600">x² + 1 &gt; 0 （次數是 2，不是一元一次）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">❌</span>
              <span className="text-gray-600">x + y &gt; 5 （兩個未知數）</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: 不等式的性質 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-400 pb-1">
          🔸 重點 2：不等式的性質
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">1️⃣ 加減性質</h3>
          <p className="text-gray-600 mb-3">不等式兩邊同加或同減一個數，不等號方向不變。</p>
          <div className="space-y-3">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-bold mb-1">同加：</p>
              <p className="text-center text-lg font-mono font-bold text-green-700">
                若 a &gt; b，則 a + c &gt; b + c
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-bold mb-1">同減：</p>
              <p className="text-center text-lg font-mono font-bold text-purple-700">
                若 a &gt; b，則 a - c &gt; b - c
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">2️⃣ 乘除性質</h3>
          <p className="text-gray-600 mb-3">不等式兩邊同乘或同除一個<strong className="text-green-600">正數</strong>，不等號方向不變。</p>
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-green-600 font-bold mb-1">乘以正數（c &gt; 0）：</p>
            <p className="text-center text-lg font-mono font-bold text-green-700">
              若 a &gt; b 且 c &gt; 0，則 a × c &gt; b × c
            </p>
          </div>
        </div>

        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-red-700 mb-3">⚠️ 最重要：乘除負數要變號！</h3>
          <p className="text-gray-700 mb-3">
            不等式兩邊同乘或同除一個<strong className="text-red-600">負數</strong>時，不等號方向要<strong className="text-red-600">反轉</strong>！
          </p>
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm text-red-600 font-bold mb-1">乘以負數（c &lt; 0）：</p>
              <p className="text-center text-lg font-mono font-bold text-red-700">
                若 a &gt; b 且 c &lt; 0，則 a × c &lt; b × c
              </p>
            </div>
            <div>
              <p className="text-sm text-red-600 font-bold mb-1">除以負數（c &lt; 0）：</p>
              <p className="text-center text-lg font-mono font-bold text-red-700">
                若 a &gt; b 且 c &lt; 0，則 a ÷ c &lt; b ÷ c
              </p>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 rounded-lg p-3">
            <p className="text-sm text-yellow-700">
              📝 例如：3 &gt; 1，兩邊同乘 (-2)，得到 (-6) &lt; (-2)，不等號從 &gt; 變成 &lt; ！
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: 解一元一次不等式 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-green-400 pb-1">
          🔸 重點 3：解一元一次不等式
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">解題步驟</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shrink-0">1</span>
              <div>
                <p className="text-gray-700 font-semibold">去括號</p>
                <p className="text-gray-500 text-sm">利用分配律展開括號</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shrink-0">2</span>
              <div>
                <p className="text-gray-700 font-semibold">移項</p>
                <p className="text-gray-500 text-sm">將含 x 的項移到一邊，常數移到另一邊（記得變號）</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shrink-0">3</span>
              <div>
                <p className="text-gray-700 font-semibold">合併同類項</p>
                <p className="text-gray-500 text-sm">化簡成 ax &gt; b 或 ax &lt; b 的形式</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shrink-0">4</span>
              <div>
                <p className="text-gray-700 font-semibold">兩邊同除以 x 的係數</p>
                <p className="text-gray-500 text-sm">⚠️ 如果除以負數，不等號要變號！</p>
              </div>
            </div>
          </div>
        </div>

        {/* 範例 */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-700 mb-3">📝 範例 1：基礎題</h3>
          <p className="text-gray-700 mb-2">解 2x + 3 &gt; 7</p>
          <div className="bg-white rounded-lg p-4 space-y-2 font-mono text-sm">
            <p>2x + 3 &gt; 7</p>
            <p>2x &gt; 7 - 3 （移項：3 移過去變 -3）</p>
            <p>2x &gt; 4</p>
            <p>x &gt; 2 （兩邊同除以 2，正數不變號）</p>
          </div>
          <p className="text-green-700 font-bold mt-2">答：x &gt; 2</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h3 className="font-bold text-red-700 mb-3">📝 範例 2：變號題（小心！）</h3>
          <p className="text-gray-700 mb-2">解 -3x + 5 ≤ 14</p>
          <div className="bg-white rounded-lg p-4 space-y-2 font-mono text-sm">
            <p>-3x + 5 ≤ 14</p>
            <p>-3x ≤ 14 - 5 （移項）</p>
            <p>-3x ≤ 9</p>
            <p>x ≥ -3 （兩邊同除以 -3，負數要變號！≤ 變成 ≥）</p>
          </div>
          <p className="text-red-700 font-bold mt-2">答：x ≥ -3</p>
        </div>
      </div>

      {/* Section 4: 數線表示 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-orange-400 pb-1">
          🔸 重點 4：不等式在數線上的表示
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">1️⃣ 空心圓 vs 實心圓</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-bold mb-1">○ 空心圓（不包含）</p>
              <p className="text-gray-700">用於 &gt; 或 &lt; ，表示該點<strong>不包含</strong>在範圍內</p>
              <p className="text-gray-500 text-sm mt-1">例如：x &gt; 2 → 在 2 的位置畫空心圓 ○</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-bold mb-1">● 實心圓（包含）</p>
              <p className="text-gray-700">用於 ≥ 或 ≤ ，表示該點<strong>包含</strong>在範圍內</p>
              <p className="text-gray-500 text-sm mt-1">例如：x ≤ 3 → 在 3 的位置畫實心圓 ●</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">2️⃣ 圖形方向</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-yellow-50 rounded-lg p-3">
              <span className="text-2xl">→</span>
              <span className="text-gray-700">x &gt; a 或 x ≥ a：向右畫</span>
            </div>
            <div className="flex items-center gap-3 bg-yellow-50 rounded-lg p-3">
              <span className="text-2xl">←</span>
              <span className="text-gray-700">x &lt; a 或 x ≤ a：向左畫</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <h3 className="font-bold text-orange-700 mb-3">📝 範例</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-700 mb-1">x &gt; 2：</p>
              <p className="text-orange-600">在 2 的位置畫 ○（空心圓），箭頭向右 →</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-700 mb-1">x ≤ -1：</p>
              <p className="text-orange-600">在 -1 的位置畫 ●（實心圓），箭頭向左 ←</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-700 mb-1">-2 &lt; x ≤ 3：</p>
              <p className="text-orange-600">在 -2 畫 ○，在 3 畫 ●，中間畫實線</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: 應用題 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-pink-400 pb-1">
          🔸 重點 5：生活中的不等式
        </h2>

        <div className="bg-pink-50 border border-pink-200 rounded-xl p-5">
          <h3 className="font-bold text-pink-700 mb-3">📝 應用題範例</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 mb-2">
                小明有 200 元，想買每本 35 元的筆記本，最多可以買幾本？
              </p>
              <div className="bg-white rounded-lg p-3 space-y-1 font-mono text-sm">
                <p>設可買 x 本：35x ≤ 200</p>
                <p>x ≤ 200/35 ≈ 5.7</p>
                <p>因為只能買整數本 → x = 5 本</p>
              </div>
              <p className="text-pink-700 font-bold mt-1">答：最多買 5 本</p>
            </div>

            <div>
              <p className="text-gray-700 mb-2">
                某停車場每小時收費 40 元，小明最多想花 300 元，他可以停幾小時？
              </p>
              <div className="bg-white rounded-lg p-3 space-y-1 font-mono text-sm">
                <p>設停 x 小時：40x ≤ 300</p>
                <p>x ≤ 7.5</p>
                <p>→ 最多停 7 小時</p>
              </div>
              <p className="text-pink-700 font-bold mt-1">答：最多停 7 小時</p>
            </div>
          </div>
        </div>
      </div>

      {/* 總整理 */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-purple-700 mb-3">🎯 重點總整理</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span>📌</span>
            <span className="text-gray-700">不等式用 &gt; &lt; ≥ ≤ ≠ 連接兩邊</span>
          </div>
          <div className="flex items-start gap-2">
            <span>📌</span>
            <span className="text-gray-700">加減性質：兩邊同加減，方向不變</span>
          </div>
          <div className="flex items-start gap-2">
            <span>⚠️</span>
            <span className="text-red-600 font-semibold">乘除負數必須變號！</span>
          </div>
          <div className="flex items-start gap-2">
            <span>📌</span>
            <span className="text-gray-700">&gt; &lt; 畫空心圓 ○；≥ ≤ 畫實心圓 ●</span>
          </div>
          <div className="flex items-start gap-2">
            <span>📌</span>
            <span className="text-gray-700">大於向右 → ，小於向左 ←</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-4">
        <button
          onClick={() => openApp("quiz.inequalities")}
          className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition shadow-lg"
        >
          📝 開始測驗（50 題）
        </button>
      </div>
    </div>
  );
}
