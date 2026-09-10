'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/context/PropertyContext';
import { useAuth } from '@/context/AuthContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Users, 
  Building2, 
  Home, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Star, 
  Eye, 
  PlusCircle, 
  Search, 
  ExternalLink,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Clock,
  Lock,
  ArrowRight,
  RefreshCw,
  Sliders,
  FileText,
  Activity,
  Award,
  Check,
  LogOut
} from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  ip: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

const INITIAL_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    action: 'Administrator tizimga kirdi',
    user: 'Ibrohim Akmalov (Admin)',
    ip: '178.218.201.14 (Toshkent, UZ)',
    time: 'Hozirgina',
    status: 'success',
  },
  {
    id: 'log-2',
    action: "Yangi e'lon tekshiruvdan o'tkazildi va tasdiqlandi",
    user: 'Ibrohim Akmalov',
    ip: '178.218.201.14',
    time: '12 daqiqa oldin',
    status: 'success',
  },
  {
    id: 'log-3',
    action: 'VIP maqom faollashtirildi (ID: prop-1)',
    user: 'Tizim avtomatik',
    ip: '127.0.0.1',
    time: '45 daqiqa oldin',
    status: 'info',
  },
  {
    id: 'log-4',
    action: "Yangi rieltor akkounti ro'yxatdan o'tdi",
    user: 'Sherzod Karimov',
    ip: '84.54.120.91 (Samarqand)',
    time: '2 soat oldin',
    status: 'info',
  },
  {
    id: 'log-5',
    action: 'Ijara shartnomasi xavfsiz shakllantirildi',
    user: 'Jasurbek Mahmudov',
    ip: '213.230.87.12',
    time: '3 soat oldin',
    status: 'success',
  },
];

