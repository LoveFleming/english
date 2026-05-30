import React, { useState, useCallback, useEffect } from "react";
import { cn } from "../utils";

// ── Types ──
interface PracticeRecord {
  id: string;
  valueKey: string;
  date: string;
  what: string;
  reflection: string;
  createdAt: number;
}

const STORAGE_KEY = "english.tsmc-practice-records";

function loadRecords(): PracticeRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecords(records: PracticeRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ── Value Definitions ──
const VALUES = [
  {
    key: "integrity",
    label: "誠信正直",
    en: "Integrity",
    color: "#22c55e",
    colorLight: "#f0fdf4",
    colorBorder: "#bbf7d0",
    icon: "🛡️",
    emoji: "💚",
    description: "秉持誠實、透明、正直的態度，言行一致",
  },
  {
    key: "commitment",
    label: "承諾",
    en: "Commitment",
    color: "#3b82f6",
    colorLight: "#eff6ff",
    colorBorder: "#bfdbfe",
    icon: "🎯",
    emoji: "💙",
    description: "信守承諾，對自己的決定負責到底",
  },
  {
    key: "innovation",
    label: "創新",
    en: "Innovation",
    color: "#a855f7",
    colorLight: "#faf5ff",
    colorBorder: "#e9d5ff",
    icon: "💡",
    emoji: "💜",
    description: "勇於嘗試新方法，用創意解決問題",
  },
  {
    key: "trust",
    label: "信任與責任",
    en: "Trust & Responsibility",
    color: "#f97316",
    colorLight: "#fff7ed",
    colorBorder: "#fed7aa",
    icon: "🤝",
    emoji: "🧡",
    description: "建立互信，承擔責任，團隊合作",
  },
] as const;

// ── Form Modal ──
function PracticeForm({
  valueDef,
  onSave,
  onCancel,
  initial,
}: {
  valueDef: (typeof VALUES)[number];
  onSave: (r: Omit<PracticeRecord, "id" | "createdAt">) => void;
  onCancel: () => void;
  initial?: PracticeRecord;
}) {
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [what, setWhat] = useState(initial?.what ?? "");
  const [reflection, setReflection] = useState(initial?.reflection ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onCancel}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: valueDef.colorLight }}>
          <span className="text-2xl">{valueDef.icon}</span>
          <div>
            <div className="font-bold text-lg" style={{ color: valueDef.color }}>{valueDef.label}</div>
            <div className="text-xs text-stone-500">{valueDef.en}</div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">📅 日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{ focusRingColor: valueDef.color } as React.CSSProperties}
              onFocus={(e) => { e.target.style.borderColor = valueDef.color; e.target.style.boxShadow = `0 0 0 2px ${valueDef.color}30`; }}
              onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
            />
          </div>

          {/* What I did */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">✏️ 我做了什麼？</label>
            <textarea
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              placeholder={`今天我在「${valueDef.label}」方面做了...`}
              rows={3}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
              onFocus={(e) => { e.target.style.borderColor = valueDef.color; e.target.style.boxShadow = `0 0 0 2px ${valueDef.color}30`; }}
              onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
            />
          </div>

          {/* Reflection */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">🪞 我的心得與反思</label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="我學到了... 我覺得..."
              rows={3}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
              onFocus={(e) => { e.target.style.borderColor = valueDef.color; e.target.style.boxShadow = `0 0 0 2px ${valueDef.color}30`; }}
              onBlur={(e) => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-100 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => {
              if (!what.trim()) return;
              onSave({ valueKey: valueDef.key, date, what: what.trim(), reflection: reflection.trim() });
            }}
            className="px-5 py-2 text-sm text-white rounded-lg font-medium transition-all hover:shadow-md"
            style={{ backgroundColor: valueDef.color }}
          >
            💾 儲存紀錄
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Record Card ──
function RecordCard({
  record,
  valueDef,
  onDelete,
}: {
  record: PracticeRecord;
  valueDef: (typeof VALUES)[number];
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-xl border-2 overflow-hidden transition-all cursor-pointer"
      style={{ borderColor: valueDef.colorBorder, backgroundColor: valueDef.colorLight }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white shrink-0" style={{ backgroundColor: valueDef.color }}>
            {record.date}
          </span>
          <span className="text-xs text-stone-700 font-medium truncate">
            {record.what.slice(0, 25)}{record.what.length > 25 ? "..." : ""}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {expanded && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-1 text-stone-400 hover:text-rose-500 rounded transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={cn("w-3.5 h-3.5 text-stone-400 transition-transform", expanded ? "rotate-180" : "")}
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {expanded && (
        <div className="px-3 pb-3 space-y-2 border-t" style={{ borderColor: valueDef.colorBorder }}>
          <div className="pt-2">
            <div className="text-[10px] font-semibold text-stone-500 mb-1">✏️ 實踐內容</div>
            <div className="text-xs text-stone-700 whitespace-pre-wrap">{record.what}</div>
          </div>
          {record.reflection && (
            <div>
              <div className="text-[10px] font-semibold text-stone-500 mb-1">🪞 心得反思</div>
              <div className="text-xs text-stone-600 italic whitespace-pre-wrap">{record.reflection}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Page ──
export default function TsmcPractice() {
  const [records, setRecords] = useState<PracticeRecord[]>(loadRecords);
  const [formValue, setFormValue] = useState<(typeof VALUES)[number] | null>(null);
  const [editingRecord, setEditingRecord] = useState<PracticeRecord | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    saveRecords(records);
  }, [records]);

  const handleSave = useCallback(
    (data: Omit<PracticeRecord, "id" | "createdAt">) => {
      if (editingRecord) {
        setRecords((prev) =>
          prev.map((r) => (r.id === editingRecord.id ? { ...r, ...data } : r))
        );
        setEditingRecord(null);
      } else {
        const newRecord: PracticeRecord = {
          ...data,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: Date.now(),
        };
        setRecords((prev) => [newRecord, ...prev]);
      }
      setFormValue(null);
    },
    [editingRecord]
  );

  const handleDelete = useCallback((id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const recordsByValue = VALUES.map((v) => ({
    value: v,
    records: records.filter((r) => r.valueKey === v.key).sort((a, b) => b.createdAt - a.createdAt),
  }));

  const totalRecords = records.length;
  const valueStats = VALUES.map((v) => ({
    ...v,
    count: records.filter((r) => r.valueKey === v.key).length,
  }));

  const filteredGroups = selectedValue
    ? recordsByValue.filter((g) => g.value.key === selectedValue)
    : recordsByValue;

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: "#fafaf9" }}>
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl mb-6" style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-10 text-6xl">🏭</div>
          <div className="absolute bottom-2 right-20 text-4xl">⭐</div>
          <div className="absolute top-8 right-40 text-3xl">🌟</div>
        </div>
        <div className="relative px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg">
              🏗️
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">前進台積</h1>
              <p className="text-white/70 text-xs">TSMC Core Values — 實踐紀錄</p>
            </div>
          </div>
          <p className="text-white/60 text-xs max-w-md">
            記錄每天在台積電四大核心價值上的實踐，讓品格成長看得見 💪
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2">
              <div className="text-white/60 text-[9px] uppercase tracking-wider font-semibold">總紀錄</div>
              <div className="text-white text-lg font-bold">{totalRecords}</div>
            </div>
            {valueStats.map((v) => (
              <button
                key={v.key}
                onClick={() => setSelectedValue(selectedValue === v.key ? null : v.key)}
                className={cn(
                  "bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 transition-all cursor-pointer",
                  selectedValue === v.key && "ring-2 ring-white/50 bg-white/25"
                )}
              >
                <div className="text-white/60 text-[9px] uppercase tracking-wider font-semibold">{v.label}</div>
                <div className="text-white text-lg font-bold">{v.count}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Value Cards Grid */}
      {selectedValue && (
        <button
          onClick={() => setSelectedValue(null)}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-700 mb-4 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          顯示全部
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredGroups.map(({ value: v, records: vRecords }) => (
          <div
            key={v.key}
            className="rounded-2xl border-2 overflow-hidden bg-white transition-all hover:shadow-lg"
            style={{ borderColor: v.colorBorder }}
          >
            {/* Card Header — pocket style */}
            <div
              className="relative px-4 py-4"
              style={{
                background: `linear-gradient(135deg, ${v.colorLight} 0%, ${v.color}15 100%)`,
              }}
            >
              {/* Value badge */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold mb-2"
                style={{ backgroundColor: v.color }}
              >
                <span className="text-xs">{v.icon}</span>
                {v.en}
              </div>
              <div className="text-lg font-bold" style={{ color: v.color }}>
                {v.label}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">{v.description}</div>
              <div className="absolute top-2 right-2 text-2xl opacity-20">{v.emoji}</div>
            </div>

            {/* 我的紀錄卡 */}
            <div className="px-3 py-1 bg-stone-50 border-y" style={{ borderColor: v.colorBorder }}>
              <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">📝 我的紀錄卡</span>
              <span className="text-[9px] text-stone-400 ml-1">({vRecords.length} 筆)</span>
            </div>

            {/* Records List */}
            <div className="px-2.5 py-2.5 space-y-1.5 max-h-[220px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
              {vRecords.length === 0 ? (
                <div className="text-center py-4">
                  <div className="text-2xl mb-1 opacity-30">📝</div>
                  <div className="text-[10px] text-stone-400">還沒有紀錄</div>
                  <div className="text-[10px] text-stone-400">點擊下方按鈕開始記錄</div>
                </div>
              ) : (
                vRecords.map((r) => (
                  <RecordCard
                    key={r.id}
                    record={r}
                    valueDef={v}
                    onDelete={() => handleDelete(r.id)}
                  />
                ))
              )}
            </div>

            {/* Add button */}
            <div className="px-3 py-2.5 border-t" style={{ borderColor: v.colorBorder }}>
              <button
                onClick={() => setFormValue(v)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:shadow-md active:scale-[0.98]"
                style={{ backgroundColor: v.color }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                新增實踐紀錄
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {formValue && (
        <PracticeForm
          valueDef={formValue}
          onSave={handleSave}
          onCancel={() => {
            setFormValue(null);
            setEditingRecord(null);
          }}
          initial={editingRecord ?? undefined}
        />
      )}
    </div>
  );
}
