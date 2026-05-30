import React, { useState, useCallback, useEffect } from "react";
import { Star, Heart, Handshake, Lightbulb, Users, CheckCircle2, Plus, Trash2, ChevronDown, X } from "lucide-react";

// ── Types ──
interface PracticeRecord {
  id: string;
  valueKey: string;
  date: string;
  what: string;
  reflection: string;
  createdAt: number;
}

const STORAGE_KEY = "***";

function loadRecords(): PracticeRecord[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveRecords(records: PracticeRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ── Value Definitions ──
const values = [
  { key: "integrity", icon: Heart, title: "Integrity", zh: "誠信正直", color: "green" as const, image: "/integrity.png" },
  { key: "commitment", icon: Handshake, title: "Commitment", zh: "承諾", color: "blue" as const, image: "/commitment.png" },
  { key: "innovation", icon: Lightbulb, title: "Innovation", zh: "創新", color: "purple" as const, image: "/innovation.png" },
  { key: "trust", icon: Users, title: "Trust & Responsibility", zh: "信任與責任", color: "orange" as const, image: "/trust.png" },
];

const theme = {
  green: { badge: "bg-green-500", text: "text-green-700", button: "bg-green-500 hover:bg-green-600", pocket: "bg-green-100 border-green-200" },
  blue: { badge: "bg-sky-500", text: "text-sky-700", button: "bg-sky-500 hover:bg-sky-600", pocket: "bg-sky-100 border-sky-200" },
  purple: { badge: "bg-purple-500", text: "text-purple-700", button: "bg-purple-500 hover:bg-purple-600", pocket: "bg-purple-100 border-purple-200" },
  orange: { badge: "bg-orange-500", text: "text-orange-700", button: "bg-orange-500 hover:bg-orange-600", pocket: "bg-orange-100 border-orange-200" },
};

// ── Record Form Modal ──
function RecordForm({
  valueItem,
  onSave,
  onCancel,
}: {
  valueItem: typeof values[number];
  onSave: (r: Omit<PracticeRecord, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [what, setWhat] = useState("");
  const [reflection, setReflection] = useState("");
  const t = theme[valueItem.color];
  const Icon = valueItem.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={onCancel}>
      <div className="w-full max-w-md overflow-hidden rounded-[24px] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className={`flex items-center justify-between px-5 py-3 ${t.pocket}`}>
          <div className="flex items-center gap-3">
            <div className={`grid h-9 w-9 place-items-center rounded-full text-white ${t.badge} shadow-sm`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className={`text-base font-black ${t.text}`}>{valueItem.zh}</div>
              <div className="text-[10px] font-semibold text-neutral-500">{valueItem.title}</div>
            </div>
          </div>
          <button onClick={onCancel} className="rounded-full p-1 hover:bg-white/50"><X className="h-4 w-4 text-neutral-400" /></button>
        </div>
        <div className="space-y-3 px-5 py-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-700">📅 日期</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border-2 border-neutral-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-700">✏️ 我做了什麼？</label>
            <textarea value={what} onChange={(e) => setWhat(e.target.value)} rows={2}
              placeholder={`今天我在「${valueItem.zh}」方面做了...`}
              className="w-full rounded-lg border-2 border-neutral-200 px-3 py-1.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-neutral-700">🪞 我的心得與反思</label>
            <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} rows={2}
              placeholder="我學到了... 我覺得..."
              className="w-full rounded-lg border-2 border-neutral-200 px-3 py-1.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-neutral-100 px-5 py-3">
          <button onClick={onCancel} className="rounded-lg px-4 py-1.5 text-sm font-bold text-neutral-500 hover:bg-neutral-100">取消</button>
          <button onClick={() => { if (!what.trim()) return; onSave({ valueKey: valueItem.key, date, what: what.trim(), reflection: reflection.trim() }); }}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-bold text-white ${t.button}`}>
            <CheckCircle2 className="h-4 w-4" /> 寫好了！
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Record Item ──
function RecordItem({ record, colorKey, onDelete }: { record: PracticeRecord; colorKey: keyof typeof theme; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const t = theme[colorKey];

  return (
    <div className="overflow-hidden rounded-lg bg-white/80 shadow-sm">
      <div className="flex cursor-pointer items-center justify-between gap-1 px-2 py-1.5" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white ${t.badge}`}>
            {record.date.slice(5)}
          </span>
          <span className="truncate text-[10px] font-semibold text-neutral-700">
            {record.what.slice(0, 18)}{record.what.length > 18 ? "..." : ""}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          {open && (
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="rounded-full p-0.5 text-neutral-400 hover:text-red-500"><Trash2 className="h-2.5 w-2.5" /></button>
          )}
          <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </div>
      {open && (
        <div className="space-y-1 border-t border-dashed border-neutral-200 px-2 pb-2 pt-1.5">
          <div className="text-[9px] font-bold text-neutral-500">✏️ {record.what}</div>
          {record.reflection && <div className="text-[9px] italic text-neutral-600">🪞 {record.reflection}</div>}
        </div>
      )}
    </div>
  );
}

// ── Main Page (single screen, no scroll) ──
export default function TsmcPractice() {
  const [records, setRecords] = useState<PracticeRecord[]>(loadRecords);
  const [formValue, setFormValue] = useState<typeof values[number] | null>(null);

  useEffect(() => { saveRecords(records); }, [records]);

  const handleSave = useCallback((data: Omit<PracticeRecord, "id" | "createdAt">) => {
    setRecords(prev => [
      { ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: Date.now() },
      ...prev,
    ]);
    setFormValue(null);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  }, []);

  return (
    <div className="flex h-full flex-col bg-[#fff8ea] overflow-hidden">
      {/* ── Banner ── */}
      <div className="shrink-0">
        <img src="/banner.png" alt="前進台積 實踐紀錄" className="w-full object-cover" style={{ maxHeight: "30vh" }} />
      </div>

      {/* ── Four value columns ── */}
      <div className="flex flex-1 min-h-0 gap-3 p-3">
        {values.map((item) => {
          const Icon = item.icon;
          const t = theme[item.color];
          const vRecords = records.filter(r => r.valueKey === item.key).sort((a, b) => b.createdAt - a.createdAt);

          return (
            <div key={item.key} className="flex flex-1 flex-col overflow-hidden rounded-2xl shadow-md">
              {/* Value image */}
              <div className="shrink-0">
                <img src={item.image} alt={item.zh} className="w-full object-cover" style={{ maxHeight: "28vh" }} />
              </div>

              {/* Pocket area */}
              <div className={`flex flex-1 min-h-0 flex-col border-2 border-dashed ${t.pocket} rounded-b-2xl p-2`}>
                {/* Pocket header */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`h-4 w-4 ${t.text}`} />
                    <span className={`text-xs font-black ${t.text}`}>{item.zh}</span>
                    <span className="text-[9px] text-neutral-400">({vRecords.length})</span>
                  </div>
                  <button onClick={() => setFormValue(item)}
                    className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${t.button}`}>
                    <Plus className="h-3 w-3" />紀錄
                  </button>
                </div>

                {/* Records */}
                <div className="flex-1 min-h-0 space-y-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                  {vRecords.length === 0 ? (
                    <div className="py-2 text-center text-[9px] text-neutral-400">還沒有紀錄</div>
                  ) : (
                    vRecords.map((r) => (
                      <RecordItem key={r.id} record={r} colorKey={item.color} onDelete={() => handleDelete(r.id)} />
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="shrink-0 flex items-center justify-center gap-2 border-t border-amber-200 bg-amber-50 px-4 py-1.5 text-[10px] font-bold text-[#7a552f]">
        <span>小小行動・大大影響 ♡</span>
        <span className="text-amber-300">|</span>
        <span>持續練習，成為更好的自己！</span>
        <span className="text-amber-300">|</span>
        <span>已記錄 {records.length} 筆</span>
      </div>

      {/* ── Form Modal ── */}
      {formValue && (
        <RecordForm valueItem={formValue} onSave={handleSave} onCancel={() => setFormValue(null)} />
      )}
    </div>
  );
}
