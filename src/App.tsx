import React, { useState } from "react";
import PresentSimple from "./pages/PresentSimple";
import QuizPage from "./pages/QuizPage";
import VocabCards from "./pages/VocabCards";
import AuthPage from "./pages/AuthPage";
import ScoreHistoryPage from "./pages/ScoreHistoryPage";
import LinearEquations from "./pages/LinearEquations";
import QuadrantPage from "./pages/QuadrantPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SidebarSection, NavItem, cn } from "./components/ui/shared";

function AppContent() {
  const { user, isAuthenticated, logout, scores } = useAuth();
  const [activeAppId, setActiveAppId] = useState<string>("present-simple");
  const [openTabs, setOpenTabs] = useState<string[]>(["present-simple"]);

  // Show auth page if not logged in
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const openApp = (id: string) => {
    setOpenTabs((prev) => {
      if (!prev.includes(id)) return [...prev, id];
      return prev;
    });
    setActiveAppId(id);
  };

  const closeTab = (id: string) => {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      if (activeAppId === id) {
        setActiveAppId(next.length > 0 ? next[next.length - 1] : "present-simple");
      }
      return next;
    });
  };

  // Static navigation data for the English app
  const nav = {
    "Grammar Essentials": [
      { id: "present-simple", title: "現在簡單式 (Present Simple)" }
    ],
    "📚 單字卡 Vocab": [
      { id: "vocab-cards", title: "英文單字卡" }
    ],
    "🔢 數學練習": [
      { id: "linear-equations", title: "二元一次方程式" },
      { id: "quadrant", title: "象限座標挑戰" }
    ],
    "👤 會員專區": [
      { id: "score-history", title: "📊 考試成績" }
    ]
  };

  const labelFor = (id: string) => {
    if (id === "quiz.present-simple") return "測驗: 現在簡單式";
    if (id === "score-history") return "考試成績";
    for (const category in nav) {
      const item = nav[category as keyof typeof nav].find(i => i.id === id);
      if (item) return item.title;
    }
    return id;
  };

  const renderContent = () => {
    if (activeAppId === "present-simple") return <PresentSimple openApp={openApp} />;
    if (activeAppId === "vocab-cards") return <VocabCards />;
    if (activeAppId === "quiz.present-simple") return <QuizPage />;
    if (activeAppId === "score-history") return <ScoreHistoryPage />;
    if (activeAppId === "linear-equations") return <LinearEquations />;
    if (activeAppId === "quadrant") return <QuadrantPage />;
    return <div className="p-4 text-stone-500">Select a lesson from the sidebar.</div>;
  };

  // Calculate stats
  const totalExams = scores.length;
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length) : 0;

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-50 text-stone-900 font-sans selection:bg-blue-100 overflow-hidden">
      {/* Top Header */}
      <header className="h-14 flex items-center justify-between bg-white border-b border-zinc-200 px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button className="p-2 -ml-2 rounded-full text-zinc-500 hover:bg-zinc-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="text-lg font-bold tracking-tight text-blue-700" style={{ fontFamily: "cursive, sans-serif" }}>
            👑 國王的學習空間
          </div>
        </div>
        
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-stone-500">👋 歡迎，</span>
            <span className="font-semibold text-blue-700">{user?.username}</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-500">考試次數: <span className="font-semibold text-stone-700">{totalExams}</span></span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-500">平均: <span className="font-semibold text-stone-700">{avgScore}%</span></span>
          </div>
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg transition-colors"
          >
            登出
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-zinc-200 flex-shrink-0 flex flex-col py-2 justify-between">
          <div className="flex flex-col overflow-y-auto">
            {(Object.keys(nav) as Array<keyof typeof nav>).map((cat) => (
              <SidebarSection key={cat} title={cat}>
                <div className="space-y-1">
                  {nav[cat].map((item) => {
                    const active = activeAppId === item.id;
                    return (
                      <NavItem
                        key={item.id}
                        active={active}
                        label={item.title}
                        onClick={() => openApp(item.id)}
                      />
                    );
                  })}
                </div>
              </SidebarSection>
            ))}
          </div>

          <div className="mt-auto border-t border-zinc-200 opacity-95 hover:opacity-100 transition-opacity overflow-hidden bg-white">
            <img 
               src="/king.jpeg" 
               alt="Little Yuanbao King" 
               className="w-full aspect-square object-cover hover:scale-105 transition-transform origin-bottom"
               onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 flex flex-col">
          {/* Tabs */}
          <div className="flex w-full items-end gap-1 overflow-x-auto bg-zinc-100 px-4 pt-2 border-b border-zinc-200">
            {openTabs.map((tabId) => {
              const isActive = activeAppId === tabId;
              return (
                <div
                  key={tabId}
                  onClick={() => openApp(tabId)}
                  className={cn(
                    "group relative flex cursor-pointer items-center justify-between gap-3 px-4 py-2 text-sm transition-all border-t border-l border-r border-transparent rounded-t-md",
                    isActive
                      ? "bg-white text-blue-600 font-medium border-zinc-200 -mb-px pb-[9px]"
                      : "bg-transparent text-zinc-600 hover:bg-zinc-200/50"
                  )}
                >
                  <span className="truncate whitespace-nowrap">{labelFor(tabId)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tabId);
                    }}
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-zinc-200",
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

          <div className="flex-1 w-full px-6 py-4 flex flex-col min-h-0 bg-zinc-50">
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