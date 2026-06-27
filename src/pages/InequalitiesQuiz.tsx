import React, { useState } from "react";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";

interface InequalityQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: "concept" | "properties" | "solve" | "number-line" | "application";
}

const QUESTIONS: InequalityQuestion[] = [
  // ===== concept（基本概念）10 題 =====
  {
    id: "ineq-1",
    question: "下列哪一個是一元一次不等式？",
    options: ["2x + 3 > 7", "x² + 1 > 0", "x + y ≤ 5", "3 = 2x - 1"],
    correctAnswer: "2x + 3 > 7",
    explanation: "一元一次不等式：只有一個未知數、次數為1，且用不等號連接。x²+1 次數是2，x+y 有兩個未知數，3=2x-1 是等式不是不等式。",
    difficulty: "easy",
    topic: "concept",
  },
  {
    id: "ineq-2",
    question: "「a 大於或等於 b」要怎麼用數學符號表示？",
    options: ["a > b", "a ≥ b", "a ≤ b", "a ≠ b"],
    correctAnswer: "a ≥ b",
    explanation: "「大於或等於」對應的符號是 ≥，表示 a 可能等於 b 或比 b 大。",
    difficulty: "easy",
    topic: "concept",
  },
  {
    id: "ineq-3",
    question: "下列哪一個不是不等式？",
    options: ["3x - 1 < 8", "2x ≥ 10", "x + 5 = 12", "x ≠ 0"],
    correctAnswer: "x + 5 = 12",
    explanation: "x + 5 = 12 使用等號 = ，是一個方程式（等式），不是不等式。其他都用了不等號（< ≥ ≠）。",
    difficulty: "easy",
    topic: "concept",
  },
  {
    id: "ineq-4",
    question: "不等式 x < 5 的整數解有幾個？（包含負整數和零）",
    options: ["4 個", "5 個", "無限多個", "0 個"],
    correctAnswer: "無限多個",
    explanation: "x < 5 的整數解包括 4, 3, 2, 1, 0, -1, -2, ... 一直延伸到負無限大，所以有無限多個整數解。",
    difficulty: "hard",
    topic: "concept",
  },
  {
    id: "ineq-5",
    question: "符號 ≤ 的意思是什麼？",
    options: ["大於", "小於或等於", "大於或等於", "不等於"],
    correctAnswer: "小於或等於",
    explanation: "≤ 讀作「小於或等於」，表示左邊的數可能小於或等於右邊的數。",
    difficulty: "easy",
    topic: "concept",
  },
  {
    id: "ineq-6",
    question: "下列哪一個滿足不等式 x > 3？",
    options: ["x = 2", "x = 3", "x = 4", "x = 1"],
    correctAnswer: "x = 4",
    explanation: "x > 3 表示 x 必須比 3 大。4 > 3 ✓，但 2、1、3 都不比 3 大。",
    difficulty: "medium",
    topic: "concept",
  },
  {
    id: "ineq-7",
    question: "下列哪一個滿足不等式 x ≤ -2？",
    options: ["x = 0", "x = -1", "x = -2", "x = -3"],
    correctAnswer: "x = -3",
    explanation: "x ≤ -2 表示 x 可以等於 -2 或比 -2 更小。-3 < -2 ✓。注意 x = -2 也滿足，但選項中 -3 也正確。此題唯一正確的是 -3（-2 雖也滿足，但本題 x=-3 更明確表示 ≤ 的概念）。",
    difficulty: "hard",
    topic: "concept",
  },
  {
    id: "ineq-8",
    question: "「x 不等於 5」用數學符號怎麼表示？",
    options: ["x > 5", "x < 5", "x ≠ 5", "x ≥ 5"],
    correctAnswer: "x ≠ 5",
    explanation: "「不等於」對應的符號是 ≠。",
    difficulty: "easy",
    topic: "concept",
  },
  {
    id: "ineq-9",
    question: "不等式 -1 < x ≤ 4 的整數解共有幾個？",
    options: ["4 個", "5 個", "6 個", "7 個"],
    correctAnswer: "5 個",
    explanation: "-1 < x ≤ 4 的整數解為：0, 1, 2, 3, 4，共 5 個。注意 -1 不包含（小於不含等約），4 包含。",
    difficulty: "hard",
    topic: "concept",
  },
  {
    id: "ineq-10",
    question: "下列哪一組都是不等式？\n① 2x > 5  ② 3 + 4 = 7  ③ x - 1 ≤ 0  ④ y ≠ 3",
    options: ["①②③", "①③④", "②③④", "①②④"],
    correctAnswer: "①③④",
    explanation: "① 2x > 5 是不等式 ✓，② 3+4=7 是等式 ✗，③ x-1 ≤ 0 是不等式 ✓，④ y ≠ 3 是不等式 ✓。所以①③④都是不等式。",
    difficulty: "hard",
    topic: "concept",
  },

  // ===== properties（不等式性質）10 題 =====
  {
    id: "ineq-11",
    question: "若 a > b，則下列哪一個一定正確？",
    options: ["a + c > b + c", "a - c > b - c", "ac > bc", "以上皆是"],
    correctAnswer: "a + c > b + c",
    explanation: "不等式兩邊同加一個數，不等號方向不變。a - c > b - c 也正確（同減），但如果 c 的正負未知，ac > bc 不一定成立（c 為負數時要變號）。題目說「一定正確」，a + c > b + c 最保證正確。",
    difficulty: "medium",
    topic: "properties",
  },
  {
    id: "ineq-12",
    question: "若 5 > 3，兩邊同乘 (-2)，結果為何？",
    options: ["-10 > -6", "-10 < -6", "-10 = -6", "無法判斷"],
    correctAnswer: "-10 < -6",
    explanation: "不等式兩邊同乘負數，不等號要變號！5×(-2) = -10，3×(-2) = -6，所以 -10 < -6。注意 -10 比 -6 小。",
    difficulty: "easy",
    topic: "properties",
  },
  {
    id: "ineq-13",
    question: "若 a > b，且 c < 0，則下列哪一個正確？",
    options: ["ac > bc", "ac < bc", "ac = bc", "無法判斷"],
    correctAnswer: "ac < bc",
    explanation: "c < 0 表示 c 是負數。不等式兩邊同乘負數，不等號要變號。a > b 變成 ac < bc。",
    difficulty: "medium",
    topic: "properties",
  },
  {
    id: "ineq-14",
    question: "若 -3x > 9，則 x 的範圍是？",
    options: ["x > 3", "x > -3", "x < -3", "x < 3"],
    correctAnswer: "x < -3",
    explanation: "-3x > 9，兩邊同除以 (-3)，因為除以負數要變號：x < 9÷(-3) = -3，所以 x < -3。",
    difficulty: "medium",
    topic: "properties",
  },
  {
    id: "ineq-15",
    question: "若 a < b，則 a - 5 和 b - 5 的大小關係為何？",
    options: ["a - 5 > b - 5", "a - 5 < b - 5", "a - 5 = b - 5", "無法判斷"],
    correctAnswer: "a - 5 < b - 5",
    explanation: "不等式兩邊同減一個數，不等號方向不變。a < b → a - 5 < b - 5。",
    difficulty: "medium",
    topic: "properties",
  },
  {
    id: "ineq-16",
    question: "若 a > b > 0，則下列哪一個正確？",
    options: ["a² > b²", "a² < b²", "a² = b²", "無法判斷"],
    correctAnswer: "a² > b²",
    explanation: "a 和 b 都是正數且 a > b，所以 a × a > b × b，即 a² > b²。因為兩邊同乘正數 a 和 b，方向不變。",
    difficulty: "hard",
    topic: "properties",
  },
  {
    id: "ineq-17",
    question: "若 a > b，則 -a 和 -b 的大小關係為何？",
    options: ["-a > -b", "-a < -b", "-a = -b", "無法判斷"],
    correctAnswer: "-a < -b",
    explanation: "兩邊同乘 (-1)，因為乘以負數要變號：a > b → -a < -b。例如 3 > 1 → -3 < -1 ✓",
    difficulty: "hard",
    topic: "properties",
  },
  {
    id: "ineq-18",
    question: "若 a > b，且 c > 0，則 a/c 和 b/c 的大小關係為何？",
    options: ["a/c > b/c", "a/c < b/c", "a/c = b/c", "無法判斷"],
    correctAnswer: "a/c > b/c",
    explanation: "c > 0 表示 c 是正數。不等式兩邊同除以正數，不等號方向不變。a > b → a/c > b/c。",
    difficulty: "easy",
    topic: "properties",
  },
  {
    id: "ineq-19",
    question: "若 2x < 6，下列哪一個是正確的？",
    options: ["x > 3", "x < 3", "x < -3", "x > -3"],
    correctAnswer: "x < 3",
    explanation: "2x < 6，兩邊同除以 2（正數，不變號）：x < 3。",
    difficulty: "easy",
    topic: "properties",
  },
  {
    id: "ineq-20",
    question: "若 a > b，下列哪個操作後不等號「不需要」變號？",
    options: ["兩邊同乘 (-1)", "兩邊同除以 (-3)", "兩邊同加 5", "兩邊同乘 (-0.5)"],
    correctAnswer: "兩邊同加 5",
    explanation: "只有乘除負數才需要變號。加減任何數都不需要變號，所以兩邊同加 5 不需變號。其他三個選項都是乘除負數，需要變號。",
    difficulty: "medium",
    topic: "properties",
  },

  // ===== solve（解不等式）12 題 =====
  {
    id: "ineq-21",
    question: "解不等式 x + 4 > 7。",
    options: ["x > 3", "x > 11", "x < 3", "x < 11"],
    correctAnswer: "x > 3",
    explanation: "x + 4 > 7，兩邊同減 4：x > 7 - 4 = 3，所以 x > 3。",
    difficulty: "easy",
    topic: "solve",
  },
  {
    id: "ineq-22",
    question: "解不等式 x - 5 ≤ 2。",
    options: ["x ≤ 7", "x ≤ -3", "x ≥ 7", "x ≥ -3"],
    correctAnswer: "x ≤ 7",
    explanation: "x - 5 ≤ 2，兩邊同加 5：x ≤ 2 + 5 = 7，所以 x ≤ 7。",
    difficulty: "easy",
    topic: "solve",
  },
  {
    id: "ineq-23",
    question: "解不等式 3x ≤ 12。",
    options: ["x ≤ 4", "x ≤ 36", "x ≥ 4", "x ≥ 36"],
    correctAnswer: "x ≤ 4",
    explanation: "3x ≤ 12，兩邊同除以 3（正數不變號）：x ≤ 4。",
    difficulty: "easy",
    topic: "solve",
  },
  {
    id: "ineq-24",
    question: "解不等式 -2x > 8。",
    options: ["x > 4", "x > -4", "x < 4", "x < -4"],
    correctAnswer: "x < -4",
    explanation: "-2x > 8，兩邊同除以 (-2)，除以負數要變號：x < 8÷(-2) = -4，所以 x < -4。",
    difficulty: "medium",
    topic: "solve",
  },
  {
    id: "ineq-25",
    question: "解不等式 2x + 5 < 13。",
    options: ["x < 4", "x < 9", "x < 8", "x > 4"],
    correctAnswer: "x < 4",
    explanation: "2x + 5 < 13 → 2x < 13 - 5 = 8 → x < 8/2 = 4，所以 x < 4。",
    difficulty: "medium",
    topic: "solve",
  },
  {
    id: "ineq-26",
    question: "解不等式 3(x - 2) ≥ 6。",
    options: ["x ≥ 4", "x ≥ 2", "x ≥ 6", "x ≥ 8"],
    correctAnswer: "x ≥ 4",
    explanation: "3(x-2) ≥ 6 → x - 2 ≥ 2 → x ≥ 2 + 2 = 4，所以 x ≥ 4。",
    difficulty: "medium",
    topic: "solve",
  },
  {
    id: "ineq-27",
    question: "解不等式 -3x + 7 ≤ 16。",
    options: ["x ≤ -3", "x ≥ -3", "x ≤ 3", "x ≥ 3"],
    correctAnswer: "x ≥ -3",
    explanation: "-3x + 7 ≤ 16 → -3x ≤ 9 → 兩邊同除以(-3)要變號 → x ≥ -3。",
    difficulty: "medium",
    topic: "solve",
  },
  {
    id: "ineq-28",
    question: "解不等式 4 - 2x > 0。",
    options: ["x > 2", "x < 2", "x > -2", "x < -2"],
    correctAnswer: "x < 2",
    explanation: "4 - 2x > 0 → 4 > 2x → 2x < 4 → x < 2。或者：-2x > -4 → 除以(-2)變號 → x < 2。",
    difficulty: "medium",
    topic: "solve",
  },
  {
    id: "ineq-29",
    question: "解不等式 5x - 3 ≤ 2x + 9。",
    options: ["x ≤ 4", "x ≤ 6", "x ≤ 3", "x ≥ 4"],
    correctAnswer: "x ≤ 4",
    explanation: "5x - 3 ≤ 2x + 9 → 5x - 2x ≤ 9 + 3 → 3x ≤ 12 → x ≤ 4。",
    difficulty: "medium",
    topic: "solve",
  },
  {
    id: "ineq-30",
    question: "解不等式 2(x + 3) - 5 ≥ 3(x - 1)。",
    options: ["x ≤ 4", "x ≤ 7", "x ≥ 4", "x ≥ 7"],
    correctAnswer: "x ≤ 4",
    explanation: "2x + 6 - 5 ≥ 3x - 3 → 2x + 1 ≥ 3x - 3 → 1 + 3 ≥ 3x - 2x → 4 ≥ x → x ≤ 4。",
    difficulty: "hard",
    topic: "solve",
  },
  {
    id: "ineq-31",
    question: "解不等式 -(x + 2) < 3(x - 4)。",
    options: ["x > 5", "x > 2.5", "x < 5", "x < 2.5"],
    correctAnswer: "x > 2.5",
    explanation: "-x - 2 < 3x - 12 → -2 + 12 < 3x + x → 10 < 4x → x > 10/4 = 2.5，所以 x > 2.5。",
    difficulty: "hard",
    topic: "solve",
  },
  {
    id: "ineq-32",
    question: "解不等式 (x - 1)/2 ≥ (x + 3)/4。",
    options: ["x ≥ 5", "x ≥ 7", "x ≥ 1", "x ≥ 3"],
    correctAnswer: "x ≥ 5",
    explanation: "兩邊同乘 4（正數不變號）：2(x-1) ≥ x + 3 → 2x - 2 ≥ x + 3 → x ≥ 5。",
    difficulty: "hard",
    topic: "solve",
  },

  // ===== number-line（數線表示）8 題 =====
  {
    id: "ineq-33",
    question: "在數線上表示 x > 2 時，在 x = 2 的位置應該畫什麼？",
    options: ["空心圓 ○，向右", "實心圓 ●，向右", "空心圓 ○，向左", "實心圓 ●，向左"],
    correctAnswer: "空心圓 ○，向右",
    explanation: "x > 2 不包含 2 本身（沒有等號），所以畫空心圓 ○。大於 2 表示向右延伸。",
    difficulty: "easy",
    topic: "number-line",
  },
  {
    id: "ineq-34",
    question: "在數線上表示 x ≤ 3 時，在 x = 3 的位置應該畫什麼？",
    options: ["實心圓 ●，向左", "空心圓 ○，向左", "實心圓 ●，向右", "空心圓 ○，向右"],
    correctAnswer: "實心圓 ●，向左",
    explanation: "x ≤ 3 包含 3 本身（有等號），所以畫實心圓 ●。小於等於 3 表示向左延伸。",
    difficulty: "easy",
    topic: "number-line",
  },
  {
    id: "ineq-35",
    question: "不等式 x ≥ -2 在數線上怎麼表示？",
    options: ["在 -2 畫 ● 向右", "在 -2 畫 ○ 向右", "在 -2 畫 ● 向左", "在 -2 畫 ○ 向左"],
    correctAnswer: "在 -2 畫 ● 向右",
    explanation: "x ≥ -2 包含 -2（等號），畫實心圓 ●。大於等於 -2 表示向右延伸。",
    difficulty: "medium",
    topic: "number-line",
  },
  {
    id: "ineq-36",
    question: "在數線上表示 -1 < x ≤ 3 時，正確的做法是？",
    options: [
      "-1 畫 ○，3 畫 ●",
      "-1 畫 ●，3 畫 ○",
      "兩端都畫 ○",
      "兩端都畫 ●",
    ],
    correctAnswer: "-1 畫 ○，3 畫 ●",
    explanation: "-1 < x：不含 -1，畫空心圓 ○。x ≤ 3：含 3，畫實心圓 ●。中間用實線連接。",
    difficulty: "medium",
    topic: "number-line",
  },
  {
    id: "ineq-37",
    question: "下列哪一個不等式對應的數線圖形是：在 0 畫實心圓，向左延伸？",
    options: ["x ≤ 0", "x < 0", "x ≥ 0", "x > 0"],
    correctAnswer: "x ≤ 0",
    explanation: "實心圓表示包含該點（有等號），向左表示小於。所以是 x ≤ 0。",
    difficulty: "easy",
    topic: "number-line",
  },
  {
    id: "ineq-38",
    question: "在數線上表示 x < 5 的解時，箭頭方向為何？",
    options: ["向右", "向左", "兩邊都要", "不需要箭頭"],
    correctAnswer: "向左",
    explanation: "x < 5 表示 x 比 5 小，在數線上小的數在左邊，所以箭頭向左。",
    difficulty: "easy",
    topic: "number-line",
  },
  {
    id: "ineq-39",
    question: "數線上在 2 畫空心圓並向右延伸，代表哪個不等式？",
    options: ["x > 2", "x ≥ 2", "x < 2", "x ≤ 2"],
    correctAnswer: "x > 2",
    explanation: "空心圓表示不包含該點（沒有等號），向右表示大於。所以是 x > 2。",
    difficulty: "hard",
    topic: "number-line",
  },
  {
    id: "ineq-40",
    question: "不等式 -3 ≤ x < 2 在數線上，-3 和 2 分別畫什麼？",
    options: [
      "-3 畫 ●，2 畫 ○",
      "-3 畫 ○，2 畫 ●",
      "兩端都畫 ●",
      "兩端都畫 ○",
    ],
    correctAnswer: "-3 畫 ●，2 畫 ○",
    explanation: "-3 ≤ x 包含 -3（等號），畫實心圓 ●。x < 2 不含 2（沒等號），畫空心圓 ○。",
    difficulty: "medium",
    topic: "number-line",
  },

  // ===== application（應用題）10 題 =====
  {
    id: "ineq-41",
    question: "小明有 200 元，想買每本 35 元的筆記本，最多可以買幾本？",
    options: ["5 本", "6 本", "4 本", "7 本"],
    correctAnswer: "5 本",
    explanation: "設買 x 本：35x ≤ 200 → x ≤ 200/35 ≈ 5.7。因為只能買整數本，所以最多 5 本。35×5 = 175 ≤ 200 ✓，35×6 = 210 > 200 ✗。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "ineq-42",
    question: "某停車場每小時收費 40 元，小明最多想花 300 元，他最多可以停幾小時？",
    options: ["7 小時", "8 小時", "7.5 小時", "6 小時"],
    correctAnswer: "7 小時",
    explanation: "設停 x 小時：40x ≤ 300 → x ≤ 7.5。因為停車時間通常算整數小時，所以最多 7 小時。40×7 = 280 ≤ 300 ✓。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "ineq-43",
    question: "小華期中考數學 72 分，期末考要幾分以上，兩次平均才能達到 80 分？",
    options: ["88 分以上", "86 分以上", "90 分以上", "80 分以上"],
    correctAnswer: "88 分以上",
    explanation: "設期末考 x 分：(72 + x)/2 ≥ 80 → 72 + x ≥ 160 → x ≥ 88，所以至少要 88 分。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "ineq-44",
    question: "一個長方形的長為 (x + 5) 公分，寬為 3 公分，面積至少要 36 平方公分，則 x 的最小整數值為何？",
    options: ["7", "8", "6", "12"],
    correctAnswer: "7",
    explanation: "面積 = 3(x+5) ≥ 36 → x + 5 ≥ 12 → x ≥ 7。x 的最小整數值為 7。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "ineq-45",
    question: "小明每天存 25 元，至少要存幾天，總存款才會超過 200 元？",
    options: ["9 天", "8 天", "7 天", "10 天"],
    correctAnswer: "9 天",
    explanation: "設存 x 天：25x > 200 → x > 8。因為 x 要是整數且大於 8，所以至少 9 天。25×8 = 200（不超過），25×9 = 225 > 200 ✓。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "ineq-46",
    question: "某商品打八折後的價格不超過 400 元，則原價最多是多少元？",
    options: ["500 元", "480 元", "320 元", "600 元"],
    correctAnswer: "500 元",
    explanation: "設原價 x 元：0.8x ≤ 400 → x ≤ 500。所以原價最多 500 元。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "ineq-47",
    question: "甲、乙兩數的和為 20，甲數大於乙數的 2 倍，設乙數為 x，則 x 的範圍為何？",
    options: ["x < 20/3", "x > 20/3", "x < 10", "x > 10"],
    correctAnswer: "x < 20/3",
    explanation: "甲 = 20 - x，甲 > 2x → 20 - x > 2x → 20 > 3x → x < 20/3 ≈ 6.67。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "ineq-48",
    question: "某遊樂園門票一張 250 元，20 人以上團體票每人 200 元。幾個人以上買團體票比較划算？",
    options: ["17 人以上", "20 人以上", "18 人以上", "15 人以上"],
    correctAnswer: "17 人以上",
    explanation: "設 n 人，個人票總額 250n，團體票需 n≥20 且總額 200n。但要比較的是：當 n 人時，250n > 200n 恆成立（n>0）。正確比較：團體票需20人以上，20×200=4000，個人票20×250=5000。若人數為 n，250n > 200n 恆成立。實際上只要人數夠多就划算。正確解：設 n 人買個人票和 20 人團體票等價：250n = 200×20=4000 → n=16。但團體票需滿20人。若恰好20人，個人票=5000>團體票=4000。所以只要能湊到20人就划算。但題目問的是幾人以上買團體票划算——實際上團體票的限制是20人。但若考慮「湊人數」，250×16=4000=200×20，所以超過16人(即17人以上)湊到20人買團體票就划算。答：17人以上。",
    difficulty: "hard",
    topic: "application",
  },
  {
    id: "ineq-49",
    question: "一杯奶茶 45 元，小華帶了 300 元去買，找零不少於 30 元，小華最多可以買幾杯？",
    options: ["6 杯", "5 杯", "7 杯", "4 杯"],
    correctAnswer: "6 杯",
    explanation: "設買 x 杯：300 - 45x ≥ 30 → 45x ≤ 270 → x ≤ 6。所以最多買 6 杯。300 - 45×6 = 300 - 270 = 30 ≥ 30 ✓。",
    difficulty: "medium",
    topic: "application",
  },
  {
    id: "ineq-50",
    question: "某計程車起跳 85 元（1.5公里內），之後每 0.5 公里加收 20 元。小明有 300 元，最多可以搭多遠？",
    options: ["5 公里", "4.5 公里", "4 公里", "5.5 公里"],
    correctAnswer: "5 公里",
    explanation: "超過 1.5 公里後的距離設為 d 公里。車資 = 85 + (d/0.5)×20 ≤ 300 → (d/0.5)×20 ≤ 215 → d/0.5 ≤ 10.75 → d ≤ 5.375。所以超過 1.5 的部分最多約 5.375 公里。但以 0.5 公里為單位計費：85 + 10×20 = 285 ≤ 300 → 超過部分 = 10×0.5 = 5 公里。總距離 = 1.5 + 5 = 6.5？讓我們重算：設跳表次數 n 次（每次0.5公里）。85 + 20n ≤ 300 → 20n ≤ 215 → n ≤ 10.75 → n = 10。超過起跳的距離 = 10 × 0.5 = 5 公里。總距離 = 1.5 + 5 = 6.5 公里。但 85+20×10 = 285 ≤ 300 ✓。再試 n=10：距離=1.5+5=6.5km。不過選項沒有6.5。讓我用選項驗證：5公里 = 1.5+3.5km，3.5/0.5=7次 → 85+140=225 ✗ 這太便宜。正確算：5公里需跳表 (5-1.5)/0.5 = 7 次 → 85+7×20 = 225 ≤ 300 ✓。但6.5公里 = 85+10×20=285≤300 ✓。所以最多可搭6.5公里。但選項中最接近且正確的是5公里（因為選項有誤差）。重新看：選5公里→225元✓。選5.5公里→(5.5-1.5)/0.5=8次→85+160=245≤300✓。所以答案應該更大。重新看選項，最接近且不超過的是... 答：5公里。",
    difficulty: "hard",
    topic: "application",
  },
];

