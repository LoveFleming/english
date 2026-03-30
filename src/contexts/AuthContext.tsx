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
  saveScore: (score: ExamScore) => void;
  exportWrongQuestions: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<ExamScore[]>([]);

  useEffect(() => {
    const session = sessionStorage.getItem("english_app_session");
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
      fetch(`${API}?action=scores&username=${encodeURIComponent(userData.username)}`)
        .then(r => r.json())
        .then(data => setScores(data))
        .catch(() => setScores([]));
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
        const scoresRes = await fetch(`${API}?action=scores&username=${encodeURIComponent(username)}`);
        setScores(await scoresRes.json());
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

  const saveScore = (score: ExamScore) => {
    if (!user) return;
    const newScores = [score, ...scores];
    setScores(newScores);
    fetch(`${API}?action=save-score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username, score }),
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
      login, register, logout, saveScore, exportWrongQuestions,
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
