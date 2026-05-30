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

// ── Color Palette (matching the image) ──
const VALUES = [
  {
    key: "integrity",
    label: "誠信正直",
    en: "Integrity",
    color: "#6B9E6B",
    bg: "#CDEACB",
    border: "#A8D5A0",
    iconBg: "#4A7C4A",
    icon: "🤲",
    story: "小元寶國王在草地上撿到一個錢包...",
  },
  {
    key: "commitment",
    label: "承諾",
    en: "Commitment",
    color: "#4A7EB5",
    bg: "#B1D4F3",
    border: "#8BBDE8",
    iconBg: "#2E5F8A",
    icon: "🤝",
    story: "小元寶國王答應今天要完成功課...",
  },
  {
    key: "innovation",
    label: "創新",
    en: "Innovation",
    color: "#7B6BAE",
    bg: "#DAD6EB",
    border: "#BDB6D4",
    iconBg: "#5A4D8A",
    icon: "💡",
    story: "小元寶國王發現積木車可以變成更多東西...",
  },
  {
    key: "trust",
    label: "信任與責任",
    en: "Trust & Responsibility",
    color: "#D47B6A",
    bg: "#FED0D5",
    border: "#F5A8AE",
    iconBg: "#B55A4A",
    icon: "👭",
    story: "小元寶國王看到朋友需要幫忙...",
  },
] as const;

// ── Decorative Leaf Border SVG ──
function LeafBorder({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 12" className="w-full h-3 opacity-40" preserveAspectRatio="none">
      <path
        d="M0,6 Q10,2 20,6 Q30,10 40,6 Q50,2 60,6 Q70,10 80,6 Q90,2 100,6 Q110,10 120,6 Q130,2 140,6 Q150,10 160,6 Q170,2 180,6 Q190,10 200,6"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ── Small Stars ──
function StarDoodles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <span className="absolute top-2 right-4 text-xs" style={{ color }}>⭐</span>
      <span className="absolute top-8 left-3 text-[8px]" style={{ color }}>✦</span>
      <span className="absolute bottom-12 right-6 text-[10px]" style={{ color }}>✧</span>
      <span className="absolute bottom-4 left-6 text-xs" style={{ color }}>⭐</span>
    </div>
  );
}

