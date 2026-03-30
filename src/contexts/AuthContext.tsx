import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API = "/api/auth";

export interface User {
  username: string;
  createdAt: string;
}

export interface ExamScore {
  id: string;
  date: string;
  subject?: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  wrongQuestions: WrongQuestion[];
}

export interface WrongQuestion {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
}

interface AuthContextType {
  user: User | null;
  scores: ExamScore[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  saveScore: (score: ExamScore, questionResults?: { id: string; isCorrect: boolean }[]) => void;
  exportWrongQuestions: () => string;
  questionStatus: Record<string, 'success' | 'fail'>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<ExamScore[]>([]);
  const [questionStatus, setQuestionStatus] = useState<Record<string, 'success' | 'fail'>>({});

  useEffect(() => {
    const session = sessionStorage.getItem("english_app_session");
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
      Promise.all([
        fetch(`${API}?action=scores&username=${encodeURIComponent(userData.username)}`).then(r => r.json()),
        fetch(`${API}?action=question-status&username=${encodeURIComponent(userData.username)}`).then(r => r.json()),
      ]).then(([scoresData, statusData]) => {
        setScores(scoresData);
        setQuestionStatus(statusData);
      }).catch(() => {});
    }
  }, []);

  const register = async (username: string, password: string): Promise<boolean> => {
    if (!username || !password || username.length < 3 || password.length < 3) return false;
    try {
      const res = await fetch(`${API}?action=register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        const newUser: User = { username, createdAt: new Date().toISOString() };
        setUser(newUser);
        setScores([]);
        sessionStorage.setItem("english_app_session", JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch { return false; }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    if (!username || !password) return false;
    try {
      const res = await fetch(`${API}?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        const userData: User = { username, createdAt: data.createdAt };
        setUser(userData);
        const [scoresRes, statusRes] = await Promise.all([
          fetch(`${API}?action=scores&username=${encodeURIComponent(username)}`),
          fetch(`${API}?action=question-status&username=${encodeURIComponent(username)}`),
        ]);
        setScores(await scoresRes.json());
        setQuestionStatus(await statusRes.json());
        sessionStorage.setItem("english_app_session", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch { return false; }
  };

  const logout = () => {
    setUser(null);
    setScores([]);
    sessionStorage.removeItem("english_app_session");
  };

  const saveScore = (score: ExamScore, questionResults?: { id: string; isCorrect: boolean }[]) => {
    if (!user) return;
    const newScores = [score, ...scores];
    setScores(newScores);
    // Update local question status
    if (questionResults) {
      setQuestionStatus(prev => {
        const next = { ...prev };
        for (const qr of questionResults) {
          next[qr.id] = qr.isCorrect ? 'success' : 'fail';
        }
        return next;
      });
    }
    fetch(`${API}?action=save-score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, score, questionResults }),
    }).catch(() => {});
  };

  const exportWrongQuestions = (): string => {
    if (!user || scores.length === 0) return "";
    const allWrong: WrongQuestion[] = [];
    scores.forEach(s => allWrong.push(...s.wrongQuestions));
    const unique = Array.from(new Map(allWrong.map(q => [q.id, q])).values());
    return JSON.stringify(unique, null, 2);
  };

  return (
    <AuthContext.Provider value={{
      user, scores, isAuthenticated: !!user,
      login, register, logout, saveScore, exportWrongQuestions, questionStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
