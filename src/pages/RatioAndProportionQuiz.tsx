import React, { useState } from "react";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";

interface RatioQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: "basic" | "simplify" | "application" | "calculation" | "advanced";
}

const QUESTIONS: RatioQuestion[] = [
  // ===== 基礎：比的定義與讀法 (1-10) =====
  {
    id: "rp-1",
    question: "a : b 中，a 稱為什麼？",
    options: ["前項", "後項", "比值", "分母"],
    correctAnswer: "前項",
    explanation: "在 a : b 中，a 是前項，b 是後項。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-2",
    question: "a : b 中，b 稱為什麼？",
    options: ["後項", "前項", "比值", "分子"],
    correctAnswer: "後項",
    explanation: "在 a : b 中，b 是後項。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-3",
    question: "3 : 5 的比值是多少？",
    options: ["3/5", "5/3", "3.5", "15"],
    correctAnswer: "3/5",
    explanation: "比值 = 前項 ÷ 後項 = 3 ÷ 5 = 3/5。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-4",
    question: "7 : 2 的比值是多少？",
    options: ["3.5", "2/7", "7/2", "14"],
    correctAnswer: "3.5",
    explanation: "比值 = 7 ÷ 2 = 3.5。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-5",
    question: "0 : 5 的比值是多少？",
    options: ["0", "5", "無意義", "1"],
    correctAnswer: "0",
    explanation: "當 a = 0 且 b ≠ 0 時，比值 = 0。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-6",
    question: "5 : 0 的比值是多少？",
    options: ["無意義", "5", "0", "∞"],
    correctAnswer: "無意義",
    explanation: "後項不能為 0，所以 5 : 0 無意義。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-7",
    question: "12 : 4 的比值是多少？",
    options: ["3", "4", "1/3", "12"],
    correctAnswer: "3",
    explanation: "比值 = 12 ÷ 4 = 3。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-8",
    question: "1 : 8 的比值是多少？",
    options: ["1/8", "8", "0.8", "0.125"],
    correctAnswer: "1/8",
    explanation: "比值 = 1 ÷ 8 = 1/8 = 0.125。但最簡分數表示為 1/8。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-9",
    question: "比 6 : 9 的比值用最簡分數表示是多少？",
    options: ["2/3", "3/2", "6/9", "9/6"],
    correctAnswer: "2/3",
    explanation: "6 ÷ 9 = 6/9 = 2/3（約分到最簡）。",
    difficulty: "easy",
    topic: "basic",
  },
  {
    id: "rp-10",
    question: "下列哪一個比的比值等於 1/4？",
    options: ["1 : 4", "4 : 1", "2 : 4", "4 : 16"],
    correctAnswer: "1 : 4",
    explanation: "1 : 4 的比值 = 1/4。注意 4:16 比值也是 1/4，但最簡比是 1:4。",
    difficulty: "easy",
    topic: "basic",
  },

  // ===== 等比與比的化簡 (11-20) =====
  {
    id: "rp-11",
    question: "將 4 : 6 化為最簡整數比？",
    options: ["2 : 3", "3 : 2", "4 : 6", "1 : 1.5"],
    correctAnswer: "2 : 3",
    explanation: "同除以 2：4 : 6 = (4÷2) : (6÷2) = 2 : 3。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-12",
    question: "將 15 : 25 化為最簡整數比？",
    options: ["3 : 5", "5 : 3", "15 : 25", "1 : 1.67"],
    correctAnswer: "3 : 5",
    explanation: "同除以 5：15 : 25 = (15÷5) : (25÷5) = 3 : 5。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-13",
    question: "將 0.3 : 0.5 化為最簡整數比？",
    options: ["3 : 5", "30 : 50", "1 : 1.67", "0.3 : 0.5"],
    correctAnswer: "3 : 5",
    explanation: "同乘以 10：0.3 : 0.5 = 3 : 5。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-14",
    question: "將 1/2 : 1/3 化為最簡整數比？",
    options: ["3 : 2", "2 : 3", "1 : 1", "6 : 6"],
    correctAnswer: "3 : 2",
    explanation: "同乘以 6（2和3的最小公倍數）：1/2 : 1/3 = 3 : 2。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-15",
    question: "將 2/3 : 3/4 化為最簡整數比？",
    options: ["8 : 9", "9 : 8", "2 : 3", "3 : 4"],
    correctAnswer: "8 : 9",
    explanation: "同乘以 12：2/3×12 = 8，3/4×12 = 9，所以 = 8 : 9。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-16",
    question: "下列哪個比和 2 : 3 相等？",
    options: ["4 : 6", "3 : 2", "6 : 4", "2 : 4"],
    correctAnswer: "4 : 6",
    explanation: "2 : 3 同乘以 2 = 4 : 6。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-17",
    question: "將 100 : 60 化為最簡整數比？",
    options: ["5 : 3", "10 : 6", "50 : 30", "3 : 5"],
    correctAnswer: "5 : 3",
    explanation: "同除以 20：100 : 60 = 5 : 3。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-18",
    question: "將 0.25 : 0.75 化為最簡整數比？",
    options: ["1 : 3", "25 : 75", "3 : 1", "1 : 4"],
    correctAnswer: "1 : 3",
    explanation: "同乘以 100 得 25 : 75，再同除以 25 = 1 : 3。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-19",
    question: "8 : 12 和下列哪個比不相等？",
    options: ["2 : 3", "4 : 6", "16 : 24", "3 : 2"],
    correctAnswer: "3 : 2",
    explanation: "8 : 12 = 2 : 3，但 3 : 2 ≠ 2 : 3。",
    difficulty: "medium",
    topic: "simplify",
  },
  {
    id: "rp-20",
    question: "將 1.5 : 2.5 化為最簡整數比？",
    options: ["3 : 5", "15 : 25", "5 : 3", "1 : 2"],
    correctAnswer: "3 : 5",
    explanation: "同乘以 10 得 15 : 25，再同除以 5 = 3 : 5。",
    difficulty: "medium",
    topic: "simplify",
  },

  // ===== 生活應用題 (21-30) =====
  {
    id: "rp-21",
    question: "父親身高 180 公分，兒子身高 120 公分，父親與兒子的身高比為？",
    options: ["3 : 2", "2 : 3", "180 : 120", "1.5 : 1"],
    correctAnswer: "3 : 2",
    explanation: "180 : 120 = 180÷60 : 120÷60 = 3 : 2。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-22",
    question: "2 杯珍奶的價錢等於 3 杯布丁奶茶的價錢，珍奶與布丁奶茶的單價比為？",
    options: ["3 : 2", "2 : 3", "1 : 1", "6 : 6"],
    correctAnswer: "3 : 2",
    explanation: "設珍奶單價 a、布丁單價 b，則 2a = 3b → a : b = 3 : 2。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-23",
    question: "甲有 60 元，乙有 90 元，甲與乙的錢比為？",
    options: ["2 : 3", "3 : 2", "60 : 90", "1 : 1.5"],
    correctAnswer: "2 : 3",
    explanation: "60 : 90 = 60÷30 : 90÷30 = 2 : 3。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-24",
    question: "一個長方形長 12 公分、寬 8 公分，長與寬的比為？",
    options: ["3 : 2", "2 : 3", "12 : 8", "4 : 3"],
    correctAnswer: "3 : 2",
    explanation: "12 : 8 = 12÷4 : 8÷4 = 3 : 2。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-25",
    question: "班上有男生 18 人、女生 12 人，男女生比為？",
    options: ["3 : 2", "2 : 3", "18 : 12", "1 : 1"],
    correctAnswer: "3 : 2",
    explanation: "18 : 12 = 18÷6 : 12÷6 = 3 : 2。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-26",
    question: "小明跑了 400 公尺，小華跑了 600 公尺，兩人跑步距離比為？",
    options: ["2 : 3", "3 : 2", "400 : 600", "4 : 6"],
    correctAnswer: "2 : 3",
    explanation: "400 : 600 = 400÷200 : 600÷200 = 2 : 3。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-27",
    question: "一袋米重 5 公斤，用掉 2 公斤後，剩下與用掉的比為？",
    options: ["3 : 2", "2 : 3", "5 : 2", "2 : 5"],
    correctAnswer: "3 : 2",
    explanation: "剩下 5-2=3 公斤，剩下 : 用掉 = 3 : 2。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-28",
    question: "一條繩子長 60 公分，剪成兩段分別為 24 公分和 36 公分，兩段的比為？",
    options: ["2 : 3", "3 : 2", "24 : 36", "4 : 6"],
    correctAnswer: "2 : 3",
    explanation: "24 : 36 = 24÷12 : 36÷12 = 2 : 3。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-29",
    question: "用 3 顆蘋果換 5 顆橘子，蘋果與橘子的交換比為？",
    options: ["3 : 5", "5 : 3", "1 : 1", "3 : 8"],
    correctAnswer: "3 : 5",
    explanation: "蘋果 : 橘子 = 3 : 5。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "rp-30",
    question: "考試滿分 100 分，小華考了 75 分，得分與滿分的比為？",
    options: ["3 : 4", "4 : 3", "75 : 100", "1 : 2"],
    correctAnswer: "3 : 4",
    explanation: "75 : 100 = 75÷25 : 100÷25 = 3 : 4。",
    difficulty: "medium",
    topic: "application",
  },

  // ===== 比值計算 (31-40) =====
  {
    id: "rp-31",
    question: "24 : 8 的比值是多少？",
    options: ["3", "1/3", "8", "32"],
    correctAnswer: "3",
    explanation: "24 ÷ 8 = 3。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-32",
    question: "5 : 15 的比值是多少？",
    options: ["1/3", "3", "5", "1/5"],
    correctAnswer: "1/3",
    explanation: "5 ÷ 15 = 5/15 = 1/3。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-33",
    question: "0.6 : 0.2 的比值是多少？",
    options: ["3", "1/3", "0.3", "6"],
    correctAnswer: "3",
    explanation: "0.6 ÷ 0.2 = 3。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-34",
    question: "1.2 : 3.6 的比值是多少？",
    options: ["1/3", "3", "1.2", "0.4"],
    correctAnswer: "1/3",
    explanation: "1.2 ÷ 3.6 = 1/3。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-35",
    question: "若 a : b = 4 : 7，則 a : b 的比值為？",
    options: ["4/7", "7/4", "4.7", "28"],
    correctAnswer: "4/7",
    explanation: "比值 = 前項 ÷ 後項 = 4 ÷ 7 = 4/7。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-36",
    question: "若比為 9 : 3，則比值為多少？",
    options: ["3", "1/3", "9", "27"],
    correctAnswer: "3",
    explanation: "9 ÷ 3 = 3。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-37",
    question: "若比值為 2/5，則這個比可以是？",
    options: ["2 : 5", "5 : 2", "2 : 10", "10 : 2"],
    correctAnswer: "2 : 5",
    explanation: "比值 = 前項 ÷ 後項，所以 2 ÷ 5 = 2/5，比為 2 : 5。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-38",
    question: "比 10 : 25 的比值用小數表示為？",
    options: ["0.4", "2.5", "0.25", "4"],
    correctAnswer: "0.4",
    explanation: "10 ÷ 25 = 0.4。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-39",
    question: "比 3 : 0.5 的比值為？",
    options: ["6", "1/6", "0.6", "3.5"],
    correctAnswer: "6",
    explanation: "3 ÷ 0.5 = 6。",
    difficulty: "easy",
    topic: "calculation",
  },
  {
    id: "rp-40",
    question: "比 0.8 : 4 的比值為？",
    options: ["0.2", "5", "2", "0.4"],
    correctAnswer: "0.2",
    explanation: "0.8 ÷ 4 = 0.2。",
    difficulty: "easy",
    topic: "calculation",
  },

  // ===== 素養進階題 (51-60) =====
  {
    id: "rp-51",
    question: "小明做蛋糕，食譜上奶油與麵粉的重量比為 2 : 5。今天他想用完剩下 180 公克的奶油，請問他需要準備多少公克的麵粉？",
    options: ["450 公克", "360 公克", "400 公克", "500 公克"],
    correctAnswer: "450 公克",
    explanation: "奶油 : 麵粉 = 2 : 5，奶油 180g → 2x = 180 → x = 90，麵粉 = 5 × 90 = 450g。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-52",
    question: "地圖比例尺為 1 : 10000。地圖上一塊長方形農地長 6 公分、寬 5 公分，這塊農地實際面積是多少公頃？（1 公頃 = 10000 平方公尺）",
    options: ["30 公頃", "3 公頃", "300 公頃", "60 公頃"],
    correctAnswer: "30 公頃",
    explanation: "實際長 = 6 × 10000 = 60000 cm = 600m，寬 = 5 × 10000 = 50000 cm = 500m。面積 = 600 × 500 = 300000 m² = 30 公頃。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-53",
    question: "甲、乙兩人按 1 : 3 分配一筆 4000 元的獎金，若甲將自己所得的一半給乙，則乙最後有多少元？",
    options: ["3500 元", "3000 元", "3750 元", "2500 元"],
    correctAnswer: "3500 元",
    explanation: "甲原得 4000 × 1/4 = 1000 元，乙原得 4000 × 3/4 = 3000 元。甲給乙 1000 × 1/2 = 500 元。乙最後 = 3000 + 500 = 3500 元。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-54",
    question: "一個三角形的三個內角度數比為 3 : 4 : 5，則最大角為幾度？",
    options: ["75°", "60°", "90°", "45°"],
    correctAnswer: "75°",
    explanation: "180° × 5/(3+4+5) = 180° × 5/12 = 75°。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-55",
    question: "一條 240 公尺的跑道，小明和小華同時同地出發反向跑步。小明與小華的速率比為 3 : 2，兩人第一次相遇時，小明跑了多少公尺？",
    options: ["144 公尺", "160 公尺", "120 公尺", "180 公尺"],
    correctAnswer: "144 公尺",
    explanation: "兩人反向跑，合走一圈 240 公尺相遇。速率比 3:2，路程比也是 3:2。小明跑了 240 × 3/(3+2) = 240 × 3/5 = 144 公尺。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-56",
    question: "某班男女生人數比為 7 : 3，開學後轉入 8 位女生，此時男女生人數正好相等，則原本班上共有多少人？",
    options: ["20 人", "40 人", "30 人", "50 人"],
    correctAnswer: "20 人",
    explanation: "設原男 7x、女 3x。轉入 8 位女生後 7x = 3x + 8 → 4x = 8 → x = 2。原本共 10x = 20 人。驗證：男 14 女 6，轉入 8 女後各 14 人 ✓",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-57",
    question: "一個長方形的長寬比為 5 : 3，如果長增加 1 公分、寬增加 2 公分後，新長方形的長寬比為 3 : 2，則原長方形的周長是多少？",
    options: ["64 公分", "48 公分", "32 公分", "80 公分"],
    correctAnswer: "64 公分",
    explanation: "設原長 5x、寬 3x。(5x+1):(3x+2) = 3:2 → 2(5x+1) = 3(3x+2) → 10x+2 = 9x+6 → x = 4。長 = 20、寬 = 12，周長 = 2(20+12) = 64 公分。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-58",
    question: "甲乙兩管同時注水入空水池，甲管 4 分鐘注水量等於乙管 6 分鐘的注水量。若兩管同時開啟，共注入 1200 公升水，則甲管注入多少公升？",
    options: ["720 公升", "600 公升", "800 公升", "480 公升"],
    correctAnswer: "720 公升",
    explanation: "甲 4 分鐘 = 乙 6 分鐘 → 甲速率 : 乙速率 = 6:4 = 3:2（時間少速率快）。同時開啟注水量比 = 速率比 = 3:2。甲注 1200 × 3/5 = 720 公升。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-59",
    question: "某商品定價打八折後再打七五折出售，等於定價的幾折？",
    options: ["六折", "七七五折", "五五折", "六五折"],
    correctAnswer: "六折",
    explanation: "0.8 × 0.75 = 0.6，即定價的六折（60%）。注意不是簡單相加折扣。連續折扣要相乘。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-60",
    question: "將濃度 30% 的食鹽水 200 公克與濃度 60% 的食鹽水 100 公克混合，混合後食鹽水的濃度為多少？",
    options: ["40%", "45%", "50%", "35%"],
    correctAnswer: "40%",
    explanation: "鹽的重量 = 200 × 0.3 + 100 × 0.6 = 60 + 60 = 120g。總重量 = 200 + 100 = 300g。濃度 = 120/300 = 40%。",
    difficulty: "hard",
    topic: "advanced",
  },

  // ===== 綜合應用 (41-50) =====
  {
    id: "rp-41",
    question: "甲、乙兩人合資做生意，甲出資 30 萬，乙出資 50 萬，利潤 40 萬依出資比例分配，甲可分得多少萬？",
    options: ["15 萬", "25 萬", "20 萬", "10 萬"],
    correctAnswer: "15 萬",
    explanation: "甲 : 乙 = 30 : 50 = 3 : 5，甲分得 40 × 3/(3+5) = 40 × 3/8 = 15 萬。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-42",
    question: "承上題，乙可分得多少萬？",
    options: ["25 萬", "15 萬", "20 萬", "30 萬"],
    correctAnswer: "25 萬",
    explanation: "乙分得 40 × 5/(3+5) = 40 × 5/8 = 25 萬。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-43",
    question: "一條路長 120 公尺，分成兩段，比為 3 : 5，較長的那段為多少公尺？",
    options: ["75 公尺", "45 公尺", "60 公尺", "80 公尺"],
    correctAnswer: "75 公尺",
    explanation: "較長段 = 120 × 5/(3+5) = 120 × 5/8 = 75 公尺。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-44",
    question: "將 120 顆糖果按 2 : 3 : 5 分給甲、乙、丙三人，乙得多少顆？",
    options: ["36 顆", "24 顆", "60 顆", "48 顆"],
    correctAnswer: "36 顆",
    explanation: "乙分得 120 × 3/(2+3+5) = 120 × 3/10 = 36 顆。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-45",
    question: "承上題，丙得多少顆？",
    options: ["60 顆", "36 顆", "24 顆", "48 顆"],
    correctAnswer: "60 顆",
    explanation: "丙分得 120 × 5/(2+3+5) = 120 × 5/10 = 60 顆。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-46",
    question: "若 a : b = 3 : 4，且 a = 12，則 b = ？",
    options: ["16", "9", "12", "8"],
    correctAnswer: "16",
    explanation: "a : b = 3 : 4，a = 12 時，3x = 12 → x = 4，b = 4x = 16。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-47",
    question: "若 a : b = 5 : 7，且 b = 35，則 a = ？",
    options: ["25", "49", "35", "7"],
    correctAnswer: "25",
    explanation: "a : b = 5 : 7，b = 35 時，7x = 35 → x = 5，a = 5x = 25。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-48",
    question: "一個三角形的三內角比為 1 : 2 : 3，最大角為幾度？",
    options: ["90°", "60°", "30°", "120°"],
    correctAnswer: "90°",
    explanation: "180° × 3/(1+2+3) = 180° × 3/6 = 90°。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-49",
    question: "承上題，最小角為幾度？",
    options: ["30°", "90°", "60°", "45°"],
    correctAnswer: "30°",
    explanation: "180° × 1/(1+2+3) = 180° × 1/6 = 30°。",
    difficulty: "hard",
    topic: "advanced",
  },
  {
    id: "rp-50",
    question: "地圖上 3 公分代表實際距離 15 公里，則地圖上 5 公分代表實際距離多少公里？",
    options: ["25 公里", "15 公里", "20 公里", "30 公里"],
    correctAnswer: "25 公里",
    explanation: "3 : 15 = 5 : x → 3x = 75 → x = 25 公里。",
    difficulty: "hard",
    topic: "advanced",
  },
];

export default function RatioAndProportionQuiz() {
  const { user, saveScore } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "result">("setup");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongList, setWrongList] = useState<RatioQuestion[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Map<string, string>>(new Map());
  const [showWrongOnly, setShowWrongOnly] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState(50);
  const [quizItems, setQuizItems] = useState<RatioQuestion[]>([]);

  const TOPIC_CONFIG: Record<string, { emoji: string; label: string }> = {
    basic: { emoji: "📐", label: "基礎定義" },
    simplify: { emoji: "✂️", label: "化簡等比" },
    application: { emoji: "🏫", label: "生活應用" },
    calculation: { emoji: "🧮", label: "比值計算" },
    advanced: { emoji: "🏆", label: "綜合應用" },
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
    // Shuffle
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
        subject: "math-j1-ratio-proportion",
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
          <h1 className="text-2xl font-bold text-gray-800">📐 3-1 比與比例式</h1>
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
          {showWrongOnly ? "📝 訂正模式" : "📝 比與比例式測驗"}
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

      {/* Score */}
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

      {/* Next */}
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