// ── Practice Form Modal ──
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={onCancel}>
      <div
        className="w-full max-w-md overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#FFF9F0", borderRadius: "20px", border: `2px solid ${valueDef.border}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper texture header */}
        <div className="relative px-5 py-4 flex items-center gap-3" style={{ backgroundColor: valueDef.bg }}>
          {/* Tab circle with icon */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md shrink-0"
            style={{ backgroundColor: valueDef.iconBg, border: "2px solid white" }}
          >
            {valueDef.icon}
          </div>
          <div>
            <div className="font-bold text-base" style={{ color: valueDef.iconBg }}>{valueDef.en}</div>
            <div className="font-bold text-lg" style={{ color: valueDef.color }}>{valueDef.label}</div>
          </div>
          <div className="absolute top-2 right-3 text-3xl opacity-15">⭐</div>
        </div>

        {/* Notebook-style form area */}
        <div className="px-5 py-5 space-y-4" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8e0d0 28px)", backgroundSize: "100% 28px" }}>
          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: "#2B2B2B" }}>📅 日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-2 rounded-xl px-3 py-2 text-sm bg-white/80 focus:outline-none"
              style={{ borderColor: valueDef.border, focusRingColor: valueDef.color } as React.CSSProperties}
              onFocus={(e) => { e.target.style.borderColor = valueDef.color; e.target.style.boxShadow = `0 0 0 3px ${valueDef.color}30`; }}
              onBlur={(e) => { e.target.style.borderColor = valueDef.border; e.target.style.boxShadow = ""; }}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: "#2B2B2B" }}>✏️ 我做了什麼？</label>
            <textarea
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              placeholder={`今天我在「${valueDef.label}」方面做了...`}
              rows={3}
              className="w-full border-2 rounded-xl px-3 py-2 text-sm bg-white/80 resize-none focus:outline-none"
              style={{ borderColor: valueDef.border }}
              onFocus={(e) => { e.target.style.borderColor = valueDef.color; e.target.style.boxShadow = `0 0 0 3px ${valueDef.color}30`; }}
              onBlur={(e) => { e.target.style.borderColor = valueDef.border; e.target.style.boxShadow = ""; }}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1" style={{ color: "#2B2B2B" }}>🪞 我的心得與反思</label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="我學到了... 我覺得..."
              rows={3}
              className="w-full border-2 rounded-xl px-3 py-2 text-sm bg-white/80 resize-none focus:outline-none"
              style={{ borderColor: valueDef.border }}
              onFocus={(e) => { e.target.style.borderColor = valueDef.color; e.target.style.boxShadow = `0 0 0 3px ${valueDef.color}30`; }}
              onBlur={(e) => { e.target.style.borderColor = valueDef.border; e.target.style.boxShadow = ""; }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex justify-end gap-2" style={{ backgroundColor: valueDef.bg, borderTop: `1px dashed ${valueDef.border}` }}>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-xl font-medium transition-colors"
            style={{ color: valueDef.color }}
          >
            取消
          </button>
          <button
            onClick={() => {
              if (!what.trim()) return;
              onSave({ valueKey: valueDef.key, date, what: what.trim(), reflection: reflection.trim() });
            }}
            className="px-5 py-2 text-sm text-white rounded-xl font-bold transition-all hover:shadow-lg active:scale-95"
            style={{ backgroundColor: valueDef.color }}
          >
            💾 寫好了！
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Record Item (in the pocket) ──
function RecordItem({
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
      className="rounded-lg overflow-hidden cursor-pointer transition-all"
      style={{ backgroundColor: "rgba(255,255,255,0.7)", border: `1.5px dashed ${valueDef.border}` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white shrink-0"
            style={{ backgroundColor: valueDef.color }}
          >
            {record.date.slice(5)}
          </span>
          <span className="text-[11px] text-stone-700 truncate">
            {record.what.slice(0, 20)}{record.what.length > 20 ? "..." : ""}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {expanded && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-0.5 text-stone-400 hover:text-rose-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            className={cn("w-3 h-3 text-stone-400 transition-transform", expanded && "rotate-180")}>
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {expanded && (
        <div className="px-3 pb-2 space-y-1.5" style={{ borderTop: `1px dashed ${valueDef.border}` }}>
          <div className="pt-1.5">
            <div className="text-[10px] font-bold text-stone-500 mb-0.5">✏️ 實踐內容</div>
            <div className="text-[11px] text-stone-700 whitespace-pre-wrap leading-relaxed">{record.what}</div>
          </div>
          {record.reflection && (
            <div>
              <div className="text-[10px] font-bold text-stone-500 mb-0.5">🪞 心得反思</div>
              <div className="text-[11px] text-stone-600 italic whitespace-pre-wrap leading-relaxed">{record.reflection}</div>
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

  useEffect(() => { saveRecords(records); }, [records]);

  const handleSave = useCallback(
    (data: Omit<PracticeRecord, "id" | "createdAt">) => {
      if (editingRecord) {
        setRecords((prev) => prev.map((r) => (r.id === editingRecord.id ? { ...r, ...data } : r)));
        setEditingRecord(null);
      } else {
        setRecords((prev) => [
          { ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: Date.now() },
          ...prev,
        ]);
      }
      setFormValue(null);
    },
    [editingRecord]
  );

  const handleDelete = useCallback((id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const totalRecords = records.length;

  return (
    <div
      className="h-full overflow-y-auto pb-8"
      style={{
        backgroundColor: "#F0E6D2",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c5a9' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* ── Notebook Header ── */}
      <div className="relative mx-4 sm:mx-8 mt-4 rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: "#FFF9F0", border: "2px solid #D4C5A9" }}>
        {/* Spiral binding decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col items-center justify-center gap-3 z-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full border-2 border-stone-400 bg-stone-200 shadow-sm" />
          ))}
        </div>

        <div className="pl-10 pr-5 py-5 relative">
          {/* Spine label */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-stone-300 opacity-50" />

          <div className="flex items-center gap-4">
            {/* King avatar */}
            <div className="shrink-0">
              <img
                src="/king.jpeg"
                alt="小元寶國王"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-md"
                style={{ border: "3px solid #D4A843" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#2B2B2B", fontFamily: "serif" }}>
                前進台積
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-stone-500 italic">── 實踐紀錄 ──</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: "#8B7355" }}>
                  {totalRecords} 筆
                </span>
              </div>
            </div>
            {/* Decorative pencils */}
            <div className="ml-auto hidden sm:flex flex-col items-end gap-1 opacity-80">
              <div className="flex items-center -rotate-12">
                <div className="h-2 w-24 rounded-l-sm" style={{ backgroundColor: "#F7A13E" }} />
                <div className="h-2 w-2" style={{ backgroundColor: "#F7A13E", clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
                <div className="h-2 w-3 rounded-r-full bg-pink-300" />
              </div>
              <div className="flex items-center rotate-6">
                <div className="h-2 w-20 rounded-l-sm" style={{ backgroundColor: "#106733" }} />
                <div className="h-2 w-2" style={{ backgroundColor: "#106733", clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
                <div className="h-2 w-3 rounded-r-full bg-emerald-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Card Pockets Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mx-4 sm:mx-8 mt-6">
        {VALUES.map((v) => {
          const vRecords = records.filter((r) => r.valueKey === v.key).sort((a, b) => b.createdAt - a.createdAt);

          return (
            <div
              key={v.key}
              className="relative rounded-2xl overflow-hidden shadow-md transition-all hover:shadow-xl"
              style={{ backgroundColor: v.bg, border: `2px solid ${v.border}` }}
            >
              {/* Star doodles */}
              <StarDoodles color={v.color} />

              {/* ── Tab at top ── */}
              <div className="flex items-center justify-center pt-3 pb-1 relative z-10">
                <div
                  className="flex flex-col items-center px-4 py-2 rounded-t-xl"
                  style={{ backgroundColor: v.bg, borderTop: `3px solid ${v.color}`, borderLeft: `1px solid ${v.border}`, borderRight: `1px solid ${v.border}` }}
                >
                  {/* Icon circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md mb-1"
                    style={{ backgroundColor: v.iconBg, border: "2px solid white" }}
                  >
                    {v.icon}
                  </div>
                  <div className="text-[10px] font-bold" style={{ color: v.iconBg }}>{v.en}</div>
                  <div className="text-sm font-bold" style={{ color: v.color }}>{v.label}</div>
                </div>
              </div>

              {/* ── Leaf border ── */}
              <LeafBorder color={v.color} />

              {/* ── Story text area ── */}
              <div className="px-4 py-2 relative z-10">
                <div className="text-[10px] text-stone-600 leading-relaxed italic" style={{ minHeight: "2rem" }}>
                  {v.story}
                </div>
              </div>

              {/* ── 我的紀錄卡 pocket ── */}
              <div className="mx-3 mb-2 rounded-xl relative z-10" style={{ backgroundColor: "rgba(255,255,255,0.5)", border: `1.5px dashed ${v.border}`, borderTop: `2px solid ${v.color}` }}>
                <div className="flex items-center justify-between px-3 py-1.5">
                  <span className="text-[10px] font-bold text-stone-500">📝 我的紀錄卡</span>
                  {/* Star brad */}
                  <span className="text-xs opacity-60" style={{ color: v.color }}>⭐</span>
                </div>

                {/* Records */}
                <div className="px-2.5 pb-2 space-y-1.5 max-h-[180px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                  {vRecords.length === 0 ? (
                    <div className="text-center py-3">
                      <div className="text-lg opacity-30">📝</div>
                      <div className="text-[9px] text-stone-400">還沒有紀錄</div>
                    </div>
                  ) : (
                    vRecords.map((r) => (
                      <RecordItem key={r.id} record={r} valueDef={v} onDelete={() => handleDelete(r.id)} />
                    ))
                  )}
                </div>
              </div>

              {/* ── Add button ── */}
              <div className="px-3 pb-3 relative z-10">
                <button
                  onClick={() => setFormValue(v)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:shadow-md active:scale-95"
                  style={{ backgroundColor: v.color }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  新增實踐紀錄
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Decorative bottom ── */}
      <div className="text-center mt-6 opacity-30">
        <span className="text-2xl">✏️ 📖 ✏️</span>
      </div>

      {/* ── Form Modal ── */}
      {formValue && (
        <PracticeForm
          valueDef={formValue}
          onSave={handleSave}
          onCancel={() => { setFormValue(null); setEditingRecord(null); }}
          initial={editingRecord ?? undefined}
        />
      )}
    </div>
  );
}
