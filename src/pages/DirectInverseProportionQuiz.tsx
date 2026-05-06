import React, { useState } from "react";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";

interface DIQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: "direct-basic" | "direct-calc" | "inverse-basic" | "mixed" | "application";
}

const QUESTIONS: DIQuestion[] = [
  // ===== 素養進階題 (51-60) =====
  {
    id: "di-51",
    question: "小明以時速 15 公里騎車到學校，花了 x 小時、共騎 y 公里。若時速提高為 20 公里騎同樣距離，所需時間是原本的幾分之幾？",
    options: ["3/4", "4/3", "2/3", "3/2"],
    correctAnswer: "3/4",
    explanation: "距離 = 速率 × 時間，距離固定時速率與時間成反比。新時間 / 原時間 = 原速率 / 新速率 = 15/20 = 3/4。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-52",
    question: "y 與 x 成正比，當 x = 3 時 y = 12。若 x 增加為原來的 2.5 倍，y 會變為原來的幾倍？",
    options: ["2.5 倍", "5 倍", "6.25 倍", "1.5 倍"],
    correctAnswer: "2.5 倍",
    explanation: "y = kx，正比關係中 x 變為 2.5 倍，y 也變為 2.5 倍（k 不變）。這就是正比的核心特性：等比例放大。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-53",
    question: "完成一件工作，5 人需要 12 天。若增加到 8 人，幾天可以完成？（每人效率相同）",
    options: ["7.5 天", "8 天", "10 天", "6 天"],
    correctAnswer: "7.5 天",
    explanation: "人數 × 天數 = 工作總量（反比關係）。5 × 12 = 60，8x = 60 → x = 7.5 天。人數越多天數越少。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-54",
    question: "固定體積的圓柱容器，底面積 x 與水高 y 的關係為 xy = 600。若底面積變為原來的 1.5 倍，水高變為原來的多少？",
    options: ["2/3", "1.5 倍", "3/2", "1/3"],
    correctAnswer: "2/3",
    explanation: "xy = 600（反比）。x 變 1.5 倍時，1.5x × y' = 600 → y' = 600/(1.5x) = (2/3) × (600/x) = (2/3)y。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-55",
    question: "小華觀察彈簧長度 y（公分）與掛物重 x（公克）的關係為 y = 0.2x + 10。下列哪個正確？",
    options: ["y 與 x 不成正比（有常數項）", "y 與 x 成正比", "y 與 x 成反比", "y 與 x² 成正比"],
    correctAnswer: "y 與 x 不成正比（有常數項）",
    explanation: "y = 0.2x + 10 不是 y = kx 的形式（多了常數項 10），所以 y 與 x 不成正比。但 x 每增加 1，y 固定增加 0.2，這是「線性關係」而非正比。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-56",
    question: "甲乙兩地相距 180 公里。小明開車時速 60 公里，花了 3 小時到達。若想提早 1 小時到達，時速需提高多少公里？",
    options: ["30 公里", "20 公里", "15 公里", "60 公里"],
    correctAnswer: "30 公里",
    explanation: "原需 3 小時，想 2 小時到達 → 新時速 = 180/2 = 90 km/h。需提高 90 - 60 = 30 km/h。速率與時間成反比（固定距離下）。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-57",
    question: "已知 y 與 x 成正比，且當 x = 4 時 y = 8；y 也與 z 成正比，且當 z = 3 時 y = 6。則 x 與 z 成什麼關係？",
    options: ["正比", "反比", "不成比", "平方正比"],
    correctAnswer: "正比",
    explanation: "y 與 x 成正比 → y = 2x。y 與 z 成正比 → y = 2z。所以 2x = 2z → x = z，即 x : z = 1 : 1（正比的特例）。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-58",
    question: "用 480 元買筆記本，每本 48 元可買 10 本。若每本漲價 12 元，會少買幾本？",
    options: ["2 本", "3 本", "4 本", "1 本"],
    correctAnswer: "2 本",
    explanation: "總價 = 單價 × 數量（反比關係）。漲價後每本 60 元，480/60 = 8 本。少買 10 - 8 = 2 本。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-59",
    question: "實驗數據：x=2 時 y=24；x=4 時 y=12；x=6 時 y=8。下列哪個關係式正確？",
    options: ["xy = 48", "y = 12x", "y = x + 22", "x + y = 26"],
    correctAnswer: "xy = 48",
    explanation: "2×24=48，4×12=48，6×8=48。xy 恆為 48（定值），所以 x 與 y 成反比，關係式為 xy = 48。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-60",
    question: "y 與 x² 成正比，當 x = 3 時 y = 45。若 y = 80，則 x = ？",
    options: ["4", "5", "8", "6"],
    correctAnswer: "4",
    explanation: "y = kx² → 45 = k × 9 → k = 5。當 y = 80：80 = 5x² → x² = 16 → x = 4（取正值）。",
    difficulty: "hard",
    topic: "mixed",
  },

  // ===== 正比定義與判斷 (1-12) =====
  {
    id: "di-1",
    question: "若 y 與 x 成正比，則下列哪個關係式正確？",
    options: ["y = kx", "xy = k", "y = k/x", "y = kx + b"],
    correctAnswer: "y = kx",
    explanation: "正比的定義：y = kx，其中 k 為定值且 k ≠ 0。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-2",
    question: "若 y 與 x 成正比，則 y/x = ？",
    options: ["定值 k", "0", "xy", "x + y"],
    correctAnswer: "定值 k",
    explanation: "y = kx → y/x = k（定值）。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-3",
    question: "下列哪個關係式表示 y 與 x 成正比？",
    options: ["y = 5x", "y = x + 3", "xy = 12", "y = 1/x"],
    correctAnswer: "y = 5x",
    explanation: "y = 5x 符合 y = kx（k=5），所以是正比。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-4",
    question: "y = 2x + 4，y 與 x 成正比嗎？",
    options: ["不成正比", "成正比", "k = 2", "k = 4"],
    correctAnswer: "不成正比",
    explanation: "y = 2x + 4 不是 y = kx 的形式（多一個常數項），所以 y 與 x 不成正比。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-5",
    question: "麵包 1 個 20 元，買 x 個共 y 元，y 與 x 的關係為？",
    options: ["正比（y = 20x）", "反比（xy = 20）", "不成比", "正比（y = x/20）"],
    correctAnswer: "正比（y = 20x）",
    explanation: "y = 20x，y/x = 20（定值），所以 y 與 x 成正比。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-6",
    question: "圓周長 y = 2πx（x 為半徑），y 與 x 成什麼關係？",
    options: ["正比", "反比", "不成比", "平方正比"],
    correctAnswer: "正比",
    explanation: "y = 2πx 符合 y = kx（k = 2π），所以是正比。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-7",
    question: "圓面積 y = πx²（x 為半徑），y 與 x 成正比嗎？",
    options: ["不成正比（與 x² 成正比）", "成正比", "成反比", "不成任何比例"],
    correctAnswer: "不成正比（與 x² 成正比）",
    explanation: "y = πx² 不是 y = kx 的形式（是 x 的平方），所以 y 與 x 不成正比，但 y 與 x² 成正比。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-8",
    question: "一天 24 小時，白天 x 小時，夜間 y 小時，y 與 x 成正比嗎？",
    options: ["不成正比", "成正比", "成反比", "k = 24"],
    correctAnswer: "不成正比",
    explanation: "x + y = 24 → y = 24 - x，不是 y = kx 的形式。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-9",
    question: "全班 36 人，男生 x 人，女生 y 人，y 與 x 成什麼關係？",
    options: ["不成正比也不成反比", "正比", "反比", "y = 36x"],
    correctAnswer: "不成正比也不成反比",
    explanation: "x + y = 36，不是 y = kx 也不是 xy = k。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-10",
    question: "1 台斤 = 0.6 公斤，x 台斤 = y 公斤，y 與 x 成什麼關係？",
    options: ["正比", "反比", "不成比", "無法判斷"],
    correctAnswer: "正比",
    explanation: "y = 0.6x，y/x = 0.6（定值），所以 y 與 x 成正比。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-11",
    question: "若 y = -3x，y 與 x 成正比嗎？",
    options: ["成正比（k 可以是負數）", "不成正比", "成反比", "無法判斷"],
    correctAnswer: "成正比（k 可以是負數）",
    explanation: "y = -3x 符合 y = kx（k = -3 ≠ 0），所以是正比。k 可以是負數。",
    difficulty: "easy",
    topic: "direct-basic",
  },
  {
    id: "di-12",
    question: "x 值越大 y 值也越大，一定能判斷 y 與 x 成正比嗎？",
    options: ["不一定，要有 y/x = 定值才算", "一定成正比", "一定成反比", "無法判斷"],
    correctAnswer: "不一定，要有 y/x = 定值才算",
    explanation: "x 變大 y 也變大只是現象，必須 y/x 維持定值才是正比。",
    difficulty: "easy",
    topic: "direct-basic",
  },

  // ===== 正比求 k 值 (13-22) =====
  {
    id: "di-13",
    question: "y 與 x 成正比，當 x = 3 時 y = 24，k = ？",
    options: ["8", "6", "3", "24"],
    correctAnswer: "8",
    explanation: "y = kx → 24 = k × 3 → k = 8。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-14",
    question: "y 與 x 成正比，當 x = 5 時 y = 35，關係式為？",
    options: ["y = 7x", "y = 5x", "y = 35x", "y = x/7"],
    correctAnswer: "y = 7x",
    explanation: "k = 35/5 = 7，所以 y = 7x。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-15",
    question: "y 與 x 成正比，當 x = 2 時 y = 10，當 x = 6 時 y = ？",
    options: ["30", "12", "20", "60"],
    correctAnswer: "30",
    explanation: "k = 10/2 = 5，y = 5x。當 x = 6，y = 5×6 = 30。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-16",
    question: "y 與 x 成正比，當 x = 4 時 y = 20，當 y = 45 時 x = ？",
    options: ["9", "8", "5", "11.25"],
    correctAnswer: "9",
    explanation: "k = 20/4 = 5，y = 5x。當 y = 45：45 = 5x → x = 9。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-17",
    question: "y 與 x 成正比，當 x = 1/2 時 y = 3，k = ？",
    options: ["6", "1.5", "3", "0.5"],
    correctAnswer: "6",
    explanation: "k = y/x = 3 ÷ (1/2) = 3 × 2 = 6。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-18",
    question: "y 與 x 成正比，當 x = 0.4 時 y = 2.4，關係式為？",
    options: ["y = 6x", "y = 2.4x", "y = 0.4x", "y = 12x"],
    correctAnswer: "y = 6x",
    explanation: "k = 2.4/0.4 = 6，所以 y = 6x。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-19",
    question: "矩形寬 5 公分、長 x 公分、面積 y 平方公分，y 與 x 的關係式為？",
    options: ["y = 5x", "y = x/5", "y = 25x", "xy = 5"],
    correctAnswer: "y = 5x",
    explanation: "面積 = 長 × 寬 = 5x，所以 y = 5x。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-20",
    question: "承上題，當面積 y = 45 時，長 x = ？",
    options: ["9", "5", "45", "225"],
    correctAnswer: "9",
    explanation: "45 = 5x → x = 9。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-21",
    question: "y 與 x 成正比，當 x = 3 時 y = -9，當 x = 5 時 y = ？",
    options: ["-15", "15", "-25", "-5"],
    correctAnswer: "-15",
    explanation: "k = -9/3 = -3，y = -3x。當 x = 5：y = -3×5 = -15。",
    difficulty: "medium",
    topic: "direct-calc",
  },
  {
    id: "di-22",
    question: "y 與 (x+2) 成正比，當 x = 1 時 y = 6，關係式為？",
    options: ["y = 2(x+2)", "y = 6x", "y = 3(x+2)", "y = 2x+4"],
    correctAnswer: "y = 2(x+2)",
    explanation: "令 y = k(x+2)，代入 x=1, y=6：6 = k(1+2) = 3k → k = 2。所以 y = 2(x+2)。",
    difficulty: "medium",
    topic: "direct-calc",
  },

  // ===== 反比定義與判斷 (23-34) =====
  {
    id: "di-23",
    question: "若 y 與 x 成反比，則下列哪個關係式正確？",
    options: ["xy = k", "y = kx", "y = k/x²", "x + y = k"],
    correctAnswer: "xy = k",
    explanation: "反比的定義：xy = k（定值），或寫成 y = k/x。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-24",
    question: "若 y 與 x 成反比，則下列哪個正確？",
    options: ["x 變大，y 變小", "x 變大，y 變大", "x 變大，y 不變", "無法判斷"],
    correctAnswer: "x 變大，y 變小",
    explanation: "xy = k，當 k > 0 時，x 變大 → y = k/x 變小。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-25",
    question: "走 120 公里，速率 x km/h，時間 y 小時，y 與 x 成什麼關係？",
    options: ["反比", "正比", "不成比", "平方正比"],
    correctAnswer: "反比",
    explanation: "距離 = 速率 × 時間 → xy = 120，所以 y 與 x 成反比。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-26",
    question: "面積 24 平方公分的矩形，長 x 公分、寬 y 公分，y 與 x 成什麼關係？",
    options: ["反比", "正比", "不成比", "線性"],
    correctAnswer: "反比",
    explanation: "面積 = 長 × 寬 → xy = 24，所以 y 與 x 成反比。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-27",
    question: "下列哪個表示 y 與 x 成反比？",
    options: ["xy = 30", "y = 5x", "y = x + 7", "y = x²"],
    correctAnswer: "xy = 30",
    explanation: "xy = 30 符合反比定義 xy = k（k = 30）。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-28",
    question: "100 元買蘋果，蘋果每顆 x 元，可買 y 顆，y 與 x 成什麼關係？",
    options: ["反比", "正比", "不成比", "無法判斷"],
    correctAnswer: "反比",
    explanation: "總價 = 單價 × 數量 → xy = 100，所以 y 與 x 成反比。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-29",
    question: "y 與 x 成反比，當 x = 2 時 y = 30，k = ？",
    options: ["60", "15", "32", "28"],
    correctAnswer: "60",
    explanation: "xy = k → 2 × 30 = 60。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-30",
    question: "y 與 x 成反比，當 x = 5 時 y = 12，當 x = 3 時 y = ？",
    options: ["20", "7.2", "15", "36"],
    correctAnswer: "20",
    explanation: "xy = 60。當 x = 3：3y = 60 → y = 20。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-31",
    question: "y 與 x 成反比，當 x = 4 時 y = 15，當 y = 6 時 x = ？",
    options: ["10", "8", "5", "2.5"],
    correctAnswer: "10",
    explanation: "xy = 60。當 y = 6：6x = 60 → x = 10。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-32",
    question: "固定 48 元買筆，每枝 x 元可買 y 枝，若 x = 8 則 y = ？",
    options: ["6", "8", "12", "48"],
    correctAnswer: "6",
    explanation: "xy = 48。當 x = 8：8y = 48 → y = 6。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-33",
    question: "y 與 x 成反比，當 x = 1/3 時 y = 18，k = ？",
    options: ["6", "54", "1/6", "18"],
    correctAnswer: "6",
    explanation: "xy = k → (1/3) × 18 = 6。",
    difficulty: "medium",
    topic: "inverse-basic",
  },
  {
    id: "di-34",
    question: "若 xy = -24，y 與 x 成反比嗎？",
    options: ["成反比（k 可以是負數）", "不成反比", "成正比", "無法判斷"],
    correctAnswer: "成反比（k 可以是負數）",
    explanation: "xy = -24 符合 xy = k（k = -24 ≠ 0），所以成反比。k 可以是負數。",
    difficulty: "medium",
    topic: "inverse-basic",
  },

  // ===== 綜合判斷題 (35-44) =====
  {
    id: "di-35",
    question: "x = 1, y = 3；x = 2, y = 6；x = 3, y = 9。y 與 x 成什麼關係？",
    options: ["正比", "反比", "不成比", "線性但不成比"],
    correctAnswer: "正比",
    explanation: "y/x = 3/1 = 6/2 = 9/3 = 3（定值），所以成正比，k = 3。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-36",
    question: "x = 2, y = 12；x = 3, y = 8；x = 4, y = 6。y 與 x 成什麼關係？",
    options: ["反比", "正比", "不成比", "無法判斷"],
    correctAnswer: "反比",
    explanation: "xy = 24（定值），所以成反比，k = 24。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-37",
    question: "x = 1, y = 5；x = 2, y = 7；x = 3, y = 9。y 與 x 成正比嗎？",
    options: ["不成正比（y/x 不是定值）", "成正比", "成反比", "無法判斷"],
    correctAnswer: "不成正比（y/x 不是定值）",
    explanation: "y/x = 5, 3.5, 3，不是定值。y = 2x + 3，多一個常數項。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-38",
    question: "固定體積的圓柱體，底面積 x、高 y，y 與 x 成什麼關係？",
    options: ["反比", "正比", "不成比", "平方正比"],
    correctAnswer: "反比",
    explanation: "體積 = 底面積 × 高 → xy = V（定值），所以成反比。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-39",
    question: "正三角形邊長 x、周長 y，y 與 x 成什麼關係？",
    options: ["正比", "反比", "不成比", "平方正比"],
    correctAnswer: "正比",
    explanation: "y = 3x，y/x = 3（定值），所以成正比。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-40",
    question: "正方形邊長 x、面積 y，y 與 x 成正比嗎？",
    options: ["不成正比（y = x²）", "成正比", "成反比", "無法判斷"],
    correctAnswer: "不成正比（y = x²）",
    explanation: "y = x² 不是 y = kx 的形式，但 y 與 x² 成正比。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-41",
    question: "等速運動，速率 60 km/h，時間 x 小時，距離 y 公里，y 與 x 成什麼關係？",
    options: ["正比", "反比", "不成比", "線性但不成比"],
    correctAnswer: "正比",
    explanation: "y = 60x，y/x = 60（定值），所以成正比。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-42",
    question: "總價 200 元，單價 x 元的商品可買 y 個。當 x = 25 時 y = ？",
    options: ["8", "5", "10", "25"],
    correctAnswer: "8",
    explanation: "xy = 200。當 x = 25：25y = 200 → y = 8。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-43",
    question: "y 與 x² 成正比，當 x = 2 時 y = 20，當 x = 3 時 y = ？",
    options: ["45", "30", "60", "90"],
    correctAnswer: "45",
    explanation: "y = kx² → 20 = k(4) → k = 5。當 x = 3：y = 5 × 9 = 45。",
    difficulty: "hard",
    topic: "mixed",
  },
  {
    id: "di-44",
    question: "下列哪一組數據表示 y 與 x 成反比？",
    options: ["(2,6), (3,4), (6,2)", "(2,4), (3,6), (4,8)", "(1,5), (2,7), (3,9)", "(2,3), (4,6), (6,9)"],
    correctAnswer: "(2,6), (3,4), (6,2)",
    explanation: "2×6=12, 3×4=12, 6×2=12，xy = 12（定值），成反比。",
    difficulty: "hard",
    topic: "mixed",
  },

  // ===== 應用題 (45-50) =====
  {
    id: "di-45",
    question: "小明以等速 50 km/h 騎車，3 小時可到目的地。若速率降為 30 km/h，需要幾小時？",
    options: ["5 小時", "3 小時", "4.5 小時", "2 小時"],
    correctAnswer: "5 小時",
    explanation: "距離 = 50 × 3 = 150 km。速率 30 km/h → 時間 = 150/30 = 5 小時。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-46",
    question: "用 600 元買蘋果，每顆 15 元可買幾顆？若每顆漲價為 20 元，可買幾顆？",
    options: ["40 顆 → 30 顆", "30 顆 → 40 顆", "40 顆 → 40 顆", "30 顆 → 30 顆"],
    correctAnswer: "40 顆 → 30 顆",
    explanation: "600/15 = 40 顆，600/20 = 30 顆。單價越高買越少（反比關係）。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-47",
    question: "y 與 x 成正比，當 x = 2 時 y = 10。若 x 增加 3 倍，y 變為多少？",
    options: ["30", "20", "15", "50"],
    correctAnswer: "30",
    explanation: "k = 10/2 = 5，y = 5x。x 變 6 → y = 5×6 = 30。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-48",
    question: "y 與 x 成反比，當 x = 4 時 y = 9。若 x 減半為 2，y 變為多少？",
    options: ["18", "4.5", "9", "36"],
    correctAnswer: "18",
    explanation: "xy = 36。當 x = 2：2y = 36 → y = 18。x 減半，y 變兩倍。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-49",
    question: "工人 5 人 12 天可完成工作，若要 6 天完成，需要幾人？（反比關係）",
    options: ["10 人", "6 人", "8 人", "15 人"],
    correctAnswer: "10 人",
    explanation: "人數 × 天數 = 定值 → 5 × 12 = 60。6x = 60 → x = 10 人。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "di-50",
    question: "y 與 x 成正比且通過原點，若圖形上一點為 (4, 28)，另一點 x = 7 時 y = ？",
    options: ["49", "28", "7", "14"],
    correctAnswer: "49",
    explanation: "k = 28/4 = 7，y = 7x。當 x = 7：y = 7 × 7 = 49。",
    difficulty: "hard",
    topic: "application",
  },
];

