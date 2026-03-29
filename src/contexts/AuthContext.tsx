import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
  saveScore: (score: ExamScore) => void;
  exportWrongQuestions: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: "english_app_users",
  CURRENT_USER: "english_app_current_user",
  SCORES: "english_app_scores",
};

function getUsers(): Record<string, string> {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : {};
}

function saveUsers(users: Record<string, string>) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getStoredScores(username: string): ExamScore[] {
  const data = localStorage.getItem(`${STORAGE_KEYS.SCORES}_${username}`);
  return data ? JSON.parse(data) : [];
}

function saveStoredScores(username: string, scores: ExamScore[]) {
  localStorage.setItem(`${STORAGE_KEYS.SCORES}_${username}`, JSON.stringify(scores));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<ExamScore[]>([]);

  useEffect(() => {
    // Check for logged in user on load
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setScores(getStoredScores(userData.username));
    }
  }, []);

  const register = (username: string, password: string): boolean => {
    if (!username || !password) return false;
    if (username.length < 3 || password.length < 3) return false;
    
    const users = getUsers();
    if (users[username]) return false; // User already exists
    
    // Simple password hashing (for demo - not secure for production)
    const hashedPassword = btoa(password + "english_app_salt");
    users[username] = hashedPassword;
    saveUsers(users);
    
    // Auto login after register
    const newUser: User = { username, createdAt: new Date().toISOString() };
    setUser(newUser);
    setScores([]);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    
    return true;
  };

  const login = (username: string, password: string): boolean => {
    if (!username || !password) return false;
    
    const users = getUsers();
    const hashedPassword = btoa(password + "english_app_salt");
    
    if (users[username] === hashedPassword) {
      const newUser: User = { username, createdAt: users[username + "_created"] || new Date().toISOString() };
      setUser(newUser);
      setScores(getStoredScores(username));
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setScores([]);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  const saveScore = (score: ExamScore) => {
    if (!user) return;
    const newScores = [score, ...scores];
    setScores(newScores);
    saveStoredScores(user.username, newScores);
  };

  const exportWrongQuestions = (): string => {
    if (!user || scores.length === 0) return "";
    
    const allWrong: WrongQuestion[] = [];
    scores.forEach(score => {
      allWrong.push(...score.wrongQuestions);
    });
    
    // Remove duplicates by question id
    const uniqueWrong = Array.from(
      new Map(allWrong.map(q => [q.id, q])).values()
    );
    
    return JSON.stringify(uniqueWrong, null, 2);
  };

  return (
    <AuthContext.Provider value={{
      user,
      scores,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      saveScore,
      exportWrongQuestions,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}