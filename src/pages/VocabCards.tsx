import { useState } from "react";

interface VocabCard {
  word: string;
  meaning: string;
  example: string;
  emoji: string;
}

const vocabCards: VocabCard[] = [
  { word: "Adventure", meaning: "冒險", example: "Let's go on an adventure!", emoji: "🎒" },
  { word: "Brilliant", meaning: "出色的", example: "That's a brilliant idea!", emoji: "⭐" },
  { word: "Curious", meaning: "好奇的", example: "I'm curious about this book.", emoji: "🤔" },
  { word: "Diligent", meaning: "勤奮的", example: "She is a diligent student.", emoji: "📚" },
  { word: "Enthusiastic", meaning: "熱情的", example: "He's very enthusiastic about sports.", emoji: "🔥" },
  { word: "Fantastic", meaning: "極好的", example: "You did a fantastic job!", emoji: "🌟" },
  { word: "Grateful", meaning: "感激的", example: "I'm grateful for your help.", emoji: "🙏" },
  { word: "Hamburger", meaning: "漢堡", example: "I love eating hamburgers.", emoji: "🍔" },
];

export default function VocabCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());

  const currentCard = vocabCards[currentIndex];
  const progress = ((currentIndex + 1) / vocabCards.length) * 100;

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % vocabCards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + vocabCards.length) % vocabCards.length);
    }, 150);
  };

  const markAsKnown = () => {
    setKnownCards((prev) => new Set(prev).add(currentIndex));
    nextCard();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">📖 Vocabulary Flashcards</h1>
        <p className="text-zinc-500">點擊卡片來翻轉，看看英文單字的意思！</p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md h-2 bg-zinc-200 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <div 
        className="relative w-80 h-52 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl border-2 border-blue-200 flex flex-col items-center justify-center p-6">
            <span className="text-6xl mb-4">{currentCard.emoji}</span>
            <h2 className="text-3xl font-bold text-zinc-800">{currentCard.word}</h2>
            <p className="text-zinc-400 mt-2">點擊翻轉 →</p>
          </div>
          
          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl border-2 border-purple-200 flex flex-col items-center justify-center p-6 rotate-y-180">
            <span className="text-4xl mb-2">{currentCard.emoji}</span>
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{currentCard.meaning}</h3>
            <p className="text-sm text-zinc-600 italic mt-2">"{currentCard.example}"</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-8">
        <button 
          onClick={(e) => { e.stopPropagation(); prevCard(); }}
          className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-medium transition-colors"
        >
          ← 上一張
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); markAsKnown(); }}
          className="px-6 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl font-medium transition-colors"
        >
          ✓ 認識了！
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); nextCard(); }}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
        >
          下一張 →
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 text-center">
        <p className="text-zinc-500">
          第 {currentIndex + 1} / {vocabCards.length} 張卡片
          <span className="ml-2 text-green-600">✓ 已學會 {knownCards.size} 張</span>
        </p>
      </div>
    </div>
  );
}