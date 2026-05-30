import React, { useState, useCallback, useEffect } from "react";
import { Crown, Star, Heart, Handshake, Lightbulb, Users, Bell, BookOpen, CheckCircle2, WalletCards, ArrowRight, Plus, Trash2, ChevronDown, X } from "lucide-react";

// ── Types ──
interface PracticeRecord {
  id: string;
  valueKey: string;
  date: string;
  what: string;
  reflection: string;
  createdAt: number;
}

const STORAGE_KEY = "eng…smc";

function loadRecords(): PracticeRecord[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveRecords(records: PracticeRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ── Value Definitions ──
const values = [
  { key: "integrity", icon: Heart, title: "Integrity", zh: "誠信正直", color: "green" as const,
    story: "小元寶國王撿到一個錢包，想到不是自己的東西，所以主動還給失主。", scene: "wallet" },
  { key: "commitment", icon: Handshake, title: "Commitment", zh: "承諾", color: "blue" as const,
    story: "小元寶國王答應今天要完成閱讀筆記，最後專心寫完，說到做到。", scene: "study" },
  { key: "innovation", icon: Lightbulb, title: "Innovation", zh: "創新", color: "purple" as const,
    story: "小元寶國王發現積木車常常散開，想到用新方法讓它更穩固、更好玩。", scene: "idea" },
  { key: "trust", icon: Users, title: "Trust & Responsibility", zh: "信任與責任", color: "orange" as const,
    story: "小元寶國王看到朋友拿不動書，主動幫忙並整理好書本，讓大家放心信任他。", scene: "help" },
];

const theme = {
  green: {
    card: "border-green-200 bg-green-50/70",
    badge: "bg-green-500",
    text: "text-green-700",
    button: "bg-green-500 hover:bg-green-600",
    pocket: "bg-green-100 border-green-200",
  },
  blue: {
    card: "border-sky-200 bg-sky-50/70",
    badge: "bg-sky-500",
    text: "text-sky-700",
    button: "bg-sky-500 hover:bg-sky-600",
    pocket: "bg-sky-100 border-sky-200",
  },
  purple: {
    card: "border-purple-200 bg-purple-50/70",
    badge: "bg-purple-500",
    text: "text-purple-700",
    button: "bg-purple-500 hover:bg-purple-600",
    pocket: "bg-purple-100 border-purple-200",
  },
  orange: {
    card: "border-orange-200 bg-orange-50/70",
    badge: "bg-orange-500",
    text: "text-orange-700",
    button: "bg-orange-500 hover:bg-orange-600",
    pocket: "bg-orange-100 border-orange-200",
  },
};

// ── Mascot (CSS-drawn 小元寶國王) ──
function Mascot({ className = "", small = false }: { className?: string; small?: boolean }) {
  return (
    <div className={`relative mx-auto ${small ? "h-32 w-32" : "h-64 w-64"} ${className}`}>
      {/* Crown */}
      <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
        <div className={`${small ? "h-8 w-11" : "h-14 w-20"} rounded-t-2xl border-4 border-neutral-900 bg-yellow-300`}>
          <div className="flex h-full items-start justify-around pt-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`${small ? "h-2 w-2" : "h-3 w-3"} rounded-full bg-orange-400 ring-2 ring-neutral-900`} />
            ))}
          </div>
        </div>
      </div>
      {/* Head */}
      <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2">
        <div className={`${small ? "h-24 w-28" : "h-44 w-52"} rounded-[45%] border-4 border-neutral-900 bg-[#6b442f]`}>
          <div className="absolute left-1/2 top-8 -translate-x-1/2">
            <div className={`${small ? "h-14 w-24" : "h-28 w-44"} rounded-[46%] bg-[#fff3ee]`}>
              <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 rounded-b-full bg-white/90" />
              <div className="absolute left-3 top-7 flex gap-8">
                <span className={`${small ? "h-4 w-5" : "h-7 w-9"} rounded-full border-4 border-neutral-900 bg-sky-200`} />
                <span className={`${small ? "h-4 w-5" : "h-7 w-9"} rounded-full border-4 border-neutral-900 bg-sky-200`} />
              </div>
              <div className="absolute left-5 top-14 h-3 w-8 rounded-full bg-pink-200/80" />
              <div className="absolute right-5 top-14 h-3 w-8 rounded-full bg-pink-200/80" />
              <div className="absolute left-1/2 top-16 h-4 w-8 -translate-x-1/2 rounded-b-full border-b-4 border-neutral-900" />
            </div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2">
        <div className={`${small ? "h-20 w-32" : "h-32 w-52"} rounded-[34px] border-4 border-neutral-900 bg-amber-100 shadow-sm`}>
          <div className="mx-auto h-full w-1/3 bg-yellow-300" />
        </div>
      </div>
    </div>
  );
}