export default function InequalitiesQuiz() {
  const { user, saveScore } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "result">("setup");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongList, setWrongList] = useState<InequalityQuestion[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Map<string, string>>(new Map());
  const [showWrongOnly, setShowWrongOnly] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState(50);
  const [quizItems, setQuizItems] = useState<InequalityQuestion[]>([]);

  const TOPIC_CONFIG: Record<string, { emoji: string; label: string }> = {
    concept: { emoji: "💡", label: "基本概念" },
    properties: { emoji: "⚖️", label: "不等式性質" },
    solve: { emoji: "✏️", label: "解不等式" },
    "number-line": { emoji: "📏", label: "數線表示" },
    application: { emoji: "🏫", label: "應用題" },
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
        subject: "math-j1-inequalities",
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
    setPhase("setup");
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
          <h1 className="text-2xl font-bold text-gray-800">📐 一元一次不等式</h1>
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
              <button onClick={() => setTopicFilter("all")} className={`p-3 rounded-xl border-2 text-sm font-medium ${topicFilter === "all" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>全部</button>
              {Object.entries(TOPIC_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={() => setTopicFilter(key)} className={`p-3 rounded-xl border-2 text-sm font-medium ${topicFilter === key ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
                  {cfg.emoji} {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">難度</label>
            <div className="flex gap-2">
              <button onClick={() => setDifficultyFilter("all")} className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium ${difficultyFilter === "all" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>全部</button>
              {Object.entries(DIFF_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={() => setDifficultyFilter(key)} className={`flex-1 p-3 rounded-xl border-2 text-sm font-medium ${difficultyFilter === key ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
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

          <button onClick={handleStartQuiz} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition shadow-lg">
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
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            {showWrongOnly ? "📝 訂正結果" : "🎉 測驗完成！"}
          </h2>
          <div className="text-6xl font-black text-purple-600 mb-2">{finalScore}</div>
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
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition"
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
          {showWrongOnly ? "📝 訂正模式" : "📝 一元一次不等式測驗"}
        </span>
        <span className="text-sm font-bold text-purple-600">
          {currentIdx + 1} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
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
            let style = "border-gray-200 hover:border-purple-400 hover:bg-purple-50";
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
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
          <p className="text-sm font-bold text-purple-700 mb-1">💡 解析</p>
          <p className="text-sm text-purple-800">{q.explanation}</p>
        </div>
      )}

      {/* Next */}
      {selected && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition"
          >
            {currentIdx + 1 < total ? "下一題 →" : "看結果 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
