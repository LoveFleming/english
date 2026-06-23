import React, { useState } from "react";
import PresentSimple from "./pages/PresentSimple";
import QuizPage from "./pages/QuizPage";
import AuthPage from "./pages/AuthPage";
import ScoreHistoryPage from "./pages/ScoreHistoryPage";
import LearningReport from "./pages/LearningReport";
import LinearEquations from "./pages/LinearEquations";
import QuadrantPage from "./pages/QuadrantPage";
import PrepositionalPhrases from "./pages/PrepositionalPhrases";
import PrepositionalPhrasesQuiz from "./pages/PrepositionalPhrasesQuiz";
import PresentContinuous from "./pages/PresentContinuous";
import PresentContinuousQuiz from "./pages/PresentContinuousQuiz";
import Pronouns from "./pages/Pronouns";
import PronounsQuiz from "./pages/PronounsQuiz";
import DixonPhrasalVerbs from "./pages/DixonPhrasalVerbs";
import Lesson3 from "./pages/Lesson3";
import Lesson3Quiz from "./pages/Lesson3Quiz";
import LinearEquationsGraph from "./pages/LinearEquationsGraph";
import RatioAndProportion from "./pages/RatioAndProportion";
import RatioAndProportionQuiz from "./pages/RatioAndProportionQuiz";
import DirectInverseProportion from "./pages/DirectInverseProportion";
import DirectInverseProportionQuiz from "./pages/DirectInverseProportionQuiz";
import MidtermSprint from "./pages/MidtermSprint";
import Quantifiers from "./pages/Quantifiers";
import QuantifiersQuiz from "./pages/QuantifiersQuiz";
import MeasureWords from "./pages/MeasureWords";
import MeasureWordsQuiz from "./pages/MeasureWordsQuiz";
import HowMuchMany from "./pages/HowMuchMany";
import HowMuchManyQuiz from "./pages/HowMuchManyQuiz";
import CompoundWords from "./pages/CompoundWords";
import CompoundWordsQuiz from "./pages/CompoundWordsQuiz";
import TsmcPractice from "./pages/TsmcPractice";
import PastTense from "./pages/PastTense";
import PastTenseQuiz from "./pages/PastTenseQuiz";
import StatisticsCharts from "./pages/StatisticsCharts";
import StatisticsChartsQuiz from "./pages/StatisticsChartsQuiz";
import AuxiliaryBeVerbs from "./pages/AuxiliaryBeVerbs";
import AuxiliaryBeVerbsQuiz from "./pages/AuxiliaryBeVerbsQuiz";
import IrregularVerbs from "./pages/IrregularVerbs";
import IrregularVerbsQuiz from "./pages/IrregularVerbsQuiz";
import GeographyNotes from "./pages/GeographyNotes";
import ClassicalChinese from "./pages/ClassicalChinese";
import ClassicalChineseQuiz from "./pages/ClassicalChineseQuiz";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SidebarSection, NavItem, cn } from "./components/ui/shared";