// ── Scene Illustration ──
function Scene({ type, color }: { type: string; color: keyof typeof theme }) {
  const t = theme[color];
  return (
    <div className="relative mx-auto mt-4 h-36 max-w-[260px] overflow-hidden rounded-3xl bg-white/65 p-3 shadow-inner">
      <div className="absolute inset-x-0 bottom-0 h-12 rounded-t-[100%] bg-green-200/70" />
      <Mascot small className="scale-75" />
      {type === "wallet" && <WalletCards className="absolute right-9 top-12 h-10 w-10 rounded-full bg-amber-100 p-2 text-amber-700 shadow" />}
      {type === "study" && <BookOpen className="absolute right-7 top-16 h-12 w-12 rounded-full bg-white p-2 text-sky-700 shadow" />}
      {type === "idea" && <Lightbulb className="absolute right-8 top-8 h-12 w-12 rounded-full bg-yellow-100 p-2 text-yellow-600 shadow" />}
      {type === "help" && (
        <div className="absolute right-5 top-12 rounded-2xl bg-white p-3 shadow">
          <BookOpen className="h-9 w-9 text-orange-600" />
        </div>
      )}
      <Star className={`absolute left-5 top-6 h-5 w-5 ${t.text}`} />
    </div>
  );
}

// ── Value Card ──
function ValueCard({ item }: { item: typeof values[number] }) {
  const Icon = item.icon;
  const t = theme[item.color];
  return (
    <article className={`rounded-[28px] border-2 ${t.card} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
      <div className="flex items-start gap-3">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-white ${t.badge} shadow-sm`}>
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h3 className={`text-2xl font-black leading-tight ${t.text}`}>{item.title}</h3>
          <p className={`text-xl font-black ${t.text}`}>{item.zh}</p>
        </div>
      </div>
      <div className="my-3 border-t-2 border-dashed border-current opacity-20" />
      <Scene type={item.scene} color={item.color} />
      <p className="mx-auto mt-4 min-h-[72px] max-w-[260px] text-center text-base font-semibold leading-7 text-neutral-700">
        {item.story}
      </p>
      <button className={`mx-auto mt-4 flex items-center gap-2 rounded-full px-6 py-2 text-sm font-bold text-white ${t.button}`}>
        查看更多 <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}

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
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 ${t.card}`}>
          <div className="flex items-center gap-3">
            <div className={`grid h-10 w-10 place-items-center rounded-full text-white ${t.badge} shadow-sm`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className={`text-lg font-black ${t.text}`}>{valueItem.zh}</div>
              <div className="text-xs font-semibold text-neutral-500">{valueItem.title}</div>
            </div>
          </div>
          <button onClick={onCancel} className="rounded-full p-1 hover:bg-white/50"><X className="h-5 w-5 text-neutral-400" /></button>
        </div>

        {/* Form */}
        <div className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1 block text-sm font-bold text-neutral-700">📅 日期</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border-2 border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-neutral-700">✏️ 我做了什麼？</label>
            <textarea value={what} onChange={(e) => setWhat(e.target.value)} rows={3}
              placeholder={`今天我在「${valueItem.zh}」方面做了...`}
              className="w-full rounded-xl border-2 border-neutral-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-neutral-700">🪞 我的心得與反思</label>
            <textarea value={reflection} onChange={(e) => setReflection(e.target.value)} rows={3}
              placeholder="我學到了... 我覺得..."
              className="w-full rounded-xl border-2 border-neutral-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-neutral-100 px-5 py-4">
          <button onClick={onCancel}
            className="rounded-xl px-4 py-2 text-sm font-bold text-neutral-500 hover:bg-neutral-100">取消</button>
          <button onClick={() => { if (!what.trim()) return; onSave({ valueKey: valueItem.key, date, what: what.trim(), reflection: reflection.trim() }); }}
            className={`flex items-center gap-1.5 rounded-xl px-5 py-2 text-sm font-bold text-white ${t.button} shadow-sm`}>
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
  const Icon = values.find(v => v.key === record.valueKey)?.icon ?? Star;

  return (
    <div className="overflow-hidden rounded-xl bg-white/80 shadow-sm">
      <div className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2 min-w-0">
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${t.badge}`}>
            {record.date.slice(5)}
          </span>
          <span className="truncate text-xs font-semibold text-neutral-700">
            {record.what.slice(0, 22)}{record.what.length > 22 ? "..." : ""}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {open && (
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="rounded-full p-0.5 text-neutral-400 hover:text-red-500">
              <Trash2 className="h-3 w-3" />
            </button>
          )}
          <ChevronDown className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </div>
      {open && (
        <div className="space-y-1.5 border-t border-dashed border-neutral-200 px-3 pb-2.5 pt-2">
          <div>
            <div className="text-[10px] font-bold text-neutral-500">✏️ 實踐內容</div>
            <div className="text-xs leading-relaxed text-neutral-700 whitespace-pre-wrap">{record.what}</div>
          </div>
          {record.reflection && (
            <div>
              <div className="text-[10px] font-bold text-neutral-500">🪞 心得反思</div>
              <div className="text-xs leading-relaxed italic text-neutral-600 whitespace-pre-wrap">{record.reflection}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Pocket with Records ──
function PocketWithRecords({
  item,
  records,
  onAdd,
  onDelete,
}: {
  item: typeof values[number];
  records: PracticeRecord[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  const Icon = item.icon;
  const t = theme[item.color];
  return (
    <div className="relative min-w-[210px]">
      {/* Card sticking out */}
      <div className="absolute left-6 right-6 top-0 h-20 rounded-2xl border-2 border-dashed border-white/80 bg-white shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 text-sm text-neutral-500">
          <Icon className={`h-5 w-5 ${t.text}`} />
          <span className="border-b-2 border-dashed border-neutral-300 px-10" />
        </div>
      </div>
      {/* Pocket body */}
      <div className={`mt-14 rounded-[24px] border-2 border-dashed ${t.pocket} p-4 shadow-md`}>
        <div className="mb-2 flex items-center justify-center gap-3 text-lg font-black">
          <Star className={`h-6 w-6 ${t.text}`} />
          <span className={t.text}>{item.zh}</span>
        </div>
        {/* Records list */}
        <div className="space-y-1.5 max-h-[160px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
          {records.length === 0 ? (
            <div className="py-3 text-center">
              <div className="text-lg opacity-30">📝</div>
              <div className="text-[10px] text-neutral-400">還沒有紀錄</div>
            </div>
          ) : (
            records.map((r) => (
              <RecordItem key={r.id} record={r} colorKey={item.color} onDelete={() => onDelete(r.id)} />
            ))
          )}
        </div>
        {/* Add button */}
        <button onClick={onAdd}
          className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-bold text-white ${t.button} shadow-sm`}>
          <Plus className="h-3.5 w-3.5" /> 新增實踐紀錄
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──
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

  const totalRecords = records.length;

  return (
    <div className="min-h-full bg-[#fff8ea] text-neutral-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-50 to-[#fff3cc] px-4 pb-6 pt-8 sm:px-6">
        <div className="absolute -bottom-10 left-0 h-32 w-80 rounded-t-full bg-green-200/70" />
        <div className="absolute -bottom-8 right-0 h-28 w-96 rounded-t-full bg-green-200/70" />
        <Star className="absolute left-[18%] top-8 h-7 w-7 fill-amber-300 text-amber-400" />
        <Star className="absolute right-[26%] top-12 h-6 w-6 fill-amber-200 text-amber-400" />
        <div className="relative mx-auto grid max-w-4xl items-center gap-4 sm:grid-cols-[1fr_200px]">
          <div className="text-center sm:text-left">
            <div className="mb-3 flex justify-center gap-3 text-5xl font-black tracking-wider sm:justify-start sm:text-6xl md:text-7xl">
              <span className="text-[#0e4b7d] drop-shadow-sm">前進</span>
              <span className="text-[#d95732] drop-shadow-sm">台積</span>
            </div>
            <div className="mx-auto mb-3 w-fit rounded-full border-2 border-amber-300 bg-white/70 px-6 py-1.5 text-xl font-black text-[#5b3c25] sm:mx-0 md:text-2xl">
              ── 實踐紀錄 ──
            </div>
            <p className="text-lg font-bold text-[#5b3c25] md:text-xl">和小元寶國王一起學習價值與行動 ♡</p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-200/60 px-4 py-1 text-sm font-bold text-amber-800">
              <Star className="h-4 w-4 fill-amber-400" /> 已記錄 {totalRecords} 筆
            </div>
          </div>
          <Mascot className="hidden sm:block" />
        </div>
      </section>

      {/* Value Cards */}
      <div className="bg-[#fffaf0] p-4 sm:p-6">
        <section className="grid gap-4 lg:grid-cols-4">
          {values.map((item) => <ValueCard key={item.key} item={item} />)}
        </section>
      </div>

      {/* My Record Cards Section */}
      <div className="bg-[#fffaf0] px-4 pb-6 sm:px-6">
        <section className="rounded-[28px] border-2 border-amber-200 bg-white/70 p-5 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <div className="flex items-center gap-4 lg:block">
              <Star className="h-9 w-9 fill-amber-300 text-amber-400 lg:mb-3" />
              <div>
                <h2 className="text-2xl font-black text-[#6b4b28] lg:text-3xl">我的紀錄卡</h2>
                <p className="mt-2 text-sm font-semibold text-neutral-600 lg:text-base">記錄每天的行動，累積成長的力量！</p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {values.map((item) => (
                <PocketWithRecords
                  key={item.key}
                  item={item}
                  records={records.filter(r => r.valueKey === item.key).sort((a, b) => b.createdAt - a.createdAt)}
                  onAdd={() => setFormValue(item)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-200 bg-amber-50 px-4 py-3 text-xs font-bold text-[#7a552f] sm:px-6 sm:text-sm">
        <span className="flex items-center gap-2"><Crown className="h-4 w-4" /> 小小行動・大大影響 ♡</span>
        <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-300 text-amber-400" /> 持續練習，成為更好的自己！</span>
      </div>

      {/* Form Modal */}
      {formValue && (
        <RecordForm
          valueItem={formValue}
          onSave={handleSave}
          onCancel={() => setFormValue(null)}
        />
      )}
    </div>
  );
}
