import React from "react";
import ReactMarkdown from "remark-gfm";
import { CodeBlock } from "../components/ui/shared";

export default function PrepositionalPhrases({ openApp }: { openApp: (id: string) => void }) {
  return (
    <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">介系詞片語 (Prepositional Phrases)</h1>
        <button
          onClick={() => openApp("quiz.prep-phrases")}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          開始考試
        </button>
      </div>

      <div className="markdown-body space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3">📖 什麼是介系詞片語？</h2>
          <p className="text-stone-700 text-lg leading-relaxed mb-4">
            <strong>介系詞片語</strong>是由「介系詞 + 名詞/代名詞」組成的固定搭配，表達特定的意思。
            這些片語在英文中非常常見，軟體工程師每天的工作對話和 email 裡都會用到。
          </p>
          <p className="text-stone-700 text-lg leading-relaxed">
            例如：<strong>in charge of</strong> = 負責，<strong>on time</strong> = 準時，<strong>by mistake</strong> = 不小心
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-yellow-50/70 border border-yellow-200 rounded-2xl p-5">
            <h3 className="font-bold text-stone-800 mb-2">⏰ 時間 Time</h3>
            <ul className="text-stone-700 space-y-1 text-sm">
              <li><strong>in time</strong> — 及時</li>
              <li><strong>on time</strong> — 準時</li>
              <li><strong>at the moment</strong> — 目前</li>
              <li><strong>in advance</strong> — 事先</li>
              <li><strong>on schedule</strong> — 按進度</li>
              <li><strong>by the end of</strong> — 在…結束前</li>
            </ul>
          </div>
          <div className="bg-green-50/70 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-stone-800 mb-2">📍 地點 Place</h3>
            <ul className="text-stone-700 space-y-1 text-sm">
              <li><strong>in front of</strong> — 在…前面</li>
              <li><strong>next to</strong> — 在…旁邊</li>
              <li><strong>on the way</strong> — 在路上</li>
              <li><strong>at the corner</strong> — 在轉角</li>
              <li><strong>in the middle of</strong> — 在…中間</li>
            </ul>
          </div>
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5">
            <h3 className="font-bold text-stone-800 mb-2">💼 工作 Work</h3>
            <ul className="text-stone-700 space-y-1 text-sm">
              <li><strong>in charge of</strong> — 負責</li>
              <li><strong>on behalf of</strong> — 代表</li>
              <li><strong>in progress</strong> — 進行中</li>
              <li><strong>on duty</strong> — 值班</li>
              <li><strong>under control</strong> — 在控制中</li>
              <li><strong>out of date</strong> — 過時的</li>
            </ul>
          </div>
          <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-5">
            <h3 className="font-bold text-stone-800 mb-2">💬 溝通 Communication</h3>
            <ul className="text-stone-700 space-y-1 text-sm">
              <li><strong>in other words</strong> — 換句話說</li>
              <li><strong>by the way</strong> — 順便一提</li>
              <li><strong>in person</strong> — 親自</li>
              <li><strong>on purpose</strong> — 故意的</li>
              <li><strong>good at</strong> — 擅長</li>
              <li><strong>focus on</strong> — 專注於</li>
            </ul>
          </div>
          <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-5">
            <h3 className="font-bold text-stone-800 mb-2">🔗 因果 Cause & Effect</h3>
            <ul className="text-stone-700 space-y-1 text-sm">
              <li><strong>because of</strong> — 因為</li>
              <li><strong>due to</strong> — 由於</li>
              <li><strong>as a result</strong> — 結果</li>
              <li><strong>in order to</strong> — 為了</li>
              <li><strong>instead of</strong> — 而不是</li>
              <li><strong>thanks to</strong> — 多虧</li>
            </ul>
          </div>
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5">
            <h3 className="font-bold text-stone-800 mb-2">🎯 動作 / 其他</h3>
            <ul className="text-stone-700 space-y-1 text-sm">
              <li><strong>at once</strong> — 立刻</li>
              <li><strong>by heart</strong> — 背起來</li>
              <li><strong>step by step</strong> — 一步一步</li>
              <li><strong>proud of</strong> — 驕傲</li>
              <li><strong>tired of</strong> — 厭倦</li>
              <li><strong>familiar with</strong> — 熟悉</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-2xl p-6">
          <h3 className="font-bold text-stone-800 mb-2">💡 學習要訣：</h3>
          <ul className="list-disc pl-6 text-stone-700 space-y-1">
            <li>介系詞片語要整組記住，搭配例句理解</li>
            <li>同一個介系詞在不同片語意思完全不同（in time ≠ in a hurry）</li>
            <li>多留意 email 和會議中出現的介系詞片語</li>
            <li>100 題考試涵蓋 7 大分類，多考幾次就能熟記！</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