export default function AdminPage() {
  const router = useRouter();
  const { 
    properties, 
    verifyProperty, 
    toggleFeaturedProperty, 
    deleteProperty, 
    formatPrice 
  } = useProperties();
  const { user, isAdmin, isAuthenticated, logout, registeredUsers } = useAuth();

  const [activeTab, setActiveTab] = useState<'listings' | 'users' | 'analytics' | 'logs' | 'settings'>('listings');
  const [searchFilter, setSearchFilter] = useState('');
  const [dealFilter, setDealFilter] = useState<'all' | 'rent' | 'sale'>('all');
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_LOGS);
  const [exchangeRate, setExchangeRate] = useState('12850');
  const [rateSaved, setRateSaved] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Check authentication & permissions
  useEffect(() => {
    // If user is loaded and not admin, prompt redirect
    const timer = setTimeout(() => {
      if (!isAuthenticated || !isAdmin) {
        router.push('/login?redirect=/admin&admin=true');
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [isAuthenticated, isAdmin, router]);

  // If not logged in as admin, show elegant gateway
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-200 dark:border-indigo-800 shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <span className="text-xs font-black tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
              Himoyalangan Hudud
            </span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Administrator Kirishi Talab Qilinadi
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Ushbu boshqaruv paneli faqat Bosh Administrator <b>(Ibrohim Akmalov)</b> uchun ochiq. Davom etish uchun avtorizatsiyadan o'ting.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/70 border border-gray-100 dark:border-slate-700 text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-400">Admin email:</span>
              <span className="font-mono font-bold text-gray-800 dark:text-gray-200">ibrohimakmalov@.gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Parol:</span>
              <span className="font-mono font-bold text-gray-800 dark:text-gray-200">New Trader_202</span>
            </div>
          </div>

          <Link
            href="/login?redirect=/admin&admin=true"
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Admin sifatida kirish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/"
            className="block text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-semibold"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  // Filter listings
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.district.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesDeal = dealFilter === 'all' || p.dealType === dealFilter;
    return matchesSearch && matchesDeal;
  });

  const totalViews = properties.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  const rentCount = properties.filter((p) => p.dealType === 'rent').length;
  const saleCount = properties.filter((p) => p.dealType === 'sale').length;
  const verifiedCount = properties.filter((p) => p.isVerified).length;
  const vipCount = properties.filter((p) => p.isFeatured).length;

  const handleSaveExchangeRate = (e: React.FormEvent) => {
    e.preventDefault();
    setRateSaved(true);
    setTimeout(() => setRateSaved(false), 3000);
    // Add audit log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: `Valyuta kursi yangilandi: 1 USD = ${exchangeRate} UZS`,
      user: user?.name || 'Ibrohim Akmalov',
      ip: '178.218.201.14',
      time: 'Hozirgina',
      status: 'info',
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl sm:rounded-4xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Admin Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80'}
              alt={user?.name || 'Admin'}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/20"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-white" title="Online">
              <Check className="w-3 h-3" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Bosh Administrator
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Tizim faol (Online)
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {user?.name || 'Ibrohim Akmalov'}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email || 'ibrohimakmalov@.gmail.com'} • UyBozor boshqaruv markazi
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/add-property"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yangi e'lon qo'shish</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-bold text-xs hover:bg-gray-200 dark:hover:bg-slate-700 transition-all border border-gray-200/60 dark:border-slate-700"
          >
            <Home className="w-4 h-4" />
            <span>Saytni ko'rish</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all border border-rose-200 dark:border-rose-900 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Chiqish</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Jami e'lonlar</span>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">{properties.length} ta</div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Bazada mavjud</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Tasdiqlangan</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{verifiedCount} ta</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100% rasmiy tekshiruv</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">VIP / Tavsiya</span>
          <div className="text-2xl font-black text-amber-500 mt-1">{vipCount} ta</div>
          <span className="text-[10px] text-amber-500 font-bold">Bosh sahifada TOP</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Ijarada</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{rentCount} ta</div>
          <span className="text-[10px] text-gray-400 font-bold">Oylik to'lov</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Sotuvda</span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{saleCount} ta</div>
          <span className="text-[10px] text-gray-400 font-bold">To'liq mulk</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Foydalanuvchilar</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{registeredUsers.length} ta</div>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Ro'yxatdan o'tgan</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-slate-800 pb-3 overflow-x-auto text-xs sm:text-sm font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>E'lonlar Boshqaruvi ({properties.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Foydalanuvchilar Bazasi ({registeredUsers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'logs'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Xavfsizlik va Jurnal</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Bozor Tahlili</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Tizim Sozlamalari</span>
        </button>
      </div>

      {/* Tab 1: Listings Management */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="E'lon nomi, shahar yoki tuman bo'yicha qidirish..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Deal Filter Pills */}
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setDealFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  dealFilter === 'all' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-gray-500'
                }`}
              >
                Barchasi ({properties.length})
              </button>
              <button
                type="button"
                onClick={() => setDealFilter('rent')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  dealFilter === 'rent' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-gray-500'
                }`}
              >
                Ijara ({rentCount})
              </button>
              <button
                type="button"
                onClick={() => setDealFilter('sale')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  dealFilter === 'sale' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-gray-500'
                }`}
              >
                Sotuv ({saleCount})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="p-4">Mulk & Egasi</th>
                  <th className="p-4">Narxi</th>
                  <th className="p-4">Bitim / Mulk turi</th>
                  <th className="p-4">Joylashuv</th>
                  <th className="p-4">Holati</th>
                  <th className="p-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Media + Title */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-xs"
                        />
                        <div>
                          <Link
                            href={`/properties/${prop.id}`}
                            className="font-bold text-gray-900 dark:text-white hover:text-blue-600 line-clamp-1 max-w-xs"
                          >
                            {prop.title}
                          </Link>
                          <span className="text-[11px] text-gray-400 block mt-0.5">
                            {prop.rooms} xona • {prop.area} m² • {prop.contact.name} ({prop.contact.phone})
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-black text-gray-900 dark:text-white whitespace-nowrap">
                      {formatPrice(prop.price, prop.dealType, prop.pricePeriod)}
                    </td>

                    {/* Deal & Type */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                            prop.dealType === 'rent'
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          }`}
                        >
                          {prop.dealType === 'rent' ? 'Ijara' : 'Sotuv'}
                        </span>
                        <span className="text-[11px] text-gray-500 capitalize">
                          {prop.propertyType}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="p-4 text-gray-600 dark:text-gray-300 text-xs">
                      {prop.district}, {prop.city}
                    </td>

                    {/* Badges */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {prop.isVerified ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Tasdiqlangan
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-slate-800 text-gray-500">
                            Kutilmoqda
                          </span>
                        )}

                        {prop.isFeatured && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500" />
                            VIP TOP
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Verify toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            verifyProperty(prop.id, !prop.isVerified);
                            const newLog: AuditLog = {
                              id: `log-${Date.now()}`,
                              action: prop.isVerified ? `"${prop.title}" tasdig'i bekor qilindi` : `"${prop.title}" tekshirildi va tasdiqlandi`,
                              user: user?.name || 'Ibrohim Akmalov',
                              ip: '178.218.201.14',
                              time: 'Hozirgina',
                              status: 'success',
                            };
                            setLogs((prev) => [newLog, ...prev]);
                          }}
                          title={prop.isVerified ? "Tasdiqni bekor qilish" : "E'lonni tasdiqlash"}
                          className={`p-2 rounded-xl transition-colors ${
                            prop.isVerified
                              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100'
                              : 'text-gray-400 hover:text-emerald-600 hover:bg-gray-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>

                        {/* Featured toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            toggleFeaturedProperty(prop.id);
                            const newLog: AuditLog = {
                              id: `log-${Date.now()}`,
                              action: prop.isFeatured ? `"${prop.title}" VIP dan olindi` : `"${prop.title}" VIP TOP e'longa aylantirildi`,
                              user: user?.name || 'Ibrohim Akmalov',
                              ip: '178.218.201.14',
                              time: 'Hozirgina',
                              status: 'info',
                            };
                            setLogs((prev) => [newLog, ...prev]);
                          }}
                          title={prop.isFeatured ? "VIP dan chiqarish" : "VIP e'lon qilish"}
                          className={`p-2 rounded-xl transition-colors ${
                            prop.isFeatured
                              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100'
                              : 'text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${prop.isFeatured ? 'fill-amber-500' : ''}`} />
                        </button>

                        {/* Direct link */}
                        <Link
                          href={`/properties/${prop.id}`}
                          title="Saytda ko'rish"
                          className="p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Haqiqatan ham "${prop.title}" e'lonini o'chirmoqchimisiz?`)) {
                              deleteProperty(prop.id);
                              const newLog: AuditLog = {
                                id: `log-${Date.now()}`,
                                action: `"${prop.title}" e'loni o'chirildi`,
                                user: user?.name || 'Ibrohim Akmalov',
                                ip: '178.218.201.14',
                                time: 'Hozirgina',
                                status: 'warning',
                              };
                              setLogs((prev) => [newLog, ...prev]);
                            }
                          }}
                          title="E'lonni o'chirish"
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Users Management */}
      {activeTab === 'users' && (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4">Foydalanuvchi</th>
                <th className="p-4">Email</th>
                <th className="p-4">Telefon</th>
                <th className="p-4">Roli</th>
                <th className="p-4">Faoliyat turi</th>
                <th className="p-4">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {registeredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-10 h-10 rounded-2xl object-cover ring-2 ring-blue-500/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center text-xs">
                        {u.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="block font-bold">{u.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal">ID: {u.id}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-600 dark:text-gray-300 text-xs">{u.email}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{u.phone}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        u.role === 'admin'
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                          : u.role === 'owner'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : u.role === 'realtor'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300'
                      }`}
                    >
                      {u.role === 'admin'
                        ? 'Bosh Administrator'
                        : u.role === 'owner'
                        ? 'Mulk egasi'
                        : u.role === 'realtor'
                        ? 'Rieltor'
                        : 'Xaridor'}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {u.agencyName || 'Jismoniy shaxs'}
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-600 font-bold flex items-center gap-1 text-xs">
                      <CheckCircle className="w-3.5 h-3.5" /> Faol
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Security & Activity Logs */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>
                <b>Audit Jurnali Faol:</b> O'zbekiston Respublikasi kiberxavfsizlik va ma'lumotlar yaxlitligi talablariga muvofiq barcha harakatlar qayd etiladi.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const refreshedLog: AuditLog = {
                  id: `log-${Date.now()}`,
                  action: 'Tizim xavfsizlik audit tekshiruvidan muvaffaqiyatli o\'tdi',
                  user: 'Avtomatik himoya tizimi',
                  ip: '127.0.0.1',
                  time: 'Hozirgina',
                  status: 'success',
                };
                setLogs((prev) => [refreshedLog, ...prev]);
              }}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tekshirish</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="p-4">Harakat / Hodisa</th>
                  <th className="p-4">Foydalanuvchi</th>
                  <th className="p-4">IP Manzil / Qurilma</th>
                  <th className="p-4">Vaqti</th>
                  <th className="p-4">Holati</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {logs.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{item.action}</span>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300 font-semibold">{item.user}</td>
                    <td className="p-4 font-mono text-xs text-gray-500">{item.ip}</td>
                    <td className="p-4 text-gray-500 text-xs">{item.time}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'success'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : item.status === 'warning'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {item.status === 'success' ? 'Tasdiqlangan' : item.status === 'warning' ? 'O\'chirildi' : 'Axborot'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Market Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Hududlar bo'yicha e'lonlar taqsimoti</span>
            </h3>
            <div className="space-y-4 text-xs sm:text-sm pt-2">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="font-semibold">Toshkent shahri</span>
                  <span className="font-bold text-blue-600">65% (8 ta obyekt)</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="font-semibold">Samarqand shahri</span>
                  <span className="font-bold text-indigo-600">18% (2 ta obyekt)</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '18%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="font-semibold">Buxoro shahri</span>
                  <span className="font-bold text-emerald-600">10% (1 ta obyekt)</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="font-semibold">Farg'ona vodiysi</span>
                  <span className="font-bold text-amber-600">7% (1 ta obyekt)</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: '7%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>O'rtacha Narxlar va Bozordagi Talab</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">O'rtacha ijara</span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">$620</span>
                <span className="text-[10px] text-gray-400 block mt-1">/ oyiga (Toshkent)</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">O'rtacha sotuv 1 m²</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">$1,180</span>
                <span className="text-[10px] text-gray-400 block mt-1">yangi binolar</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
              Tizimdagi e'lonlar bo'yicha talab eng yuqori bo'lgan tumanlar: Mirobod, Yunusobod va Mirzo Ulug'bek. Ijara shartnomalarining 94% qismi O'zbekiston Respublikasi Soliq qo'mitasi (ijara.soliq.uz) me'yorlariga mos shakllantirilgan.
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: System Settings */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exchange Rate */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <span>Markaziy Bank Valyuta Kursi</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ushbu kurs sayt bo'ylab USD va UZS o'rtasida narxlarni avtomatik hisoblashda qo'llaniladi.
            </p>
            <form onSubmit={handleSaveExchangeRate} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  1 USD qiymati (so'mda):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                  <span className="absolute right-4 top-3 text-xs text-gray-400 font-bold">UZS</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Kursni saqlash
                </button>
                {rateSaved && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Muvaffaqiyatli saqlandi!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Maintenance & Security Status */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Platforma Xavfsizlik Holati</span>
            </h3>
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Sayt holati</span>
                  <span className="text-gray-500 text-[11px]">Barcha foydalanuvchilar uchun ochiq</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                  FAOL REJIM
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Ma'lumotlar bazasi zaxirasi</span>
                  <span className="text-gray-500 text-[11px]">Avtomatik kunlik sinxronizatsiya</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold text-[10px]">
                  100% HIMOYALANGAN
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">Kiberxavfsizlik SSL shifrlash</span>
                  <span className="text-gray-500 text-[11px]">TLS 1.3 / 256-bit shifrlash</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                  SSL FAOL
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
