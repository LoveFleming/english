import React, { useState } from "react";
import quizDataRaw from "../data/phrases/prep_phrases.json";

type QuizItem = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  difficulty: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  time: "⏰ 時間 Time",
  place: "📍 地點 Place",
  work: "💼 工作 Work",
  communication: "💬 溝通 Communication",
  cause: "🔗 因果 Cause & Effect",
  action: "🎯 動作 Action",
  other: "📝 其他 Other",
};

const CATEGORY_COLORS: Record<string, { bg: string; border: string; header: string }> = {
  time: { bg: "bg-yellow-50/70", border: "border-yellow-200", header: "text-yellow-800" },
  place: { bg: "bg-green-50/70", border: "border-green-200", header: "text-green-800" },
  work: { bg: "bg-indigo-50/70", border: "border-indigo-200", header: "text-indigo-800" },
  communication: { bg: "bg-pink-50/70", border: "border-pink-200", header: "text-pink-800" },
  cause: { bg: "bg-orange-50/70", border: "border-orange-200", header: "text-orange-800" },
  action: { bg: "bg-purple-50/70", border: "border-purple-200", header: "text-purple-800" },
  other: { bg: "bg-teal-50/70", border: "border-teal-200", header: "text-teal-800" },
};

export default function PrepositionalPhrases({ openApp }: { openApp: (id: string) => void }) {
  const [showAll, setShowAll] = useState(false);
  const allQuestions = quizDataRaw as QuizItem[];

  // Extract phrase examples grouped by category
  const categories = Object.keys(CATEGORY_LABELS);
  const grouped = categories.map(cat => ({
    key: cat,
    label: CATEGORY_LABELS[cat],
    color: CATEGORY_COLORS[cat],
    items: allQuestions.filter(q => q.category === cat),
  })).filter(g => g.items.length > 0);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500 print-area">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-200 no-print">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">介系詞片語 (Prepositional Phrases)</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl border border-stone-300 transition-all active:scale-95 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m0 0a48.09 48.09 0 018.5 0m-8.5 0V6.75a2.25 2.25 0 012.25-2.25h4.5a2.25 2.25 0 012.25 2.25v.284" />
            </svg>
            列印
          </button>
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
      </div>

      {/* Print header - only visible when printing */}
      <div className="hidden print:block print:mb-6">
        <h1 className="text-2xl font-bold text-stone-900">介系詞片語 Prepositional Phrases — 國王的學習空間</h1>
        <p className="text-sm text-stone-500 mt-1">{allQuestions.length} 個常用片語，按分類整理</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 no-print">
        <h2 className="text-xl font-bold text-blue-800 mb-3">📖 什麼是介系詞片語？</h2>
        <p className="text-stone-700 text-lg leading-relaxed mb-4">
          <strong>介系詞片語</strong>是由「介系詞 + 名詞/代名詞」組成的固定搭配，表達特定的意思。
          這些片語在英文中非常常見，一定要整組背起來！
        </p>
        <p className="text-stone-700 text-lg leading-relaxed">
          例如：<strong>in charge of</strong> = 負責，<strong>on time</strong> = 準時，<strong>by heart</strong> = 背起來
        </p>
      </div>

      {/* Phrase list with examples - grouped by category */}
      {grouped.map(group => (
        <div key={group.key} className={`rounded-2xl border ${group.color.border} overflow-hidden`}>
          <div className={`${group.color.bg} px-5 py-3 border-b ${group.color.border}`}>
            <h2 className={`text-lg font-bold ${group.color.header}`}>{group.label}</h2>
          </div>
          <div className="divide-y divide-zinc-100">
            {group.items.map((item, idx) => (
              <div key={item.id} className={`px-5 py-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'} print:py-2`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-bold text-stone-900">{item.correctAnswer}</span>
                      <span className="text-stone-500">—</span>
                      <span className="text-stone-600">{item.explanation}</span>
                    </div>
                    <div className="text-sm text-stone-500 mt-0.5 italic print:text-xs">
                      {item.question}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white border border-blue-100 rounded-2xl p-6 no-print">
        <h3 className="font-bold text-stone-800 mb-2">💡 學習要訣：</h3>
        <ul className="list-disc pl-6 text-stone-700 space-y-1">
          <li>介系詞片語要整組記住，搭配例句理解</li>
          <li>同一個介系詞在不同片語意思完全不同（in time ≠ in a hurry）</li>
          <li>按「列印」按鈕印出來，貼在書桌前每天看</li>
          <li>背完後按「開始考試」測驗自己！{allQuestions.length} 題全涵蓋</li>
        </ul>
      </div>
    </div>
  );
}
