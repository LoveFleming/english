import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "../components/ui/shared";

export default function AuthPage() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("請輸入帳號和密碼");
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("密碼確認不相符");
        return;
      }
      if (username.length < 3 || password.length < 3) {
        setError("帳號和密碼至少需要 3 個字元");
        return;
      }
      const success = register(username, password);
      if (success) {
        setSuccess("註冊成功！歡迎加入！");
      } else {
        setError("帳號已存在");
      }
    } else {
      const success = login(username, password);
      if (!success) {
        setError("帳號或密碼錯誤");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-blue-700 italic mb-2" style={{ fontFamily: "cursive, sans-serif" }}>
            ~ENGLISH APP~
          </div>
          <p className="text-stone-500">
            {isRegister ? "建立帳號成為會員" : "登入你的帳號"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              帳號 (Username)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="請輸入帳號"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              密碼 (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="請輸入密碼"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                確認密碼 (Confirm Password)
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="再次輸入密碼"
                autoComplete="new-password"
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
          >
            {isRegister ? "註冊" : "登入"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setSuccess("");
            }}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {isRegister ? "已有帳號？登入" : "還沒有帳號？註冊"}
          </button>
        </div>

        {!isRegister && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 第一次使用？直接註冊一個帳號，就可以成為會員記錄考試成績！
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}