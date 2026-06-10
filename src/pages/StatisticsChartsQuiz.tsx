import React, { useState } from "react";
import { useAuth, ExamScore, WrongQuestion } from "../contexts/AuthContext";

interface StatisticsQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: "chart-type" | "frequency-table" | "histogram" | "midpoint" | "mean" | "median" | "mode";
}

const QUESTIONS: StatisticsQuestion[] = [
  // ===== 長條圖、折線圖、圓形圖、列聯表辨識 (Q1-Q20) =====
  {
    id: "sc-1",
    question: "想要比較各班級的班級人數，最適合用哪種統計圖？",
    options: ["長條圖", "折線圖", "圓形圖", "散布圖"],
    correctAnswer: "長條圖",
    explanation: "長條圖適合用來比較各組資料的大小，例如不同班級的人數比較。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-2",
    question: "想要觀察一週氣溫的變化趨勢，最適合用哪種統計圖？",
    options: ["折線圖", "長條圖", "圓形圖", "直方圖"],
    correctAnswer: "折線圖",
    explanation: "折線圖用線段連接各數據點，最適合觀察資料隨時間的變化趨勢。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-3",
    question: "想要呈現班上同學喜歡各種運動的比例，最適合用哪種統計圖？",
    options: ["圓形圖", "長條圖", "折線圖", "直方圖"],
    correctAnswer: "圓形圖",
    explanation: "圓形圖（圓餅圖）最適合呈現各部分佔整體的比例，全部加起來等於 100%。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-4",
    question: "圓形圖中，所有扇形所佔的百分比加起來應該是多少？",
    options: ["100%", "50%", "90%", "不一定"],
    correctAnswer: "100%",
    explanation: "圓形圖表示各部分佔整體的比例，全部加起來必定是 100%。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-5",
    question: "下列哪一種圖表適合用來同時呈現兩種分類方式的資料？",
    options: ["列聯表", "長條圖", "折線圖", "圓形圖"],
    correctAnswer: "列聯表",
    explanation: "列聯表（交叉表）可以用兩個維度來分類資料，例如同時依性別和喜歡的科目來統計人數。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-6",
    question: "長條圖的特色是什麼？",
    options: ["各長條之間可以有空隙", "長條必須相連不間斷", "只能用來表示連續資料", "用線段連接各數據點"],
    correctAnswer: "各長條之間可以有空隙",
    explanation: "長條圖用來比較各組資料，資料間沒有連續關係，所以長條之間可以有空隙。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-7",
    question: "折線圖的特色是什麼？",
    options: ["用線段連接各數據點，可以看出變化趨勢", "用圓形的扇形表示比例", "長條之間有間隔", "只能用來表示分類資料"],
    correctAnswer: "用線段連接各數據點，可以看出變化趨勢",
    explanation: "折線圖將各數據點用線段連接起來，可以清楚看出資料的上升或下降趨勢。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-8",
    question: "某班調查喜歡的水果：蘋果 10 人、香蕉 8 人、橘子 6 人、西瓜 4 人。若要表示各種水果的偏好比例，最適合用什麼圖？",
    options: ["圓形圖", "折線圖", "直方圖", "次數分配表"],
    correctAnswer: "圓形圖",
    explanation: "要呈現各部分佔整體的比例，圓形圖最適合。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-9",
    question: "記錄一個月每天的最高氣溫，想要看出氣溫升降的變化，應該用哪種圖？",
    options: ["折線圖", "長條圖", "圓形圖", "列聯表"],
    correctAnswer: "折線圖",
    explanation: "折線圖最適合呈現隨時間變化的趨勢。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-10",
    question: "比較五位同學的數學成績高低，最適合用哪種圖？",
    options: ["長條圖", "折線圖", "圓形圖", "列聯表"],
    correctAnswer: "長條圖",
    explanation: "長條圖適合比較各組資料的大小差異，例如五位同學的成績比較。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-11",
    question: "下列哪一種圖的長條之間「沒有空隙」？",
    options: ["直方圖", "長條圖", "圓形圖", "折線圖"],
    correctAnswer: "直方圖",
    explanation: "直方圖用來表示連續資料的分組次數，各長條之間是相連的，沒有空隙。",
    difficulty: "medium",
    topic: "chart-type",
  },
  {
    id: "sc-12",
    question: "某班統計男女生喜歡的球類運動，用一個表格同時呈現「性別」和「球類」兩種分類。這是什麼圖表？",
    options: ["列聯表", "長條圖", "折線圖", "圓形圖"],
    correctAnswer: "列聯表",
    explanation: "列聯表可以同時用兩種分類方式來整理資料。",
    difficulty: "medium",
    topic: "chart-type",
  },
  {
    id: "sc-13",
    question: "圓形圖中，如果一個扇形佔了 25%，那它的圓心角是幾度？",
    options: ["90°", "45°", "180°", "25°"],
    correctAnswer: "90°",
    explanation: "圓心角 = 360° × 25% = 360° × 0.25 = 90°。",
    difficulty: "medium",
    topic: "chart-type",
  },
  {
    id: "sc-14",
    question: "圓形圖中，一個扇形佔了 50%，圓心角是幾度？",
    options: ["180°", "90°", "50°", "360°"],
    correctAnswer: "180°",
    explanation: "圓心角 = 360° × 50% = 360° × 0.5 = 180°。",
    difficulty: "medium",
    topic: "chart-type",
  },
  {
    id: "sc-15",
    question: "想要比較各國家的人口數量，應該選擇哪種統計圖？",
    options: ["長條圖", "折線圖", "圓形圖", "散布圖"],
    correctAnswer: "長條圖",
    explanation: "要比較不同類別的數量大小，長條圖最清楚。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-16",
    question: "某生態調查中，記錄了五種鳥類的數量。為了表示哪種鳥最多、哪種最少，應該用什麼圖？",
    options: ["長條圖", "折線圖", "圓形圖", "直方圖"],
    correctAnswer: "長條圖",
    explanation: "要比較各類別數量的多少，長條圖最適合。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-17",
    question: "一張圓形圖中，甲班同學占 120° 的扇形，則甲班占全部的百分之多少？",
    options: ["33.3%", "50%", "25%", "20%"],
    correctAnswer: "33.3%",
    explanation: "120° ÷ 360° = 1/3 ≈ 33.3%。",
    difficulty: "medium",
    topic: "chart-type",
  },
  {
    id: "sc-18",
    question: "下列哪一個情境不適合使用折線圖？",
    options: ["比較五個城市的面積", "記錄一年中每月的降雨量", "觀察一天中氣溫的變化", "追蹤一週的體重變化"],
    correctAnswer: "比較五個城市的面積",
    explanation: "比較不同城市的面積是靜態資料的比較，適合用長條圖而非折線圖。折線圖適合看隨時間變化的趨勢。",
    difficulty: "medium",
    topic: "chart-type",
  },
  {
    id: "sc-19",
    question: "列聯表的特色是什麼？",
    options: ["可以用兩種分類方式來整理資料", "用圓形表示比例", "用線段表示趨勢", "用長條比較大小"],
    correctAnswer: "可以用兩種分類方式來整理資料",
    explanation: "列聯表的特點是能同時用兩個不同的分類標準來整理和呈現資料。",
    difficulty: "easy",
    topic: "chart-type",
  },
  {
    id: "sc-20",
    question: "某校調查各年級學生的早餐習慣，用列聯表統計。列聯表的行和列分別可以代表什麼？",
    options: ["年級和早餐習慣", "人數和百分比", "長條和折線", "圓心和半徑"],
    correctAnswer: "年級和早餐習慣",
    explanation: "列聯表的兩個維度（行和列）分別代表兩種分類方式，例如年級和早餐習慣。",
    difficulty: "medium",
    topic: "chart-type",
  },

  // ===== 次數分配表 — 組距、分組規則 (Q21-Q40) =====
  {
    id: "sc-21",
    question: "次數分配表中，每個分組的範圍稱為什麼？",
    options: ["組距", "組中點", "次數", "累積次數"],
    correctAnswer: "組距",
    explanation: "組距是每個分組的範圍大小，也就是上限減去下限。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-22",
    question: "分組 60～70 的組距是多少？",
    options: ["10", "9", "5", "70"],
    correctAnswer: "10",
    explanation: "組距 = 上限 - 下限 = 70 - 60 = 10。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-23",
    question: "在統計分組中，「包含下限，不包含上限」是什麼意思？",
    options: ["資料 ≥ 下限且 ＜ 上限", "資料 ＞ 下限且 ≤ 上限", "資料 ≥ 下限且 ≤ 上限", "資料 ＞ 下限且 ＜ 上限"],
    correctAnswer: "資料 ≥ 下限且 ＜ 上限",
    explanation: "「包含下限，不包含上限」意思是資料大於或等於下限，但小於上限（不到上限）。",
    difficulty: "medium",
    topic: "frequency-table",
  },
  {
    id: "sc-24",
    question: "按照「包含下限，不包含上限」的規則，分數 40 分應該歸入哪一組？",
    options: ["40～50 組", "30～40 組", "39～40 組", "隨便哪一組都可以"],
    correctAnswer: "40～50 組",
    explanation: "40 分包含在 40～50 組的下限中（≥40 且 ＜50），所以歸入 40～50 組。",
    difficulty: "medium",
    topic: "frequency-table",
  },
  {
    id: "sc-25",
    question: "按照「包含下限，不包含上限」的規則，分數 50 分應該歸入哪一組？",
    options: ["50～60 組", "40～50 組", "45～55 組", "兩組都可以"],
    correctAnswer: "50～60 組",
    explanation: "50 分不含於 40～50 組（不包含上限 50），但包含在 50～60 組的下限中（≥50 且 ＜60），所以歸入 50～60 組。",
    difficulty: "medium",
    topic: "frequency-table",
  },
  {
    id: "sc-26",
    question: "按照「包含下限，不包含上限」的規則，分數 100 分應該歸入哪一組？",
    options: ["90～100 組", "100～110 組", "80～100 組", "無法分組"],
    correctAnswer: "90～100 組",
    explanation: "90～100 組是最後一組，100 分包含在這組的下限中。在實際應用上，最後一組會包含上限。",
    difficulty: "hard",
    topic: "frequency-table",
  },
  {
    id: "sc-27",
    question: "下列哪一個分數會歸入 70～80 組？（包含下限，不包含上限）",
    options: ["75 分", "80 分", "69 分", "60 分"],
    correctAnswer: "75 分",
    explanation: "75 分 ≥ 70 且 ＜ 80，符合 70～80 組的條件。80 分應歸入 80～90 組。",
    difficulty: "medium",
    topic: "frequency-table",
  },
  {
    id: "sc-28",
    question: "某次考試分數分組為 30～40、40～50、50～60、60～70、70～80、80～90、90～100，共幾組？",
    options: ["7 組", "6 組", "8 組", "5 組"],
    correctAnswer: "7 組",
    explanation: "從 30～40 到 90～100，共 7 個分組。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-29",
    question: "次數分配表中，「次數」是什麼意思？",
    options: ["落在該組的資料個數", "組距的大小", "分組的數量", "資料的總和"],
    correctAnswer: "落在該組的資料個數",
    explanation: "次數分配表中的「次數」指的是落在該組範圍內的資料筆數。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-30",
    question: "30 位學生的成績分組如下：30～40 有 3 人、40～50 有 2 人、50～60 有 3 人、60～70 有 5 人、70～80 有 4 人、80～90 有 7 人、90～100 有 6 人。請問各組次數的總和應該是多少？",
    options: ["30", "100", "7", "無法確定"],
    correctAnswer: "30",
    explanation: "各組次數的總和就是總人數：3+2+3+5+4+7+6 = 30 人。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-31",
    question: "承上題，哪一組的人數最多？",
    options: ["80～90 組", "90～100 組", "60～70 組", "70～80 組"],
    correctAnswer: "80～90 組",
    explanation: "80～90 組有 7 人，是所有分組中次數最多的。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-32",
    question: "某班 30 位學生的成績，分組從 30～40 到 90～100，每組的組距都是多少？",
    options: ["10", "5", "20", "15"],
    correctAnswer: "10",
    explanation: "每組的範圍是 10（例如 30～40、40～50 等），所以組距是 10。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-33",
    question: "在分組 50～60 中，按照「含下限不含上限」規則，下列哪一個成績不屬於這組？",
    options: ["60 分", "55 分", "52 分", "50 分"],
    correctAnswer: "60 分",
    explanation: "60 分 ≥ 60 但不 ＜ 60（等於上限），所以不屬於 50～60 組，應歸入 60～70 組。",
    difficulty: "medium",
    topic: "frequency-table",
  },
  {
    id: "sc-34",
    question: "某調查將年齡分為 10～20 歲、20～30 歲、30～40 歲。請問 20 歲應歸入哪組？",
    options: ["20～30 歲組", "10～20 歲組", "兩組都可以", "都不屬於"],
    correctAnswer: "20～30 歲組",
    explanation: "按照含下限不含上限的規則，20 歲不含於 10～20 組（上限 20 不含），但包含於 20～30 組（≥20 且 ＜30）。",
    difficulty: "hard",
    topic: "frequency-table",
  },
  {
    id: "sc-35",
    question: "在次數分配表中，如果分組為 60～70 有 5 人，表示什麼？",
    options: ["有 5 人的成績在 60 分以上且未滿 70 分", "有 5 人的成績是 65 分", "有 5 人的成績在 60 分以下", "有 5 人的成績超過 70 分"],
    correctAnswer: "有 5 人的成績在 60 分以上且未滿 70 分",
    explanation: "60～70 組有 5 人，表示有 5 人的成績 ≥60 且 ＜70。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-36",
    question: "如果將成績以每 5 分為一組來分組，從 30 分開始，第一組是 30～35，第二組是什麼？",
    options: ["35～40", "36～40", "30～40", "35～45"],
    correctAnswer: "35～40",
    explanation: "組距為 5，下一組的下限是上一組的上限 35，所以第二組是 35～40。",
    difficulty: "medium",
    topic: "frequency-table",
  },
  {
    id: "sc-37",
    question: "某次數分配表共 7 組，組距 10，最後一組是 90～100。請問第一組是什麼？",
    options: ["30～40", "20～30", "40～50", "10～20"],
    correctAnswer: "30～40",
    explanation: "7 組 × 10（組距）= 70，最後一組上限 100 - 70 = 30，所以第一組是 30～40。",
    difficulty: "hard",
    topic: "frequency-table",
  },
  {
    id: "sc-38",
    question: "分組 40～50 有 2 人，50～60 有 3 人。請問 40 分以上且未滿 60 分的共有幾人？",
    options: ["5 人", "6 人", "2 人", "3 人"],
    correctAnswer: "5 人",
    explanation: "40～50 組 2 人 + 50～60 組 3 人 = 5 人。",
    difficulty: "easy",
    topic: "frequency-table",
  },
  {
    id: "sc-39",
    question: "某調查的資料範圍是 15～95，若要分成 8 組，每組的組距至少要是多少？",
    options: ["10", "8", "12", "5"],
    correctAnswer: "10",
    explanation: "資料範圍 = 95 - 15 = 80，80 ÷ 8 = 10，所以組距至少為 10。",
    difficulty: "hard",
    topic: "frequency-table",
  },
  {
    id: "sc-40",
    question: "在製作次數分配表時，先將資料由小到大排列的好處是什麼？",
    options: ["方便計算中位數和分組", "讓圖表更漂亮", "可以省略部分資料", "不需要排列也可以"],
    correctAnswer: "方便計算中位數和分組",
    explanation: "排列後容易看出資料的分布範圍，方便決定組距和進行分組，也利於計算中位數。",
    difficulty: "medium",
    topic: "frequency-table",
  },

  // ===== 直方圖 vs 長條圖區別 (Q41-Q50) =====
  {
    id: "sc-41",
    question: "直方圖和長條圖最大的差別是什麼？",
    options: ["直方圖的長條之間沒有空隙", "直方圖不能用彩色", "長條圖的長條比較寬", "兩者完全相同"],
    correctAnswer: "直方圖的長條之間沒有空隙",
    explanation: "直方圖表示的是連續資料的分組，各長條相連沒有空隙；長條圖表示的是分類資料，長條之間有空隙。",
    difficulty: "easy",
    topic: "histogram",
  },
  {
    id: "sc-42",
    question: "直方圖適合用來呈現什麼類型的資料？",
    options: ["連續型資料（如身高、分數）", "分類資料（如喜歡的顏色）", "文字資料", "時間資料"],
    correctAnswer: "連續型資料（如身高、分數）",
    explanation: "直方圖用來呈現連續型資料的分組次數分配，例如身高、體重、考試成績等。",
    difficulty: "easy",
    topic: "histogram",
  },
  {
    id: "sc-43",
    question: "長條圖適合用來呈現什麼類型的資料？",
    options: ["分類資料（如不同類別的數量）", "連續型資料", "變化趨勢", "比例分配"],
    correctAnswer: "分類資料（如不同類別的數量）",
    explanation: "長條圖適合呈現分類資料的比較，例如各種水果的數量、各班的人數等。",
    difficulty: "easy",
    topic: "histogram",
  },
  {
    id: "sc-44",
    question: "下列哪一個是直方圖的特性？",
    options: ["長條之間沒有空隙，資料是連續的", "長條之間有空隙", "只能用三種顏色", "適合呈現分類資料"],
    correctAnswer: "長條之間沒有空隙，資料是連續的",
    explanation: "直方圖的長條相連，因為它呈現的是連續資料，組與組之間沒有間斷。",
    difficulty: "easy",
    topic: "histogram",
  },
  {
    id: "sc-45",
    question: "小明畫了一張統計圖，長條和長條之間有間隔。這可能是什麼圖？",
    options: ["長條圖", "直方圖", "折線圖", "圓形圖"],
    correctAnswer: "長條圖",
    explanation: "長條圖的長條之間有空隙，用來呈現不連續的分類資料。",
    difficulty: "easy",
    topic: "histogram",
  },
  {
    id: "sc-46",
    question: "小華要畫一張表示 30 位同學成績分布的圖，長條之間相連無間隔。這是什麼圖？",
    options: ["直方圖", "長條圖", "折線圖", "圓形圖"],
    correctAnswer: "直方圖",
    explanation: "長條之間相連無間隔是直方圖的特徵，用來呈現連續資料的分布。",
    difficulty: "easy",
    topic: "histogram",
  },
  {
    id: "sc-47",
    question: "下列哪一組資料適合用直方圖來呈現？",
    options: ["30 位學生的考試成績分布", "四個季節的名稱", "五位同學的姓名", "三種動物的種類"],
    correctAnswer: "30 位學生的考試成績分布",
    explanation: "考試成績是連續型資料，適合用直方圖來呈現其分布狀況。",
    difficulty: "medium",
    topic: "histogram",
  },
  {
    id: "sc-48",
    question: "下列哪一組資料適合用長條圖而非直方圖？",
    options: ["各種水果的銷售量比較", "全班身高的分布", "每天氣溫的分布", "考試成績的分組次數"],
    correctAnswer: "各種水果的銷售量比較",
    explanation: "水果種類是分類資料（非連續），適合用長條圖來比較。其他選項都是連續資料，適合直方圖。",
    difficulty: "medium",
    topic: "histogram",
  },
  {
    id: "sc-49",
    question: "直方圖的橫軸代表什麼？",
    options: ["各組的範圍（分組區間）", "各類別的名稱", "時間", "百分比"],
    correctAnswer: "各組的範圍（分組區間）",
    explanation: "直方圖的橫軸代表連續資料的分組區間，如 30～40、40～50 等。",
    difficulty: "medium",
    topic: "histogram",
  },
  {
    id: "sc-50",
    question: "長條圖的橫軸通常代表什麼？",
    options: ["各類別的名稱", "連續的數值範圍", "時間的先後順序", "百分比"],
    correctAnswer: "各類別的名稱",
    explanation: "長條圖的橫軸通常代表不同的類別名稱，如蘋果、香蕉、橘子等。",
    difficulty: "medium",
    topic: "histogram",
  },

  // ===== 組中點計算 (Q51-Q65) =====
  {
    id: "sc-51",
    question: "組中點的計算公式是什麼？",
    options: ["(下限 + 上限) ÷ 2", "上限 - 下限", "上限 + 下限", "(上限 - 下限) ÷ 2"],
    correctAnswer: "(下限 + 上限) ÷ 2",
    explanation: "組中點 = (下限 + 上限) ÷ 2，是該組範圍正中間的數值。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-52",
    question: "分組 30～40 的組中點是多少？",
    options: ["35", "30", "40", "10"],
    correctAnswer: "35",
    explanation: "組中點 = (30 + 40) ÷ 2 = 70 ÷ 2 = 35。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-53",
    question: "分組 40～50 的組中點是多少？",
    options: ["45", "40", "50", "10"],
    correctAnswer: "45",
    explanation: "組中點 = (40 + 50) ÷ 2 = 90 ÷ 2 = 45。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-54",
    question: "分組 50～60 的組中點是多少？",
    options: ["55", "50", "60", "110"],
    correctAnswer: "55",
    explanation: "組中點 = (50 + 60) ÷ 2 = 110 ÷ 2 = 55。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-55",
    question: "分組 60～70 的組中點是多少？",
    options: ["65", "60", "70", "130"],
    correctAnswer: "65",
    explanation: "組中點 = (60 + 70) ÷ 2 = 130 ÷ 2 = 65。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-56",
    question: "分組 70～80 的組中點是多少？",
    options: ["75", "70", "80", "150"],
    correctAnswer: "75",
    explanation: "組中點 = (70 + 80) ÷ 2 = 150 ÷ 2 = 75。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-57",
    question: "分組 80～90 的組中點是多少？",
    options: ["85", "80", "90", "170"],
    correctAnswer: "85",
    explanation: "組中點 = (80 + 90) ÷ 2 = 170 ÷ 2 = 85。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-58",
    question: "分組 90～100 的組中點是多少？",
    options: ["95", "90", "100", "190"],
    correctAnswer: "95",
    explanation: "組中點 = (90 + 100) ÷ 2 = 190 ÷ 2 = 95。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-59",
    question: "某分組的組中點是 50，組距為 10，則該組的範圍可能是什麼？",
    options: ["45～55", "40～50", "50～60", "45～50"],
    correctAnswer: "45～55",
    explanation: "組中點 50，組距 10，下限 = 50 - 5 = 45，上限 = 50 + 5 = 55，所以範圍是 45～55。",
    difficulty: "hard",
    topic: "midpoint",
  },
  {
    id: "sc-60",
    question: "若組距為 5，第一組為 30～35，則第三組的組中點是多少？",
    options: ["42.5", "37.5", "40", "45"],
    correctAnswer: "42.5",
    explanation: "第一組 30～35（組中點 32.5），第二組 35～40（組中點 37.5），第三組 40～45（組中點 = (40+45)÷2 = 42.5）。",
    difficulty: "hard",
    topic: "midpoint",
  },
  {
    id: "sc-61",
    question: "某身高調查的分組為 140～150 公分，組中點是多少？",
    options: ["145 公分", "140 公分", "150 公分", "10 公分"],
    correctAnswer: "145 公分",
    explanation: "組中點 = (140 + 150) ÷ 2 = 290 ÷ 2 = 145 公分。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-62",
    question: "分組 150～160 公分的組中點是多少？",
    options: ["155 公分", "150 公分", "160 公分", "10 公分"],
    correctAnswer: "155 公分",
    explanation: "組中點 = (150 + 160) ÷ 2 = 310 ÷ 2 = 155 公分。",
    difficulty: "easy",
    topic: "midpoint",
  },
  {
    id: "sc-63",
    question: "組距為 20 的分組中，若某一組的下限是 60，則這組的組中點是多少？",
    options: ["70", "60", "80", "40"],
    correctAnswer: "70",
    explanation: "下限 60，組距 20，上限 = 60 + 20 = 80。組中點 = (60 + 80) ÷ 2 = 140 ÷ 2 = 70。",
    difficulty: "medium",
    topic: "midpoint",
  },
  {
    id: "sc-64",
    question: "若某組的組中點是 75，組距是 10，則這組的上限是多少？",
    options: ["80", "70", "85", "75"],
    correctAnswer: "80",
    explanation: "組中點 75，組距 10，上限 = 組中點 + 組距÷2 = 75 + 5 = 80。",
    difficulty: "medium",
    topic: "midpoint",
  },
  {
    id: "sc-65",
    question: "連續五組的組中點分別是 35、45、55、65、75，請問每組的組距是多少？",
    options: ["10", "5", "20", "15"],
    correctAnswer: "10",
    explanation: "相鄰兩組中點的差 = 45 - 35 = 10，這正好等於組距。",
    difficulty: "medium",
    topic: "midpoint",
  },

  // ===== 平均數（未分組+分組）(Q66-Q80) =====
  {
    id: "sc-66",
    question: "平均數的計算公式是什麼？",
    options: ["總和 ÷ 個數", "最大值 - 最小值", "最中間的數", "出現最多次的數"],
    correctAnswer: "總和 ÷ 個數",
    explanation: "平均數 = 所有資料的總和 ÷ 資料的個數。",
    difficulty: "easy",
    topic: "mean",
  },
  {
    id: "sc-67",
    question: "五筆資料：12、15、18、20、25，平均數是多少？",
    options: ["18", "15", "20", "12"],
    correctAnswer: "18",
    explanation: "平均數 = (12 + 15 + 18 + 20 + 25) ÷ 5 = 90 ÷ 5 = 18。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-68",
    question: "六筆資料：10、20、30、40、50、60，平均數是多少？",
    options: ["35", "30", "40", "45"],
    correctAnswer: "35",
    explanation: "平均數 = (10 + 20 + 30 + 40 + 50 + 60) ÷ 6 = 210 ÷ 6 = 35。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-69",
    question: "分組平均數的計算公式是什麼？",
    options: ["Σ(組中點 × 次數) ÷ 總次數", "各組中點相加 ÷ 組數", "最大組中點 + 最小組中點 ÷ 2", "Σ次數 ÷ 組數"],
    correctAnswer: "Σ(組中點 × 次數) ÷ 總次數",
    explanation: "分組平均數 = 所有組的（組中點 × 次數）之和 ÷ 總次數。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-70",
    question: "利用分組資料：30～40 有 3 人、40～50 有 2 人、50～60 有 3 人，這三組的組中點分別是多少？",
    options: ["35、45、55", "30、40、50", "40、50、60", "33、44、55"],
    correctAnswer: "35、45、55",
    explanation: "30～40 組中點 = 35，40～50 組中點 = 45，50～60 組中點 = 55。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-71",
    question: "30 位學生的分組資料：30～40(3人)、40～50(2人)、50～60(3人)、60～70(5人)、70～80(4人)、80～90(7人)、90～100(6人)。Σ(組中點 × 次數) 的值是多少？",
    options: ["2190", "2100", "2300", "2000"],
    correctAnswer: "2150",
    explanation: "35×3 + 45×2 + 55×3 + 65×5 + 75×4 + 85×7 + 95×6 = 105 + 90 + 165 + 325 + 300 + 595 + 570 = 2150。",
    difficulty: "hard",
    topic: "mean",
  },
  {
    id: "sc-72",
    question: "承上題，這 30 位學生的分組平均數大約是多少？（Σ(組中點×次數) = 2150）",
    options: ["約 71.7 分", "約 65 分", "約 80 分", "約 60 分"],
    correctAnswer: "約 71.7 分",
    explanation: "分組平均數 = 2150 ÷ 30 ≈ 71.7 分。",
    difficulty: "hard",
    topic: "mean",
  },
  {
    id: "sc-73",
    question: "三筆資料的平均數是 20，已知其中兩筆是 18 和 22，第三筆是多少？",
    options: ["20", "18", "22", "16"],
    correctAnswer: "20",
    explanation: "平均數 20 → 總和 = 20 × 3 = 60。第三筆 = 60 - 18 - 22 = 20。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-74",
    question: "五筆資料的平均數是 15，總和是多少？",
    options: ["75", "15", "3", "45"],
    correctAnswer: "75",
    explanation: "總和 = 平均數 × 個數 = 15 × 5 = 75。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-75",
    question: "七筆資料的總和是 210，平均數是多少？",
    options: ["30", "15", "42", "21"],
    correctAnswer: "30",
    explanation: "平均數 = 總和 ÷ 個數 = 210 ÷ 7 = 30。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-76",
    question: "小明四次考試的分數分別為 80、85、90、85，平均分數是多少？",
    options: ["85", "80", "90", "87.5"],
    correctAnswer: "85",
    explanation: "平均數 = (80 + 85 + 90 + 85) ÷ 4 = 340 ÷ 4 = 85。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-77",
    question: "甲班 20 人平均 80 分，乙班 30 人平均 70 分，兩班合併後的平均分數是多少？",
    options: ["74 分", "75 分", "70 分", "80 分"],
    correctAnswer: "74 分",
    explanation: "合併後平均 = (20×80 + 30×70) ÷ (20+30) = (1600 + 2100) ÷ 50 = 3700 ÷ 50 = 74 分。",
    difficulty: "hard",
    topic: "mean",
  },
  {
    id: "sc-78",
    question: "10 個數的平均是 50，若再加入一個 60，新的平均是多少？",
    options: ["51", "50", "55", "60"],
    correctAnswer: "51",
    explanation: "原總和 = 50 × 10 = 500，新總和 = 500 + 60 = 560，新平均 = 560 ÷ 11 ≈ 50.9，最接近 51。",
    difficulty: "hard",
    topic: "mean",
  },
  {
    id: "sc-79",
    question: "分組資料中，60～70 有 5 人。計算分組平均數時，這組對 Σ(組中點×次數) 的貢獻是多少？",
    options: ["325", "65", "350", "300"],
    correctAnswer: "325",
    explanation: "組中點 = (60+70)÷2 = 65，貢獻 = 65 × 5 = 325。",
    difficulty: "medium",
    topic: "mean",
  },
  {
    id: "sc-80",
    question: "某生三次月考的平均是 88 分，前兩次分別是 85 和 90 分，第三次是多少分？",
    options: ["89 分", "88 分", "85 分", "90 分"],
    correctAnswer: "89 分",
    explanation: "總和 = 88 × 3 = 264，第三次 = 264 - 85 - 90 = 89 分。",
    difficulty: "medium",
    topic: "mean",
  },

  // ===== 中位數 (Q81-Q90) =====
  {
    id: "sc-81",
    question: "中位數的定義是什麼？",
    options: ["將資料由小到大排列後，最中間的數", "出現最多次的數", "所有數的總和除以個數", "最大的數和最小的數的平均"],
    correctAnswer: "將資料由小到大排列後，最中間的數",
    explanation: "中位數是將資料排序後，位於正中間的那個數值。",
    difficulty: "easy",
    topic: "median",
  },
  {
    id: "sc-82",
    question: "五筆資料：3、7、5、9、1，中位數是多少？",
    options: ["5", "7", "3", "9"],
    correctAnswer: "5",
    explanation: "先排序：1、3、5、7、9。共 5 個數，中位數是第 3 個 = 5。",
    difficulty: "easy",
    topic: "median",
  },
  {
    id: "sc-83",
    question: "六筆資料：2、8、4、6、10、12，中位數是多少？",
    options: ["7", "6", "4", "8"],
    correctAnswer: "7",
    explanation: "先排序：2、4、6、8、10、12。共 6 個（偶數），中位數 = (第3個 + 第4個) ÷ 2 = (6 + 8) ÷ 2 = 7。",
    difficulty: "medium",
    topic: "median",
  },
  {
    id: "sc-84",
    question: "當資料的個數是偶數時，中位數怎麼算？",
    options: ["取中間兩個數的平均", "取最中間的那個數", "取最大的數", "取最小的數"],
    correctAnswer: "取中間兩個數的平均",
    explanation: "當資料個數為偶數時，中位數是排序後中間兩個數的平均值。",
    difficulty: "easy",
    topic: "median",
  },
  {
    id: "sc-85",
    question: "七筆資料：10、20、30、40、50、60、70，中位數是多少？",
    options: ["40", "30", "50", "35"],
    correctAnswer: "40",
    explanation: "已排序，共 7 個數，中位數是第 (7+1)÷2 = 4 個 = 40。",
    difficulty: "easy",
    topic: "median",
  },
  {
    id: "sc-86",
    question: "八筆資料：5、10、15、20、25、30、35、40，中位數是多少？",
    options: ["22.5", "20", "25", "30"],
    correctAnswer: "22.5",
    explanation: "已排序，共 8 個數，中位數 = (20 + 25) ÷ 2 = 22.5。",
    difficulty: "medium",
    topic: "median",
  },
  {
    id: "sc-87",
    question: "資料：1、3、5、7、9、11、13、15，中位數是多少？",
    options: ["8", "7", "9", "6"],
    correctAnswer: "8",
    explanation: "已排序，共 8 個數（偶數），中位數 = (第4個 + 第5個) ÷ 2 = (7 + 9) ÷ 2 = 8。",
    difficulty: "medium",
    topic: "median",
  },
  {
    id: "sc-88",
    question: "九筆資料：2、4、6、8、10、12、14、16、18，中位數是多少？",
    options: ["10", "8", "12", "9"],
    correctAnswer: "10",
    explanation: "已排序，共 9 個數，中位數是第 (9+1)÷2 = 5 個 = 10。",
    difficulty: "easy",
    topic: "median",
  },
  {
    id: "sc-89",
    question: "一班 30 位學生的成績由小到大排列，第 15 和第 16 個數分別是 70 和 72。這班的中位數是多少？",
    options: ["71", "70", "72", "73"],
    correctAnswer: "71",
    explanation: "30 個數（偶數），中位數 = (第15個 + 第16個) ÷ 2 = (70 + 72) ÷ 2 = 71。",
    difficulty: "medium",
    topic: "median",
  },
  {
    id: "sc-90",
    question: "五筆資料：100、95、85、90、80，中位數是多少？",
    options: ["90", "85", "95", "80"],
    correctAnswer: "90",
    explanation: "先排序：80、85、90、95、100。共 5 個數，中位數是第 3 個 = 90。",
    difficulty: "easy",
    topic: "median",
  },

  // ===== 眾數 (Q91-Q100) =====
  {
    id: "sc-91",
    question: "眾數的定義是什麼？",
    options: ["出現最多次的數", "最中間的數", "所有數的平均", "最大的數"],
    correctAnswer: "出現最多次的數",
    explanation: "眾數是一組資料中出現次數最多的那個數值。",
    difficulty: "easy",
    topic: "mode",
  },
  {
    id: "sc-92",
    question: "資料：5、3、5、7、5、8、3，眾數是多少？",
    options: ["5", "3", "7", "8"],
    correctAnswer: "5",
    explanation: "5 出現 3 次，3 出現 2 次，7 和 8 各出現 1 次。5 出現最多次，所以眾數是 5。",
    difficulty: "easy",
    topic: "mode",
  },
  {
    id: "sc-93",
    question: "資料：10、20、30、20、40、20，眾數是多少？",
    options: ["20", "10", "30", "40"],
    correctAnswer: "20",
    explanation: "20 出現 3 次，其他數值各出現 1 次。20 出現最多次，所以眾數是 20。",
    difficulty: "easy",
    topic: "mode",
  },
  {
    id: "sc-94",
    question: "一組資料中，每個數值出現的次數都相同，這組資料有沒有眾數？",
    options: ["沒有眾數（或說每個都是眾數）", "最大的是眾數", "最小的是眾數", "平均數就是眾數"],
    correctAnswer: "沒有眾數（或說每個都是眾數）",
    explanation: "如果每個數值出現的次數都相同，就沒有特別突出的數，可以說沒有眾數。",
    difficulty: "easy",
    topic: "mode",
  },
  {
    id: "sc-95",
    question: "資料：4、6、8、4、6、4，眾數是多少？",
    options: ["4", "6", "8", "4 和 6"],
    correctAnswer: "4",
    explanation: "4 出現 3 次，6 出現 2 次，8 出現 1 次。4 出現最多次，所以眾數是 4。",
    difficulty: "easy",
    topic: "mode",
  },
  {
    id: "sc-96",
    question: "資料：7、7、8、8、9，這組資料的眾數是什麼？",
    options: ["7 和 8（雙眾數）", "只有 7", "只有 8", "9"],
    correctAnswer: "7 和 8（雙眾數）",
    explanation: "7 出現 2 次，8 也出現 2 次，兩者都是出現最多次的，所以有兩個眾數：7 和 8。",
    difficulty: "medium",
    topic: "mode",
  },
  {
    id: "sc-97",
    question: "某班 30 位學生考試成績的分組中，80～90 組有 7 人（最多人），這組是否就是眾數所在的組？",
    options: ["是，因為 80～90 組的次數最多", "不是，要看個別分數", "不一定，要看組距", "無法判斷"],
    correctAnswer: "是，因為 80～90 組的次數最多",
    explanation: "在分組資料中，次數最多的那一組稱為「眾數組」。80～90 組有 7 人（最多），所以是眾數組。",
    difficulty: "medium",
    topic: "mode",
  },
  {
    id: "sc-98",
    question: "一家商店記錄一週內每天賣出的便當數：30、35、30、40、30、45、35。這組資料的眾數是多少？",
    options: ["30", "35", "40", "45"],
    correctAnswer: "30",
    explanation: "30 出現 3 次，35 出現 2 次，40 和 45 各出現 1 次。30 出現最多次，所以眾數是 30。",
    difficulty: "easy",
    topic: "mode",
  },
  {
    id: "sc-99",
    question: "下列關於平均數、中位數、眾數的敘述，哪一個正確？",
    options: ["平均數是所有資料的總和除以個數", "中位數一定等於平均數", "眾數一定是最大的數", "一組資料只能有一個眾數"],
    correctAnswer: "平均數是所有資料的總和除以個數",
    explanation: "平均數 = 總和 ÷ 個數，這是正確的。中位數不一定等於平均數；眾數不一定最大；一組資料可以有多個眾數。",
    difficulty: "medium",
    topic: "mode",
  },
  {
    id: "sc-100",
    question: "資料：85、90、85、92、85、88、90。這組資料的平均數、中位數、眾數分別是多少？",
    options: ["平均約 87.9、中位數 88、眾數 85", "平均 85、中位數 90、眾數 85", "平均 90、中位數 85、眾數 90", "平均 85、中位數 85、眾數 90"],
    correctAnswer: "平均約 87.9、中位數 88、眾數 85",
    explanation: "平均 = (85+90+85+92+85+88+90)÷7 = 615÷7 ≈ 87.9。排序：85,85,85,88,90,90,92，中位數=第4個=88。85出現3次（最多），眾數=85。",
    difficulty: "medium",
    topic: "mode",
  },
];

export default function StatisticsChartsQuiz() {
  const { user, saveScore } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "result">("setup");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongList, setWrongList] = useState<StatisticsQuestion[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Map<string, string>>(new Map());
  const [showWrongOnly, setShowWrongOnly] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState(50);
  const [quizItems, setQuizItems] = useState<StatisticsQuestion[]>([]);

  const TOPIC_CONFIG: Record<string, { emoji: string; label: string }> = {
    "chart-type": { emoji: "📊", label: "圖表辨識" },
    "frequency-table": { emoji: "📋", label: "次數分配表" },
    histogram: { emoji: "📈", label: "直方圖" },
    midpoint: { emoji: "🎯", label: "組中點" },
    mean: { emoji: "🧮", label: "平均數" },
    median: { emoji: "📏", label: "中位數" },
    mode: { emoji: "🏆", label: "眾數" },
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
        subject: "math-j1-statistics-charts",
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
          <h1 className="text-2xl font-bold text-gray-800">📊 5-1 統計圖表與資料分析</h1>
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
            <div className="grid grid-cols-4 gap-2">
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
          {showWrongOnly ? "📝 訂正模式" : "📝 統計圖表與資料分析測驗"}
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
