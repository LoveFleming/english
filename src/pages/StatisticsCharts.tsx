import React from "react";

interface StatisticsChartsProps {
  openApp: (id: string) => void;
}

export default function StatisticsCharts({ openApp }: StatisticsChartsProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-800">5-1 統計圖表與資料分析</h1>
        <p className="text-sm text-gray-500 mt-1">國小數學六年級</p>
      </div>

      {/* 學習重點 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="text-lg font-bold text-amber-700 mb-3">📌 學習重點</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">●</span>
            <span className="text-amber-800">生活中的統計圖表（長條圖、折線圖、圓形圖、列聯表）</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">●</span>
            <span className="text-amber-800">次數分配表與分組規則</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">●</span>
            <span className="text-amber-800">直方圖與分組折線圖</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">●</span>
            <span className="text-amber-800">平均數、中位數、眾數</span>
          </div>
        </div>
      </div>

      {/* ==================== Section 1 ==================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-amber-400 pb-1">
          📊 重點 1：生活中的統計圖表
        </h2>

        {/* 長條圖 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">1️⃣ 長條圖</h3>
          <div className="space-y-2 text-gray-600">
            <p>📌 用來<strong className="text-amber-600">比較各組資料的大小</strong></p>
            <p>📌 資料之間<strong className="text-amber-600">沒有連續關係</strong>，不一定有先後順序</p>
            <p>📌 每個長條之間<strong>有空隙</strong></p>
          </div>
          <div className="mt-3 bg-amber-50 rounded-lg p-4">
            <p className="text-sm font-bold text-amber-600 mb-1">💡 常見例子：</p>
            <p className="text-gray-700">• 最喜歡的食物調查（ pizza 🍕、炸雞 🍗、壽司 🍣 …）</p>
            <p className="text-gray-700">• 不同班級的人數比較</p>
          </div>
        </div>

        {/* 折線圖 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">2️⃣ 折線圖</h3>
          <div className="space-y-2 text-gray-600">
            <p>📌 表示資料隨<strong className="text-amber-600">時間或順序的變化</strong></p>
            <p>📌 用<strong className="text-amber-600">線段</strong>連接各數據點，可以看出趨勢（上升↗ 或下降↘）</p>
          </div>
          <div className="mt-3 bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-bold text-blue-600 mb-1">💡 常見例子：</p>
            <p className="text-gray-700">• 每月氣溫變化 🌡️</p>
            <p className="text-gray-700">• 每月銷售量變化 📈</p>
          </div>
        </div>

        {/* 圓形圖 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">3️⃣ 圓形圖（圓餅圖）</h3>
          <div className="space-y-2 text-gray-600">
            <p>📌 表示各部分占<strong className="text-amber-600">全部的比例</strong></p>
            <p>📌 全部加起來一定 = <strong className="text-red-500">100%</strong></p>
          </div>
          <div className="mt-3 bg-green-50 rounded-lg p-4">
            <p className="text-sm font-bold text-green-600 mb-1">💡 常見例子：</p>
            <p className="text-gray-700">• 上學方式的比例（走路、搭公車、家長接送…）</p>
            <p className="text-gray-700">• 家庭支出的分配 🏠</p>
          </div>
        </div>

        {/* 列聯表 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">4️⃣ 列聯表</h3>
          <div className="space-y-2 text-gray-600">
            <p>📌 同時用<strong className="text-amber-600">兩種方式</strong>來分類資料</p>
            <p>📌 可以看出兩種分類之間的關係</p>
          </div>
          <div className="mt-3 bg-purple-50 rounded-lg p-4 overflow-x-auto">
            <p className="text-sm font-bold text-purple-600 mb-2">💡 例：性別 × 是否近視</p>
            <table className="w-full text-center text-sm border-collapse">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-purple-300 px-3 py-2"></th>
                  <th className="border border-purple-300 px-3 py-2">近視</th>
                  <th className="border border-purple-300 px-3 py-2">沒有近視</th>
                  <th className="border border-purple-300 px-3 py-2">合計</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-purple-300 px-3 py-2 font-bold">男</td>
                  <td className="border border-purple-300 px-3 py-2">8</td>
                  <td className="border border-purple-300 px-3 py-2">12</td>
                  <td className="border border-purple-300 px-3 py-2 font-bold">20</td>
                </tr>
                <tr>
                  <td className="border border-purple-300 px-3 py-2 font-bold">女</td>
                  <td className="border border-purple-300 px-3 py-2">10</td>
                  <td className="border border-purple-300 px-3 py-2">10</td>
                  <td className="border border-purple-300 px-3 py-2 font-bold">20</td>
                </tr>
                <tr className="bg-purple-50 font-bold">
                  <td className="border border-purple-300 px-3 py-2">合計</td>
                  <td className="border border-purple-300 px-3 py-2">18</td>
                  <td className="border border-purple-300 px-3 py-2">22</td>
                  <td className="border border-purple-300 px-3 py-2">40</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==================== Section 2 ==================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-400 pb-1">
          📋 重點 2：次數分配表
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">製作步驟</h3>

          <div className="space-y-4">
            {/* 步驟 1 */}
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="font-bold text-amber-700 mb-1">步驟 1：決定組距</p>
              <p className="text-gray-600">把資料分成幾個範圍，例如每 10 分一組：</p>
              <p className="text-gray-700 font-mono mt-1">30～40、40～50、50～60、…、90～100</p>
            </div>

            {/* 步驟 2 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="font-bold text-blue-700 mb-1">步驟 2：分組規則（重要！）</p>
              <p className="text-gray-600 mb-2">
                <strong className="text-red-500">包含下限，不包含上限</strong>
              </p>
              <div className="space-y-1 text-gray-700">
                <p>• 40 分 → 放入 <strong>40～50</strong> 這組</p>
                <p>• 50 分 → 放入 <strong>50～60</strong> 這組</p>
                <p>• 100 分 → 放入 <strong>90～100</strong> 這組（最高組包含上限）</p>
              </div>
            </div>

            {/* 步驟 3 */}
            <div className="bg-green-50 rounded-lg p-4">
              <p className="font-bold text-green-700 mb-1">步驟 3：統計次數</p>
              <p className="text-gray-600 mb-2">算出每組有多少筆資料：</p>
              <div className="overflow-x-auto">
                <table className="w-full text-center text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-green-300 px-4 py-2">分數</th>
                      <th className="border border-green-300 px-4 py-2">30～40</th>
                      <th className="border border-green-300 px-4 py-2">40～50</th>
                      <th className="border border-green-300 px-4 py-2">50～60</th>
                      <th className="border border-green-300 px-4 py-2">60～70</th>
                      <th className="border border-green-300 px-4 py-2">70～80</th>
                      <th className="border border-green-300 px-4 py-2">80～90</th>
                      <th className="border border-green-300 px-4 py-2">90～100</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-green-300 px-4 py-2 font-bold">次數</td>
                      <td className="border border-green-300 px-4 py-2">2</td>
                      <td className="border border-green-300 px-4 py-2">3</td>
                      <td className="border border-green-300 px-4 py-2">5</td>
                      <td className="border border-green-300 px-4 py-2">8</td>
                      <td className="border border-green-300 px-4 py-2">6</td>
                      <td className="border border-green-300 px-4 py-2">4</td>
                      <td className="border border-green-300 px-4 py-2">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 mt-2 text-right">總次數 = 2+3+5+8+6+4+2 = <strong>30</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Section 3 ==================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-amber-400 pb-1">
          📈 重點 3：分組資料的直方圖
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="space-y-3 text-gray-600">
            <p>📌 用長方形顯示各組資料的<strong className="text-amber-600">次數</strong></p>
            <p>📌 長條彼此<strong className="text-red-500">相連</strong>（因為資料有連續性）</p>
          </div>

          <div className="mt-4 bg-amber-50 rounded-lg p-4">
            <p className="font-bold text-amber-700 mb-2">⚠️ 直方圖 vs 長條圖</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-red-500">🔴</span>
                <span><strong>直方圖</strong>：長條之間<strong>沒有空隙</strong>（連續資料）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔵</span>
                <span><strong>長條圖</strong>：長條之間<strong>有空隙</strong>（不連續資料）</span>
              </div>
            </div>
          </div>

          {/* 簡易示意圖 */}
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-bold text-gray-500 mb-2">直方圖示意（以分組分數為例）：</p>
            <div className="flex items-end justify-center gap-0 h-32">
              <div className="bg-amber-400 w-10" style={{ height: "20%" }} title="30-40: 2人"></div>
              <div className="bg-amber-400 w-10" style={{ height: "30%" }} title="40-50: 3人"></div>
              <div className="bg-amber-400 w-10" style={{ height: "50%" }} title="50-60: 5人"></div>
              <div className="bg-amber-500 w-10" style={{ height: "80%" }} title="60-70: 8人"></div>
              <div className="bg-amber-400 w-10" style={{ height: "60%" }} title="70-80: 6人"></div>
              <div className="bg-amber-400 w-10" style={{ height: "40%" }} title="80-90: 4人"></div>
              <div className="bg-amber-400 w-10" style={{ height: "20%" }} title="90-100: 2人"></div>
            </div>
            <div className="flex justify-center mt-1">
              <p className="text-xs text-gray-400">30  40  50  60  70  80  90  100</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Section 4 ==================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-400 pb-1">
          📉 重點 4：分組資料的折線圖
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">畫法步驟</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0">1</span>
              <p className="text-gray-600">畫座標軸（橫軸 = 分組，縱軸 = 次數）</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0">2</span>
              <p className="text-gray-600">找出每組的<strong className="text-amber-600">組中點</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0">3</span>
              <p className="text-gray-600">在組中點上方標出該組的次數</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm shrink-0">4</span>
              <p className="text-gray-600">用<strong className="text-amber-600">線段</strong>把各點連起來</p>
            </div>
          </div>

          <div className="mt-4 bg-amber-50 rounded-lg p-4">
            <p className="font-bold text-amber-700 mb-2">📐 組中點公式</p>
            <div className="bg-white rounded-lg p-3 text-center text-lg font-mono font-bold text-amber-700">
              組中點 =（下限 ＋ 上限）÷ 2
            </div>
            <div className="mt-3 text-gray-600">
              <p className="font-bold text-sm mb-1">例題：</p>
              <p>• 155～160 → （155 ＋ 160）÷ 2 = <strong className="text-amber-600">157.5</strong></p>
              <p>• 30～40 → （30 ＋ 40）÷ 2 = <strong className="text-amber-600">35</strong></p>
              <p>• 90～100 → （90 ＋ 100）÷ 2 = <strong className="text-amber-600">95</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Section 5 ==================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-amber-400 pb-1">
          ➗ 重點 5：平均數
        </h2>

        {/* 未分組 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">1️⃣ 未分組平均數</h3>
          <div className="bg-amber-50 rounded-lg p-4 text-center">
            <p className="text-lg font-mono font-bold text-amber-700">
              平均數 = 資料總和 ÷ 資料個數
            </p>
          </div>
          <div className="mt-4 bg-green-50 rounded-lg p-4">
            <p className="font-bold text-green-700 mb-2">🧪 範例</p>
            <p className="text-gray-700 mb-2">資料：2, 1, 1, 2, 0</p>
            <div className="bg-white rounded-lg p-3 space-y-1">
              <p className="text-green-700">平均數 = (2＋1＋1＋2＋0) ÷ 5</p>
              <p className="text-green-700">= 6 ÷ 5</p>
              <p className="text-green-700 font-bold">= 1.2</p>
            </div>
          </div>
        </div>

        {/* 分組 */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-3">2️⃣ 分組平均數</h3>
          <div className="bg-amber-50 rounded-lg p-4 text-center">
            <p className="text-lg font-mono font-bold text-amber-700">
              平均數 = Σ（組中點 × 次數）÷ 總次數
            </p>
          </div>
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <p className="font-bold text-blue-700 mb-2">🧪 範例</p>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm border-collapse mb-3">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-300 px-3 py-2">分數</th>
                    <th className="border border-blue-300 px-3 py-2">組中點</th>
                    <th className="border border-blue-300 px-3 py-2">次數</th>
                    <th className="border border-blue-300 px-3 py-2">組中點×次數</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blue-300 px-3 py-2">40～50</td>
                    <td className="border border-blue-300 px-3 py-2">45</td>
                    <td className="border border-blue-300 px-3 py-2">2</td>
                    <td className="border border-blue-300 px-3 py-2">90</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-300 px-3 py-2">50～60</td>
                    <td className="border border-blue-300 px-3 py-2">55</td>
                    <td className="border border-blue-300 px-3 py-2">4</td>
                    <td className="border border-blue-300 px-3 py-2">220</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-300 px-3 py-2">60～70</td>
                    <td className="border border-blue-300 px-3 py-2">65</td>
                    <td className="border border-blue-300 px-3 py-2">6</td>
                    <td className="border border-blue-300 px-3 py-2">390</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-300 px-3 py-2">70～80</td>
                    <td className="border border-blue-300 px-3 py-2">75</td>
                    <td className="border border-blue-300 px-3 py-2">5</td>
                    <td className="border border-blue-300 px-3 py-2">375</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-300 px-3 py-2">80～90</td>
                    <td className="border border-blue-300 px-3 py-2">85</td>
                    <td className="border border-blue-300 px-3 py-2">3</td>
                    <td className="border border-blue-300 px-3 py-2">255</td>
                  </tr>
                  <tr className="bg-blue-50 font-bold">
                    <td className="border border-blue-300 px-3 py-2">合計</td>
                    <td className="border border-blue-300 px-3 py-2"></td>
                    <td className="border border-blue-300 px-3 py-2">20</td>
                    <td className="border border-blue-300 px-3 py-2">1330</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-blue-700">平均數 = 1330 ÷ 20 = <strong>66.5</strong> 分</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Section 6 ==================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-400 pb-1">
          🎯 重點 6：中位數
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="space-y-2 text-gray-600">
            <p>📌 將資料<strong className="text-amber-600">由小到大排列</strong>，取最中間的數</p>
            <p>📌 如果資料個數是<strong className="text-red-500">奇數</strong> → 取正中間那一個</p>
            <p>📌 如果資料個數是<strong className="text-red-500">偶數</strong> → 取中間兩個的平均</p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="font-bold text-green-700 mb-2">🧪 範例 1（奇數個）</p>
              <p className="text-gray-700 mb-1">資料：3, 7, 1, 9, 5</p>
              <p className="text-gray-700">排列：1, 3, <strong className="text-green-600 bg-green-100 px-1 rounded">7</strong>, 5, 9</p>
              <p className="text-gray-600 text-sm mt-1">→ 中位數 = <strong className="text-green-700">5</strong></p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="font-bold text-blue-700 mb-2">🧪 範例 2（偶數個）</p>
              <p className="text-gray-700 mb-1">資料：4, 8, 2, 6</p>
              <p className="text-gray-700">排列：2, <strong className="text-blue-600 bg-blue-100 px-1 rounded">4, 6</strong>, 8</p>
              <p className="text-gray-600 text-sm mt-1">→ 中位數 = (4＋6) ÷ 2 = <strong className="text-blue-700">5</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Section 7 ==================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-amber-400 pb-1">
          🏆 重點 7：眾數
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="space-y-2 text-gray-600">
            <p>📌 出現次數<strong className="text-amber-600">最多</strong>的數</p>
            <p>📌 一組資料可能有多個眾數，也可能沒有眾數</p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="font-bold text-green-700 mb-2">🧪 範例 1</p>
              <p className="text-gray-700 mb-1">資料：1, 2, 2, 3, 4</p>
              <p className="text-green-700 font-bold">→ 眾數 = 2（出現 2 次，最多）</p>
            </div>

            <div className="bg-amber-50 rounded-lg p-4">
              <p className="font-bold text-amber-700 mb-2">🧪 範例 2（多個眾數）</p>
              <p className="text-gray-700 mb-1">資料：1, 2, 2, 3, 3, 4</p>
              <p className="text-amber-700 font-bold">→ 眾數 = 2 和 3（都出現 2 次）</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 精選範例 ==================== */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-green-400 pb-1">
          🧠 精選綜合範例
        </h2>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-700 mb-3">範例：小華這學期 7 次數學小考成績如下</h3>
          <p className="text-gray-700 mb-3 font-mono">72, 85, 85, 90, 68, 85, 77</p>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-700 mb-1 font-bold">(1) 平均數？</p>
              <p className="text-green-700">(72＋85＋85＋90＋68＋85＋77) ÷ 7 = 562 ÷ 7 = <strong>80.3</strong></p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-700 mb-1 font-bold">(2) 中位數？</p>
              <p className="text-green-700">排列：68, 72, 77, <strong className="bg-green-100 px-1 rounded">85</strong>, 85, 85, 90</p>
              <p className="text-green-700">中位數 = <strong>85</strong></p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-700 mb-1 font-bold">(3) 眾數？</p>
              <p className="text-green-700">85 出現 3 次，最多 → 眾數 = <strong>85</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 考前必背重點 ==================== */}
      <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5">
        <h2 className="text-lg font-bold text-amber-700 mb-3">📝 考前必背重點</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">1.</span>
            <span className="text-amber-800"><strong>長條圖</strong>用來比較各組大小，長條之間<strong>有空隙</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">2.</span>
            <span className="text-amber-800"><strong>折線圖</strong>表示資料隨時間的變化趨勢</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">3.</span>
            <span className="text-amber-800"><strong>圓形圖</strong>表示各部分占全部的比例，加起來 = 100%</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">4.</span>
            <span className="text-amber-800"><strong>列聯表</strong>同時用兩種方式分類資料</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">5.</span>
            <span className="text-amber-800">分組規則：<strong className="text-red-600">包含下限，不包含上限</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">6.</span>
            <span className="text-amber-800"><strong>直方圖</strong>的長條<strong>沒有空隙</strong>（和長條圖最大差別）</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">7.</span>
            <span className="text-amber-800">組中點 =（<strong>下限＋上限</strong>）÷ 2</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">8.</span>
            <span className="text-amber-800"><strong>平均數</strong> = 資料總和 ÷ 個數（分組用 Σ組中點×次數 ÷ 總次數）</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">9.</span>
            <span className="text-amber-800"><strong>中位數</strong>：排列後取中間值，偶數個取中間兩個平均</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 font-bold shrink-0">10.</span>
            <span className="text-amber-800"><strong>眾數</strong>：出現最多次的數（可能不只一個）</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-4">
        <button
          onClick={() => openApp("quiz.statistics-charts")}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
        >
          📝 開始測驗
        </button>
      </div>
    </div>
  );
}