export default function DirectInverseProportionQuiz() {
  const { user, saveScore } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "result">("setup");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongList, setWrongList] = useState<DIQuestion[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Map<string, string>>(new Map());
  const [showWrongOnly, setShowWrongOnly] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState(50);
  const [quizItems, setQuizItems] = useState<DIQuestion[]>([]);

  const TOPIC_CONFIG: Record<string, { emoji: string; label: string }> = {
    "direct-basic": { emoji: "📈", label: "正比定義" },
    "direct-calc": { emoji: "🔢", label: "正比計算" },
    "inverse-basic": { emoji: "📉", label: "反比定義" },
    "mixed": { emoji: "🔀", label: "綜合判斷" },
    "application": { emoji: "🏆", label: "應用題" },
  };

  const DIFF_CONFIG: Record<string, { emoji: string; label: string }> = {
    easy: { emoji: "🟢", label: "簡單" },
    medium: { emoji: "🟡", label: "中等" },
    hard: { emoji: "🔴", label: "困難" },
  };

  const getFilteredPool = () => {
    let pool = [...QUESTIONS];
    if (topicFilter !== "all") pool = pool.filter(q => q.topic === topicFilter);
    if (difficultyFilter !== "all") pool = pool.filter(q => q.difficulty === difficultyFilter);
    return pool;
  };

  const filteredCount = getFilteredPool().length;

  const handleStartQuiz = () => {
    let pool = getFilteredPool();
    pool.sort(() => Math.random() - 0.5);
    pool = pool.slice(0, Math.min(questionCount, pool.length));
    setQuizItems(pool);
    setPhase("active");
  };

  const questions = showWrongOnly ? wrongList : (quizItems.length > 0 ? quizItems : QUESTIONS);
  const total = questions.length;

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    setShowExplanation(true);

    const q = questions[currentIdx];
    if (option === q.correctAnswer) {
      setScore((s) => s + 1);
    } else {
      setWrongList((prev) => {
        if (!prev.find((w) => w.id === q.id)) return [...prev, q];
        return prev;
      });
      setWrongAnswers((prev) => new Map(prev).set(q.id, option));
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < total) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      const finalScore = Math.round((score / total) * 100);
      const wrongQs: WrongQuestion[] = wrongList.map(q => ({
        id: q.id,
        question: q.question,
        userAnswer: wrongAnswers.get(q.id) || "未作答",
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }));
      saveScore({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        subject: "math-j1-direct-inverse-proportion",
        score: finalScore,
        totalQuestions: total,
        correctAnswers: score,
        wrongAnswers: wrongQs.length,
        wrongQuestions: wrongQs,
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
    setWrongList([]);
    setWrongAnswers(new Map());
    setShowWrongOnly(false);
  };

  const handleRetryWrong = () => {
    setShowWrongOnly(true);
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
  };

  // Setup Phase
  if (phase === "setup") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="border-b pb-4 border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">📈 3-2 正比與反比</h1>
          <p className="text-gray-500 mt-1">共 {QUESTIONS.length} 題</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <span className="text-sm text-green-600">🟢 簡單</span>
            <p className="text-xl font-bold text-green-700">{QUESTIONS.filter(q => q.difficulty === "easy").length}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
            <span className="text-sm text-yellow-600">🟡 中等</span>
            <p className="text-xl font-bold text-yellow-700">{QUESTIONS.filter(q => q.difficulty === "medium").length}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <span className="text-sm text-red-600">🔴 困難</span>
            <p className="text-xl font-bold text-red-700">{QUESTIONS.filter(q => q.difficulty === "hard").length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
          <h3 className="font-bold text-gray-700">📊 選擇考試範圍</h3>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">題目類型</label>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setTopicFilter("all")} className={`p-3 rounded-xl border-2 text-sm font-medium ${topicFilter === "all" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>全部</button>
              {Object.entries(TOPIC_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={() => setTopicFilter(key)} className={`p-3 rounded-xl border-2 text-sm font-medium ${topicFilter === key ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                  {cfg.emoji} {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">難度</label>
            <div className="flex gap-2">
              <button onClick={() => setDifficultyFilter("all")} className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium ${difficultyFilter === "all" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>全部</button>
              {Object.entries(DIFF_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={() => setDifficultyFilter(key)} className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium ${difficultyFilter === key ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                  {cfg.emoji} {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">題數</label>
            <div className="flex items-center gap-3">
              <input type="number" min={1} max={filteredCount} value={Math.min(questionCount, filteredCount)} onChange={e => setQuestionCount(Number(e.target.value))} className="w-24 p-2 border-2 border-gray-200 rounded-xl text-center font-bold" />
              <span className="text-gray-500 text-sm">/ {filteredCount} 題可用</span>
            </div>
          </div>

          <button onClick={handleStartQuiz} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg">
            開始測驗 🚀
          </button>
        </div>
      </div>
    );
  }
  if (finished) {
    const finalScore = showWrongOnly
      ? Math.round((score / total) * 100)
      : Math.round((score / QUESTIONS.length) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {showWrongOnly ? "📝 訂正結果" : "🎉 測驗完成！"}
          </h2>
          <div className="text-6xl font-black text-blue-600 mb-2">{finalScore}</div>
          <p className="text-gray-500 mb-6">
            答對 {score} / {total} 題
            {!showWrongOnly && wrongList.length > 0 && `，錯了 ${wrongList.length} 題`}
          </p>

          {finalScore >= 80 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-700 font-bold text-lg">🌟 太棒了！通過測驗！</p>
            </div>
          )}
          {finalScore < 80 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-amber-700 font-bold">💪 繼續加油！再練習一次吧！</p>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
            >
              🔄 重新測驗
            </button>
            {wrongList.length > 0 && !showWrongOnly && (
              <button
                onClick={handleRetryWrong}
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition"
              >
                📝 訂正錯題 ({wrongList.length} 題)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-gray-500">
          {showWrongOnly ? "📝 訂正模式" : "📝 正比與反比測驗"}
        </span>
        <span className="text-sm font-bold text-blue-600">
          {currentIdx + 1} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      <div className="flex justify-end mb-2">
        <span className="text-sm text-green-600 font-bold">✅ {score} 分</span>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
        <p className="text-lg font-bold text-gray-800 mb-4 whitespace-pre-line">{q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt) => {
            let style = "border-gray-200 hover:border-blue-400 hover:bg-blue-50";
            if (selected) {
              if (opt === q.correctAnswer) {
                style = "border-green-400 bg-green-50";
              } else if (opt === selected) {
                style = "border-red-400 bg-red-50";
              } else {
                style = "border-gray-100 opacity-50";
              }
            }
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition ${style} ${
                  selected ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="text-gray-800">{opt}</span>
                {selected && opt === q.correctAnswer && (
                  <span className="float-right text-green-600 font-bold">✅</span>
                )}
                {selected && opt === selected && opt !== q.correctAnswer && (
                  <span className="float-right text-red-600 font-bold">❌</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-blue-700 mb-1">💡 解析</p>
          <p className="text-sm text-blue-800">{q.explanation}</p>
        </div>
      )}

      {selected && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {currentIdx + 1 < total ? "下一題 →" : "看結果 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
