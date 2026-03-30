import React, { useState } from "react";
import { Card } from "../components/ui/shared";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";
import quizDataRaw from "../data/simple_sentence/quiz_data.json";

type QuizItemScrubbed = {
  id: string;
  question: string;
  options: string[];
  status: "success" | "fail" | "untest";
};

type GradedItem = {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
};

export default function QuizPage() {
  const { isAuthenticated, saveScore, user } = useAuth();
  const [phase, setPhase] = useState<"setup" | "loading" | "active" | "result" | "error">("loading");
  
  // Setup state
  const [allQuestions, setAllQuestions] = useState<QuizItemScrubbed[]>([]);
  const [poolFilter, setPoolFilter] = useState<"all" | "success" | "fail">("all");
  const [questionCount, setQuestionCount] = useState<number>(10);
  
  // Active state
  const [items, setItems] = useState<QuizItemScrubbed[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Result state
  const [score, setScore] = useState(0);
  const [gradedResults, setGradedResults] = useState<GradedItem[]>([]);

  // Load quiz data from bundled JSON
  const loadQuestions = () => {
    const data: QuizItemScrubbed[] = (quizDataRaw as any[]).map(item => ({
      id: item.id,
      question: item.question,
      options: item.options,
      status: item.status || "untest",
    }));
    setAllQuestions(data);
    setPhase("setup");
  };

  // Initial load
  if (phase === "loading") {
    // Use setTimeout to set state after first render
    setTimeout(() => loadQuestions(), 0);
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const imported = JSON.parse(content);
        // Validate and load imported data
        const data: QuizItemScrubbed[] = imported.map((item: any) => ({
          id: item.id,
          question: item.question,
          options: item.options,
          status: item.status || "untest",
        }));
        setAllQuestions(data);
        alert("Quiz data imported successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to import. Ensure the file is a valid JSON quiz data file.");
      }
    };
    reader.readAsText(file);
  };

  const totalSuccess = allQuestions.filter(i => i.status === "success").length;
  const totalFail = allQuestions.filter(i => i.status === "fail").length;
  const totalAttempted = totalSuccess + totalFail;
  const successRate = totalAttempted > 0 ? Math.round((totalSuccess / totalAttempted) * 100) : 0;

  const handleStartQuiz = () => {
    let pool = [...allQuestions];
    if (poolFilter === "success") {
      pool = pool.filter(item => item.status === "success");
    } else if (poolFilter === "fail") {
      pool = pool.filter(item => item.status === "fail");
    }

    pool.sort(() => Math.random() - 0.5);
    const selectedItems = pool.slice(0, questionCount);
    
    if (selectedItems.length === 0) {
      alert("No questions found for the selected filter!");
      return;
    }

    setItems(selectedItems);
    setCurrentIndex(0);
    setAnswers({});
    setPhase("active");
  };

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [items[currentIndex].id]: option });
  };

  const submitQuiz = () => {
    // Grade locally using quiz data
    const graded: GradedItem[] = items.map(item => {
      const rawItem = (quizDataRaw as any[]).find(q => q.id === item.id);
      const correctAnswer = rawItem?.correctAnswer || "";
      const userAnswer = answers[item.id] || "";
      return {
        id: item.id,
        question: item.question,
        userAnswer,
        correctAnswer,
        explanation: rawItem?.explanation || "",
        isCorrect: userAnswer === correctAnswer,
      };
    });

    const correctCount = graded.filter(g => g.isCorrect).length;
    const scorePct = Math.round((correctCount / graded.length) * 100);
    setScore(scorePct);
    setGradedResults(graded);
    setPhase("result");

    // Save score to user history if logged in
    if (isAuthenticated && user) {
      const wrongQuestions: WrongQuestion[] = graded
        .filter(item => !item.isCorrect)
        .map(item => ({
          id: item.id,
          question: item.question,
          userAnswer: item.userAnswer,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation,
        }));

      const examScore: ExamScore = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        score: scorePct,
        totalQuestions: items.length,
        correctAnswers: correctCount,
        wrongAnswers: wrongQuestions.length,
        wrongQuestions,
      };
      saveScore(examScore);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuiz();
    }
  };

  const handleRetryFailedInRun = () => {
    const failedIds = gradedResults.filter(g => !g.isCorrect).map(g => g.id);
    const failedItems = items.filter(i => failedIds.includes(i.id));
    if (failedItems.length > 0) {
      setItems(failedItems);
      setCurrentIndex(0);
      setAnswers({});
      setPhase("active");
    }
  };

  const handleReturnToSetup = () => {
    loadQuestions(); // Reload quiz data
  };

  if (phase === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500 w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold">Error loading quiz data.</h2>
        <button onClick={loadQuestions} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
      </div>
    );
  }

  if (phase === "setup") {
    const availSuccess = allQuestions.filter(i => i.status === "success").length;
    const availFail = allQuestions.filter(i => i.status === "fail").length;
    const availAll = allQuestions.length;

    return (
      <div className="max-w-5xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center justify-between border-b pb-4 border-zinc-200">
            <h1 className="text-3xl font-bold text-stone-900">Quiz Dashboard</h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  const blob = new Blob([JSON.stringify(quizDataRaw, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'quiz_data.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-stone-100 text-stone-700 font-bold rounded-lg border border-stone-200 shadow-sm hover:bg-stone-200 transition-colors flex items-center gap-2 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                Export JSON
              </button>
              <div className="relative">
                <input type="file" accept=".json" id="file-import" className="hidden" onChange={handleImport} />
                <label 
                  htmlFor="file-import" 
                  className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-200 shadow-sm hover:bg-blue-100 transition-colors flex items-center gap-2 cursor-pointer text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
                  Import JSON
                </label>
              </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex flex-col items-center justify-center p-6 border-blue-200 bg-blue-50/50 shadow-sm transition-transform hover:scale-105">
            <div className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">Total Attempted</div>
            <div className="text-4xl font-bold text-blue-700">{totalAttempted}</div>
            <div className="text-xs text-blue-500 mt-1">out of {availAll} questions</div>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 border-green-200 bg-green-50/50 shadow-sm transition-transform hover:scale-105">
            <div className="text-sm font-medium text-green-600 uppercase tracking-wider mb-2">Mastered (Success)</div>
            <div className="text-4xl font-bold text-green-600">{totalSuccess}</div>
            <div className="text-xs font-semibold text-green-700 mt-1">{successRate}% Win Rate</div>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 border-red-200 bg-red-50/50 shadow-sm transition-transform hover:scale-105">
            <div className="text-sm font-medium text-red-600 uppercase tracking-wider mb-2">Needs Review (Fail)</div>
            <div className="text-4xl font-bold text-red-500">{totalFail}</div>
            <div className="text-xs text-red-500 mt-1">Practice these below</div>
          </Card>
        </div>

        <Card title="Start a New Quiz" className="shadow-md border-zinc-200">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Select Question Pool</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className={`flex-1 cursor-pointer border-2 rounded-xl p-4 transition-all ${poolFilter === 'all' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-1' : 'border-zinc-200 hover:border-zinc-300 bg-white'}`}>
                  <input type="radio" value="all" checked={poolFilter === 'all'} onChange={() => setPoolFilter("all")} className="sr-only" />
                  <div className="font-semibold text-stone-900">All Questions</div>
                  <div className="text-sm text-stone-500 mt-1">{availAll} available</div>
                </label>
                <label className={`flex-1 cursor-pointer border-2 rounded-xl p-4 transition-all ${poolFilter === 'fail' ? 'border-red-500 bg-red-50 ring-2 ring-red-500 ring-offset-1' : 'border-zinc-200 hover:border-zinc-300 bg-white'}`}>
                  <input type="radio" value="fail" checked={poolFilter === 'fail'} onChange={() => setPoolFilter("fail")} className="sr-only" />
                  <div className="font-semibold text-red-700">Needs Review (Fail)</div>
                  <div className="text-sm text-red-500 mt-1">{availFail} available</div>
                </label>
                <label className={`flex-1 cursor-pointer border-2 rounded-xl p-4 transition-all ${poolFilter === 'success' ? 'border-green-500 bg-green-50 ring-2 ring-green-500 ring-offset-1' : 'border-zinc-200 hover:border-zinc-300 bg-white'}`}>
                  <input type="radio" value="success" checked={poolFilter === 'success'} onChange={() => setPoolFilter("success")} className="sr-only" />
                  <div className="font-semibold text-green-700">Mastered (Success)</div>
                  <div className="text-sm text-green-600 mt-1">{availSuccess} available</div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Number of Questions (指定題數)</label>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <input 
                  type="number"
                  min="1"
                  value={questionCount || ""} 
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full sm:w-32 p-3 border-2 border-zinc-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-bold text-stone-800 transition-all text-center"
                  placeholder="e.g. 15"
                />
                <div className="flex flex-wrap gap-2">
                  {[10, 20, 50, 100].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionCount(num)}
                      className={`px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                        questionCount === num 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-white border-zinc-200 text-stone-600 hover:border-blue-300 hover:bg-zinc-50'
                      }`}
                    >
                      {num} 題
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
            >
              Start Selected Quiz
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </Card>
      </div>
    );
  }

  if (phase === "result") {
    const passed = score >= 80;
    const failedItems = gradedResults.filter(g => !g.isCorrect);

    return (
      <div className="max-w-5xl mx-auto py-8 animate-in zoom-in-95 duration-500">
        <Card title="考試結果 (Current Run Results)" className={`shadow-xl ${passed ? "border-green-400" : "border-red-400"}`}>
          <div className="flex flex-col items-center py-6 space-y-4">
            <h2 className={`text-6xl font-black ${passed ? "text-green-500" : "text-red-500"}`}>{score}%</h2>
            <div className={`text-2xl font-semibold flex items-center gap-2 ${passed ? "text-green-600" : "text-red-500"}`}>
              {passed ? "🎉 及格 (PASS) 🎉" : "❌ 不及格 (FAIL) ❌"}
            </div>
            <p className="text-stone-600 font-medium text-lg">
              答對 {gradedResults.length - failedItems.length} 題，共 {gradedResults.length} 題。
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 w-full border-t border-zinc-100 pt-8">
              {failedItems.length > 0 && (
                <button
                  onClick={handleRetryFailedInRun}
                  className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-all shadow-md flex-1"
                >
                  重考本次錯誤題目 ({failedItems.length})
                </button>
              )}
              <button
                onClick={handleReturnToSetup}
                className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl border border-stone-300 transition-all shadow-sm flex-1"
              >
                回到 Quiz Dashboard
              </button>
            </div>
          </div>
        </Card>

        {failedItems.length > 0 && (
          <div className="mt-8 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold text-stone-800">錯誤題目解析 (Review Incorrect Answers)</h3>
            {failedItems.map((item, idx) => (
              <Card key={item.id} className="border-red-200 bg-red-50/30">
                <div className="flex gap-4">
                   <div className="shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                     {idx + 1}
                   </div>
                   <div className="flex-1">
                     <p className="font-semibold text-lg mb-3 text-stone-800">{item.question}</p>
                     <div className="space-y-1 mb-4 text-sm font-medium">
                       <p className="text-red-600 bg-red-100 px-3 py-1.5 rounded-md inline-block mr-3">❌ 你的答案: {item.userAnswer || "未作答"}</p>
                       <p className="text-green-700 bg-green-100 px-3 py-1.5 rounded-md inline-block">✅ 正確答案: {item.correctAnswer}</p>
                     </div>
                     <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm text-sm text-stone-700">
                       <span className="font-bold text-blue-600">解析：</span> {item.explanation}
                     </div>
                   </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Active Quiz State
  const currentItem = items[currentIndex];
  if (!currentItem) return null;
  const selected = answers[currentItem.id];

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in slide-in-from-right-4 duration-300">
      <div className="mb-6 flex justify-between items-center text-sm font-medium text-stone-500">
        <span className="bg-white px-3 py-1 rounded-full border border-zinc-200 shadow-sm text-zinc-600">
          Question <span className="text-blue-600 font-bold">{currentIndex + 1}</span> of {items.length}
        </span>
        <div className="w-64 bg-zinc-200 rounded-full h-3 shadow-inner overflow-hidden border border-zinc-300/50">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="border-blue-200 shadow-lg !rounded-2xl overflow-hidden">
        <div className="bg-blue-50/50 -mx-4 -mt-4 mb-6 px-6 py-8 border-b border-blue-100">
            <h2 className="text-3xl font-medium text-stone-900 leading-tight">
            {currentItem.question}
            </h2>
        </div>
        
        <div className="space-y-3 px-2">
          {currentItem.options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selected === option
                  ? "border-blue-500 bg-blue-50 font-medium shadow-md shadow-blue-500/10 scale-[1.01]"
                  : "border-zinc-200 hover:border-blue-300 hover:bg-zinc-50 text-stone-700 bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                  selected === option ? "border-blue-500" : "border-zinc-300 bg-zinc-50"
                }`}>
                  {selected === option && <div className="w-3 h-3 rounded-full bg-blue-500 animate-in zoom-in" />}
                </div>
                <span className={`text-lg ${selected === option ? 'text-blue-800' : ''}`}>{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-end px-2 pb-2">
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center gap-2 ${
              selected
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
            }`}
          >
            {currentIndex < items.length - 1 ? "Next Question" : "Submit Quiz"}
            {selected && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            )}
          </button>
        </div>
      </Card>
      <div className="mt-8 text-center">
        <button onClick={handleReturnToSetup} className="text-stone-400 text-sm font-medium hover:text-stone-600 transition-colors uppercase tracking-widest border-b border-transparent hover:border-stone-400 pb-1">
          Abort Quiz & Return to Dashboard
        </button>
      </div>
    </div>
  );
}