function AppContent() {
  const { user, isAuthenticated, logout, scores } = useAuth();
  const [activeAppId, setActiveAppId] = useState<string>("tsmc-practice");
  const [openTabs, setOpenTabs] = useState<string[]>(["tsmc-practice"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) return <AuthPage />;

  const openApp = (id: string) => {
    setOpenTabs((prev) => prev.includes(id) ? prev : [...prev, id]);
    setActiveAppId(id);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const closeTab = (id: string) => {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      if (activeAppId === id) setActiveAppId(next.length > 0 ? next[next.length - 1] : "tsmc-practice");
      return next;
    });
  };

  const nav: Record<string, { id: string; title: string }[]> = {
    "⏰ 時態 Tense": [
      { id: "present-simple", title: "現在簡單式" },
      { id: "present-continuous", title: "現在進行式" },
      { id: "past-tense", title: "動詞過去式" },
      { id: "irregular-verbs", title: "不規則動詞" },
    ],
    "📝 片語 Phrases": [
      { id: "prep-phrases", title: "介系詞片語" },
      { id: "dixon-verbs", title: "狄克森動詞片語" },
    ],
    "🔤 文法 Grammar": [
      { id: "auxiliary-be", title: "助動詞 & Be 動詞" },
      { id: "pronouns", title: "代名詞全攻略" },
      { id: "quantifiers", title: "數量形容詞" },
      { id: "measure-words", title: "計量單位" },
      { id: "how-much-many", title: "How Much/Many" },
    ],
    "🔢 數學 Math": [
      { id: "linear-equations", title: "二元一次方程式" },
      { id: "linear-equations-graph", title: "方程式圖形解說" },
      { id: "quadrant", title: "象限座標挑戰" },
      { id: "ratio-proportion", title: "3-1 比與比例式" },
      { id: "direct-inverse-proportion", title: "3-2 正比與反比" },
      { id: "midterm-sprint", title: "🔥 7下期中考衝刺" },
      { id: "statistics-charts", title: "5-1 統計圖表" },
    ],
    "🌍 地理 Geography": [
      { id: "geo-notes", title: "地理錯題本" },
    ],
    "🇨🇳 國文 Chinese": [
      { id: "compound-words", title: "複詞三兄弟" },
      { id: "classical-chinese", title: "文言文字義比較" },
    ],
    "📚 課程 Lessons": [
      { id: "lesson3", title: "7下 Lesson 3" },
    ],
    "👤 會員": [
      { id: "score-history", title: "📊 考試成績" },
      { id: "learning-report", title: "🤖 AI 學習報告" },
    ],
  };

  const labelFor = (id: string) => {
    if (id === "quiz.present-simple") return "測驗: 現在簡單式";
    if (id === "quiz.prep-phrases") return "測驗: 介系詞片語";
    if (id === "quiz.present-continuous") return "測驗: 現在進行式";
    if (id === "quiz.dixon-verbs") return "測驗: 狄克森動詞片語";
    if (id === "quiz.lesson3") return "測驗: 7下 Lesson 3";
    if (id === "quiz.pronouns") return "測驗: 代名詞全攻略";
    if (id === "quiz.quantifiers") return "測驗: 數量形容詞";
    if (id === "quiz.measure-words") return "測驗: 計量單位";
    if (id === "quiz.how-much-many") return "測驗: How Much/Many";
    if (id === "quiz.compound-words") return "測驗: 複詞三兄弟";
    if (id === "classical-chinese") return "文言文字義比較";
    if (id === "quiz.classical-chinese") return "測驗: 文言文字義比較";
    if (id === "quiz.past-tense") return "測驗: 動詞過去式";
    if (id === "statistics-charts") return "5-1 統計圖表";
    if (id === "quiz.auxiliary-be") return "測驗: 助動詞 & Be 動詞";
    if (id === "geo-notes") return "地理錯題本";
    if (id === "irregular-verbs") return "不規則動詞";
    if (id === "quiz.irregular-verbs") return "測驗: 不規則動詞";
    if (id === "auxiliary-be") return "助動詞 & Be 動詞";
    if (id === "quiz.statistics-charts") return "測驗: 5-1 統計圖表";
    if (id === "dixon-verbs") return "狄克森動詞片語";
    if (id === "tsmc-practice") return "前進台積";
    for (const category in nav) {
      const item = nav[category].find(i => i.id === id);
      if (item) return item.title;
    }
    return id;
  };

  const renderContent = () => {
    switch (activeAppId) {
      case "present-simple": return <PresentSimple openApp={openApp} />;
      case "quiz.present-simple": return <QuizPage />;
      case "score-history": return <ScoreHistoryPage />;
      case "learning-report": return <LearningReport />;
      case "linear-equations": return <LinearEquations />;
      case "linear-equations-graph": return <LinearEquationsGraph />;
      case "quadrant": return <QuadrantPage />;
      case "prep-phrases": return <PrepositionalPhrases openApp={openApp} />;
      case "quiz.prep-phrases": return <PrepositionalPhrasesQuiz />;
      case "present-continuous": return <PresentContinuous openApp={openApp} />;
      case "quiz.present-continuous": return <PresentContinuousQuiz />;
      case "dixon-verbs": return <DixonPhrasalVerbs openApp={openApp} />;
      case "lesson3": return <Lesson3 openApp={openApp} />;
      case "quiz.lesson3": return <Lesson3Quiz />;
      case "pronouns": return <Pronouns openApp={openApp} />;
      case "quiz.pronouns": return <PronounsQuiz />;
      case "quantifiers": return <Quantifiers openApp={openApp} />;
      case "quiz.quantifiers": return <QuantifiersQuiz />;
      case "measure-words": return <MeasureWords openApp={openApp} />;
      case "quiz.measure-words": return <MeasureWordsQuiz />;
      case "how-much-many": return <HowMuchMany openApp={openApp} />;
      case "quiz.how-much-many": return <HowMuchManyQuiz />;
      case "compound-words": return <CompoundWords openApp={openApp} />;
      case "quiz.compound-words": return <CompoundWordsQuiz />;
      case "classical-chinese": return <ClassicalChinese openApp={openApp} />;
      case "quiz.classical-chinese": return <ClassicalChineseQuiz />;
      case "past-tense": return <PastTense openApp={openApp} />;
      case "quiz.past-tense": return <PastTenseQuiz />;
      case "ratio-proportion": return <RatioAndProportion openApp={openApp} />;
      case "quiz.ratio-proportion": return <RatioAndProportionQuiz />;
      case "direct-inverse-proportion": return <DirectInverseProportion openApp={openApp} />;
      case "quiz.direct-inverse-proportion": return <DirectInverseProportionQuiz />;
      case "midterm-sprint": return <MidtermSprint />;
      case "geo-notes": return <GeographyNotes />;
      case "irregular-verbs": return <IrregularVerbs openApp={openApp} />;
      case "quiz.irregular-verbs": return <IrregularVerbsQuiz />;
      case "auxiliary-be": return <AuxiliaryBeVerbs openApp={openApp} />;
      case "quiz.auxiliary-be": return <AuxiliaryBeVerbsQuiz />;
      case "statistics-charts": return <StatisticsCharts openApp={openApp} />;
      case "quiz.statistics-charts": return <StatisticsChartsQuiz />;
      case "tsmc-practice": return <TsmcPractice />;
      default: return <div className="p-4 text-stone-500">Select a lesson from the sidebar.</div>;
    }
  };

  const totalExams = scores.length;
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length) : 0;

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-50 text-stone-900 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-12 sm:h-14 flex items-center justify-between bg-white border-b border-zinc-200 px-3 sm:px-4 shrink-0 shadow-sm z-30">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 -ml-1 rounded-lg text-zinc-500 hover:bg-zinc-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <button
            onClick={() => openApp("tsmc-practice")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-base sm:text-lg font-bold tracking-tight text-blue-700" style={{ fontFamily: "cursive, sans-serif" }}>
              👑 國王的學習空間
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-stone-500">👋 歡迎，</span>
            <span className="font-semibold text-blue-700">{user?.username}</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-500">考試: <span className="font-semibold">{totalExams}</span></span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-500">平均: <span className="font-semibold">{avgScore}%</span></span>
          </div>
          {/* Mobile: show username only */}
          <span className="sm:hidden text-sm font-semibold text-blue-700">{user?.username}</span>
          <button onClick={logout} className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg transition-colors">
            登出
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 sm:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={cn(
          "fixed sm:relative inset-y-0 left-0 z-20 sm:z-0 w-64 bg-white border-r border-zinc-200 flex-shrink-0 flex flex-col py-2 transition-transform duration-200 sm:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        )}>
          <div className="flex-1 flex flex-col overflow-y-auto pt-10 sm:pt-0">
            {(Object.keys(nav) as string[]).map((cat) => (
              <SidebarSection key={cat} title={cat}>
                <div className="space-y-1">
                  {nav[cat].map((item) => (
                    <NavItem
                      key={item.id}
                      active={activeAppId === item.id}
                      label={item.title}
                      onClick={() => openApp(item.id)}
                    />
                  ))}
                </div>
              </SidebarSection>
            ))}
          </div>

          <div className="mt-auto border-t border-zinc-200 opacity-95 hover:opacity-100 transition-opacity overflow-hidden bg-white hidden sm:block">
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 flex flex-col min-w-0">
          {/* Tabs - scrollable on mobile */}
          <div className="flex w-full items-end gap-0.5 overflow-x-auto bg-zinc-100 px-2 pt-2 border-b border-zinc-200" style={{ scrollbarWidth: 'none' }}>
            {openTabs.map((tabId) => {
              const isActive = activeAppId === tabId;
              return (
                <div
                  key={tabId}
                  onClick={() => openApp(tabId)}
                  className={cn(
                    "group relative flex cursor-pointer items-center justify-between gap-1 px-3 py-2 text-xs transition-all border-t border-l border-r border-transparent rounded-t-md whitespace-nowrap shrink-0",
                    isActive
                      ? "bg-white text-blue-600 font-medium border-zinc-200 -mb-px pb-[9px]"
                      : "bg-transparent text-zinc-600 hover:bg-zinc-200/50"
                  )}
                >
                  <span className="truncate">{labelFor(tabId)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); closeTab(tabId); }}
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full hover:bg-zinc-200",
                      isActive ? "text-zinc-400 hover:text-red-500" : "text-zinc-400 opacity-0 group-hover:opacity-100 hover:text-red-500"
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex-1 w-full px-0 py-0 flex flex-col min-h-0 bg-zinc-50 overflow-y-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
