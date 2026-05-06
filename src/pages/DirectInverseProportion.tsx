import React from "react";

interface DirectInverseProportionProps {
  openApp: (id: string) => void;
}

export default function DirectInverseProportion({ openApp }: DirectInverseProportionProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-800">3-2 正比與反比</h1>
        <p className="text-sm text-gray-500 mt-1">國中數學七年級下學期</p>
      </div>

      {/* 學習重點 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-700 mb-3">📌 學習重點</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">●</span>
            <span className="text-blue-800">正比（y = kx）</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">●</span>
            <span className="text-blue-800">反比（xy = k）</span>
          </div>
        </div>
      </div>

      {/* Section 1: 正比 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-green-400 pb-1">
          🔸 重點 1：正比
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">定義</h3>
          <p className="text-gray-600 mb-3">
            若兩變數 x、y，當 x 值改變，y 值也隨著改變，且 y 值恆為 x 值的 k 倍（k 為定值，k ≠ 0）：
          </p>
          <div className="bg-green-50 rounded-lg p-4 text-center space-y-2">
            <p className="text-xl font-mono font-bold text-green-700">y = kx</p>
            <p className="text-gray-500">或</p>
            <p className="text-xl font-mono font-bold text-green-700">y / x = k（定值）</p>
          </div>
          <p className="text-gray-600 mt-3">我們就稱 <strong>y 與 x 成正比</strong>。</p>
        </div>

        {/* 例 1 */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-700 mb-3">例 1：矩形面積</h3>
          <p className="text-gray-700 mb-2">矩形面積 y 平方公分，寬 4 公分，長 x 公分：</p>
          <div className="bg-white rounded-lg overflow-hidden mt-3">
            <table className="w-full text-center text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-3 py-2">長（公分）</th>
                  <th className="px-3 py-2">4</th>
                  <th className="px-3 py-2">5</th>
                  <th className="px-3 py-2">6</th>
                  <th className="px-3 py-2">…</th>
                  <th className="px-3 py-2">a</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 font-bold">面積</td>
                  <td className="px-3 py-2">16</td>
                  <td className="px-3 py-2">20</td>
                  <td className="px-3 py-2">24</td>
                  <td className="px-3 py-2">…</td>
                  <td className="px-3 py-2">4a</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white rounded-lg p-3">
            <p className="text-green-700 font-bold">y = 4x，y 與 x 成正比（k = 4）</p>
          </div>
        </div>

        {/* 例 2 */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-700 mb-3">例 2：求關係式</h3>
          <p className="text-gray-700 mb-2">已知 x、y 成正比，當 x = 3 時，y = 24</p>
          <div className="bg-white rounded-lg p-3 space-y-2">
            <p className="text-green-700">令 y = kx，代入 x = 3, y = 24：</p>
            <p className="text-green-700 font-bold">24 = k × 3 → k = 8</p>
            <p className="text-green-700 font-bold">所以 y = 8x</p>
            <p className="text-green-700 mt-2">當 y = 40 時：40 = 8x → x = 5</p>
          </div>
        </div>

        {/* 藍色提醒 */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">
          <h3 className="font-bold text-amber-700 mb-3">⚠️ 重要提醒</h3>
          <div className="space-y-2 text-gray-700 text-sm">
            <p>• x 值越大，y 值也越大，<strong>不一定</strong>表示 y 與 x 成正比</p>
            <p>• x、y 要有<strong>倍數關係</strong>（y/x = 定值）才算正比</p>
            <p>• 當 k 為負數時，x 越大 y 越<strong>小</strong></p>
          </div>
          <div className="bg-white rounded-lg p-3 mt-3 space-y-2">
            <p className="text-gray-700">
              <span className="text-red-500 font-bold">❌</span> y = 2x + 4 → y 與 x <strong>不成</strong>正比
            </p>
            <p className="text-gray-700">
              <span className="text-green-500 font-bold">✅</span> y = 2(x + 2) → y 與 (x + 2) 成正比
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: 反比 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-purple-400 pb-1">
          🔸 重點 2：反比
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">定義</h3>
          <p className="text-gray-600 mb-3">
            若兩變數 x、y，當 x 值改變，y 值也隨著改變，且 x 與 y 的乘積恆為定值 k（k ≠ 0）：
          </p>
          <div className="bg-purple-50 rounded-lg p-4 text-center space-y-2">
            <p className="text-xl font-mono font-bold text-purple-700">x × y = k（定值）</p>
            <p className="text-gray-500">或</p>
            <p className="text-xl font-mono font-bold text-purple-700">y = k / x</p>
          </div>
          <p className="text-gray-600 mt-3">我們就稱 <strong>y 與 x 成反比</strong>。</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
          <h3 className="font-bold text-purple-700 mb-3">例：反比關係</h3>
          <p className="text-gray-700 mb-2">走 120 公里的路程，速率 x km/h，時間 y 小時：</p>
          <div className="bg-white rounded-lg overflow-hidden mt-3">
            <table className="w-full text-center text-sm">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-3 py-2">速率 x</th>
                  <th className="px-3 py-2">10</th>
                  <th className="px-3 py-2">20</th>
                  <th className="px-3 py-2">30</th>
                  <th className="px-3 py-2">40</th>
                  <th className="px-3 py-2">60</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 font-bold">時間 y</td>
                  <td className="px-3 py-2">12</td>
                  <td className="px-3 py-2">6</td>
                  <td className="px-3 py-2">4</td>
                  <td className="px-3 py-2">3</td>
                  <td className="px-3 py-2">2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white rounded-lg p-3">
            <p className="text-purple-700 font-bold">x × y = 120，y 與 x 成反比（k = 120）</p>
            <p className="text-purple-600 text-sm mt-1">速率越快 → 時間越短（一個變大另一個變小）</p>
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">
          <h3 className="font-bold text-amber-700 mb-3">⚠️ 正比 vs 反比 比較</h3>
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left"></th>
                  <th className="px-4 py-2 text-center text-green-700">正比</th>
                  <th className="px-4 py-2 text-center text-purple-700">反比</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-bold">關係式</td>
                  <td className="px-4 py-2 font-mono text-center">y = kx</td>
                  <td className="px-4 py-2 font-mono text-center">xy = k</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold">定值</td>
                  <td className="px-4 py-2 text-center">y/x = k</td>
                  <td className="px-4 py-2 text-center">xy = k</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold">x 變大時</td>
                  <td className="px-4 py-2 text-center">y 也變大</td>
                  <td className="px-4 py-2 text-center">y 變小</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 精選範例 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-amber-400 pb-1">
          🧠 精選範例
        </h2>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-700 mb-3">範例：正比關係的判斷</h3>
          <p className="text-gray-700 mb-3">下列敘述中，y 與 x 為正比關係的有哪些？</p>
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3 flex items-start gap-2">
              <span className="text-red-500 font-bold">(A)</span>
              <span className="text-gray-700">圓面積 y 與半徑 x</span>
              <span className="text-red-500 ml-auto font-bold">❌</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">y = πx²，不是 y = kx（面積和半徑的<strong>平方</strong>成正比）</p>

            <div className="bg-white rounded-lg p-3 flex items-start gap-2">
              <span className="text-red-500 font-bold">(B)</span>
              <span className="text-gray-700">一天 24 小時，白天 x 小時，夜間 y 小時</span>
              <span className="text-red-500 ml-auto font-bold">❌</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">x + y = 24，不是 y = kx（是和為定值 = 反比關係的變形）</p>

            <div className="bg-white rounded-lg p-3 flex items-start gap-2">
              <span className="text-green-500 font-bold">(C)</span>
              <span className="text-gray-700">麵包 1 個 15 元，買 x 個共 y 元</span>
              <span className="text-green-500 ml-auto font-bold">✅</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">y = 15x，y/x = 15（定值）→ 正比！</p>

            <div className="bg-white rounded-lg p-3 flex items-start gap-2">
              <span className="text-red-500 font-bold">(D)</span>
              <span className="text-gray-700">120 頁的書，看了 x 頁剩下 y 頁</span>
              <span className="text-red-500 ml-auto font-bold">❌</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">x + y = 120，y = 120 - x，不是 y = kx</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-blue-700 mb-3">練習：判斷正比</h3>
          <p className="text-gray-700 mb-3">下列敘述中，y 與 x 為正比關係的有哪些？</p>
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3 flex items-start gap-2">
              <span className="text-green-500 font-bold">(A)</span>
              <span className="text-gray-700">圓周長 y 與半徑 x</span>
              <span className="text-green-500 ml-auto font-bold">✅</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">y = 2πx，y/x = 2π（定值）→ 正比！</p>

            <div className="bg-white rounded-lg p-3 flex items-start gap-2">
              <span className="text-red-500 font-bold">(B)</span>
              <span className="text-gray-700">小明 x 歲與父親 y 歲</span>
              <span className="text-red-500 ml-auto font-bold">❌</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">y = x +（年齡差），不是 y = kx</p>

            <div className="bg-white rounded-lg p-3 flex items-start gap-2">
              <span className="text-red-500 font-bold">(C)</span>
              <span className="text-gray-700">全班 36 人，男生 x 人，女生 y 人</span>
              <span className="text-red-500 ml-auto font-bold">❌</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">x + y = 36，不是 y = kx</p>

            <div className="bg-white rounded-lg p-3 flex items-start gap-2">
              <span className="text-green-500 font-bold">(D)</span>
              <span className="text-gray-700">1 台斤 = 0.6 公斤，體重 x 台斤，重量 y 公斤</span>
              <span className="text-green-500 ml-auto font-bold">✅</span>
            </div>
            <p className="text-xs text-gray-500 ml-6">y = 0.6x，y/x = 0.6（定值）→ 正比！</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-4">
        <button
          onClick={() => openApp("quiz.direct-inverse-proportion")}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
        >
          📝 開始測驗（50 題）
        </button>
      </div>
    </div>
  );
}
