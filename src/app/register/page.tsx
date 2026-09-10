'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, MALE_AVATARS, FEMALE_AVATARS, detectGenderFromName } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';
import { 
  Home, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [role, setRole] = useState<UserRole>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [agencyName, setAgencyName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(MALE_AVATARS[0]);
  const [isGenderManuallyChanged, setIsGenderManuallyChanged] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-detect gender when name changes unless user manually toggled it
  useEffect(() => {
    if (!isGenderManuallyChanged && name.trim().length >= 3) {
      const detected = detectGenderFromName(name);
      setGender(detected);
      const avatars = detected === 'female' ? FEMALE_AVATARS : MALE_AVATARS;
      setSelectedAvatar(avatars[0]);
    }
  }, [name, isGenderManuallyChanged]);

  const handleGenderSelect = (newGender: 'male' | 'female') => {
    setGender(newGender);
    setIsGenderManuallyChanged(true);
    const avatars = newGender === 'female' ? FEMALE_AVATARS : MALE_AVATARS;
    setSelectedAvatar(avatars[0]);
  };

  const handleRandomizeAvatar = () => {
    const list = gender === 'female' ? FEMALE_AVATARS : MALE_AVATARS;
    const rand = list[Math.floor(Math.random() * list.length)];
    setSelectedAvatar(rand);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      setError('Iltimos, barcha majburiy maydonlarni to\'ldiring.');
      return;
    }

    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await register({
        name,
        email,
        phone,
        role,
        agencyName: role === 'realtor' ? agencyName : undefined,
        password,
        gender,
        avatar: selectedAvatar,
      });

      if (res.success) {
        if (role === 'owner' || role === 'realtor') {
          router.push('/add-property');
        } else {
          router.push('/properties');
        }
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Ro\'yxatdan o\'tishda xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  const avatarOptions = gender === 'female' ? FEMALE_AVATARS : MALE_AVATARS;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl sm:rounded-4xl border border-gray-100 dark:border-slate-800 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white">UyBozor</span>
          </Link>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Ro'yxatdan o'tish
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            O'zbekistonning eng yirik ko'chmas mulk platformasiga qo'shiling
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200 dark:border-rose-900">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP: Select Role */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-2.5">
              Siz kimsiz? Rolingizni tanlang: *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Buyer / Tenant */}
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  role === 'buyer'
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-700 dark:text-blue-300 ring-2 ring-blue-600/20'
                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>👤 Xaridor</span>
                  {role === 'buyer' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  Uy izlovchi / ijarachi
                </p>
              </button>

              {/* Owner / Seller */}
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  role === 'owner'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-600/20'
                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>🏠 Mulk egasi</span>
                  {role === 'owner' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  Sotuvchi / ijara beruvchi
                </p>
              </button>

              {/* Realtor */}
              <button
                type="button"
                onClick={() => setRole('realtor')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  role === 'realtor'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-600/20'
                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>💼 Rieltor</span>
                  {role === 'realtor' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  Ko'chmas mulk agenti
                </p>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                To'liq ismingiz *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Masalan: Ibrohim Akmalov"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Gender Selector with Smart Recognition */}
            <div className="bg-gray-50/70 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-gray-100 dark:border-slate-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Jinsi (Avatar uchun):</span>
                </label>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                  {gender === 'male' ? "O'g'il bola (Erkak)" : "Qiz bola (Ayol)"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleGenderSelect('male')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    gender === 'male'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100'
                  }`}
                >
                  <span>👨 Erkak</span>
                  {gender === 'male' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleGenderSelect('female')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    gender === 'female'
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100'
                  }`}
                >
                  <span>👩 Ayol</span>
                  {gender === 'female' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Avatar Selector Gallery */}
              <div className="pt-2 border-t border-gray-200/60 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                    O'zingizga yoqqan rasmni tanlang:
                  </span>
                  <button
                    type="button"
                    onClick={handleRandomizeAvatar}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Boshqasi
                  </button>
                </div>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {avatarOptions.slice(0, 5).map((imgUrl, idx) => {
                    const isSelected = selectedAvatar === imgUrl;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedAvatar(imgUrl)}
                        className={`relative w-11 h-11 rounded-2xl overflow-hidden shrink-0 transition-all ${
                          isSelected
                            ? 'ring-3 ring-blue-600 scale-105 shadow-md'
                            : 'opacity-70 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <img src={imgUrl} alt="Avatar variant" className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white drop-shadow-md" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                  Email manzilingiz *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="foydalanuvchi@mail.uz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                  Telefon raqam *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Optional agency name if realtor */}
            {role === 'realtor' && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                  Agentlik yoki Kompaniya nomi
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Masalan: Tashkent Premier Realty LLC"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                Parol yarating *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Kamida 6 ta belgi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Yaratilmoqda...' : 'Ro\'yxatdan o\'tish'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          Hisobingiz bormi?{' '}
          <Link href="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Tizimga kirish
          </Link>
        </div>
      </div>
    </div>
  );
}
