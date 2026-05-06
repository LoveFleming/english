import React from "react";

interface RatioAndProportionProps {
  openApp: (id: string) => void;
}

export default function RatioAndProportion({ openApp }: RatioAndProportionProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-800">3-1 比與比例式</h1>
        <p className="text-sm text-gray-500 mt-1">國中數學七年級下學期</p>
      </div>

      {/* 學習重點 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-blue-700 mb-3">📌 學習重點</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">●</span>
            <span className="text-blue-800">比與比值</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">●</span>
            <span className="text-blue-800">比例式</span>
          </div>
        </div>
      </div>

      {/* Section 1: 比與比值 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-amber-400 pb-1">
          🔸 重點 1：比與比值
        </h2>

        {/* 1. 比的定義 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">1️⃣ 比的定義</h3>
          <p className="text-gray-600 mb-3">兩個數 a 與 b 的比記為：</p>
          <div className="bg-amber-50 rounded-lg p-4 text-center text-xl font-mono font-bold text-amber-700">
            a : b
          </div>
          <div className="mt-3 space-y-1 text-gray-600">
            <p>a 為 <strong className="text-amber-600">前項</strong></p>
            <p>b 為 <strong className="text-amber-600">後項</strong></p>
          </div>
        </div>

        {/* 2. 比值 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">2️⃣ 比值</h3>
          <div className="bg-amber-50 rounded-lg p-4 text-center text-xl font-mono font-bold text-amber-700">
            a : b 的比值 = a / b = a ÷ b
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-gray-600">📌 條件：<strong className="text-red-500">b ≠ 0</strong>（分母不能為 0）</p>
            <p className="text-gray-600">📌 特例：若 a = 0 且 b ≠ 0 → 比值 = 0</p>
          </div>
        </div>

        {/* 3. 相等的比 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">3️⃣ 相等的比（等比）</h3>
          <p className="text-gray-600 mb-2">已知 a、b、m 為數（且 b、m ≠ 0）</p>
          <div className="space-y-3">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-bold mb-1">同乘：</p>
              <p className="text-center text-lg font-mono font-bold text-green-700">
                a : b = (a × m) : (b × m)
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 font-bold mb-1">同除：</p>
              <p className="text-center text-lg font-mono font-bold text-purple-700">
                a : b = (a ÷ m) : (b ÷ m)
              </p>
            </div>
          </div>
        </div>

        {/* 4. 最簡整數比 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">4️⃣ 最簡整數比</h3>
          <p className="text-gray-600 mb-2">當前項、後項都是整數且互質時，稱為「最簡整數比」</p>
          <div className="space-y-2 mt-3">
            <div className="flex items-center gap-2">
              <span className="text-red-500">❌</span>
              <span className="text-gray-600">0.3 : 0.5（不是整數比）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">❌</span>
              <span className="text-gray-600">4 : 6（還可以約分）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span className="text-gray-600">2 : 3（最簡整數比）</span>
            </div>
          </div>
        </div>
      </div>

      {/* 精選範例 */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-green-400 pb-1">
          🧠 精選範例
        </h2>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-700 mb-3">範例 1</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 mb-2">(1) 父親身高是兒子的 3 倍</p>
              <div className="bg-white rounded-lg p-3">
                <p className="text-green-700 font-bold">父親 : 兒子 = 3 : 1</p>
              </div>
            </div>
            <div>
              <p className="text-gray-700 mb-2">(2) 2 杯珍珠奶茶價錢 = 3 杯布丁奶茶價錢</p>
              <div className="bg-white rounded-lg p-3">
                <p className="text-green-700 font-bold">珍奶 : 布丁 = 3 : 2</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-blue-700 mb-3">🧪 學生演練</h3>
          <p className="text-gray-700 mb-3">碧姬身高 150 公分，游泳 100 公尺</p>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-700 mb-1">(1) 距離 : 身高 = ？</p>
              <p className="text-blue-700 font-bold">100 : 150 = 2 : 3</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-700 mb-1">(2) 距離是身高的幾倍？</p>
              <p className="text-blue-700 font-bold">100 ÷ 150 = 2/3 倍</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-4">
        <button
          onClick={() => openApp("quiz.ratio-proportion")}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
        >
          📝 開始測驗（50 題）
        </button>
      </div>
    </div>
  );
}
