import React from "react";
import { Card } from "../components/ui/shared";
import notesData from "../data/geography/wrong_notes.json";

type Note = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  memoryTip?: string;
};

export default function GeographyNotes() {
  const notes = notesData as Note[];

  return (
    <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
      <div className="mb-4 pb-4 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">🌍 地理錯題本</h1>
        <p className="text-stone-500 mt-2">共 {notes.length} 題筆記</p>
      </div>

      {notes.map((note, i) => (
        <Card key={note.id} className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              {i + 1}
            </span>
            <h2 className="text-lg font-bold text-stone-900 pt-1">{note.question}</h2>
          </div>

          <div className="space-y-2 pl-11">
            {note.options.map((opt, j) => {
              const isCorrect = opt === note.answer;
              return (
                <div
                  key={j}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-medium ${
                    isCorrect
                      ? "border-green-400 bg-green-50 text-green-700"
                      : "border-zinc-200 bg-white text-stone-600"
                  }`}
                >
                  {isCorrect ? "✅ " : "　 "}{opt}
                </div>
              );
            })}
          </div>

          <div className="pl-11 space-y-3">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm font-bold text-blue-800 mb-1">📝 解析</p>
              <p className="text-sm text-stone-700 leading-relaxed">{note.explanation}</p>
            </div>

            {note.memoryTip && (
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm font-bold text-yellow-800 mb-1">💡 記法</p>
                <p className="text-sm text-stone-700 leading-relaxed">{note.memoryTip}</p>
              </div>
            )}
          </div>
        </Card>
      ))}

      {notes.length === 0 && (
        <Card className="p-8 text-center text-stone-400">
          還沒有錯題筆記，加油！💪
        </Card>
      )}
    </div>
  );
}
