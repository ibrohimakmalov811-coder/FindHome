'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Home, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

const DEMO_CREDENTIALS = [
  { email: 'admin@uybozor.uz', password: 'admin123', label: '🛡️ Admin', roleName: 'Administrator' },
  { email: 'aziza@home.uz', password: 'aziza123', label: '🏠 Mulkdor', roleName: 'Mulk egasi' },
  { email: 'sherzod@realty.uz', password: 'sherzod123', label: '💼 Rieltor', roleName: 'Agentlik vakili' },
  { email: 'jasur@gmail.com', password: 'jasur123', label: '👤 Xaridor', roleName: 'Xaridor / Ijarachi' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Iltimos, email va parolni to\'liq kiriting.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        if (email.toLowerCase().includes('admin')) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Tizimga kirishda kutilmagan xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    setIsLoading(true);

    try {
      const res = await login(demoEmail, demoPass);
      if (res.success) {
        if (demoEmail.toLowerCase().includes('admin')) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Kirishda xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl sm:rounded-4xl border border-gray-100 dark:border-slate-800 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white">UyBozor</span>
          </Link>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Tizimga kirish
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            E'lonlarni boshqarish va kabinetga kirish uchun parolingizni kiriting
          </p>
        </div>

        {/* Real Validation Error Message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200 dark:border-rose-900 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
              Email manzilingiz
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="masalan: admin@uybozor.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Parol
              </label>
              <span className="text-[11px] text-gray-400">
                (Parol tekshiriladi)
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="Parolingizni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Tekshirilmoqda...' : 'Kabinetga kirish'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Tezkor sinov profillari:</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold normal-case">1 ta bosishda to'ldirish</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {DEMO_CREDENTIALS.map((item) => (
              <button
                key={item.email}
                type="button"
                onClick={() => handleQuickLogin(item.email, item.password)}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-slate-700 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{item.label}</span>
                </div>
                <span className="text-[10px] text-gray-400 block font-normal truncate mt-0.5">
                  Parol: {item.password}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          Hisobingiz yo'qmi?{' '}
          <Link href="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  );
}
