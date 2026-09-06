'use client';

import React, { useState } from 'react';
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
  AlertCircle 
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { 
    properties, 
    verifyProperty, 
    toggleFeaturedProperty, 
    deleteProperty, 
    formatPrice 
  } = useProperties();
  const { user, isAdmin, registeredUsers } = useAuth();

  const [activeTab, setActiveTab] = useState<'listings' | 'users' | 'analytics'>('listings');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.district.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const totalViews = properties.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  const rentCount = properties.filter((p) => p.dealType === 'rent').length;
  const saleCount = properties.filter((p) => p.dealType === 'sale').length;
  const verifiedCount = properties.filter((p) => p.isVerified).length;

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-6 h-6" />
            <span className="text-xs font-black uppercase tracking-wider">UyBozor Administrator Paneli</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Tizim Boshqaruvi va Nazorat
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/add-property"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yangi e'lon qo'shish</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Saytga qaytish</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Jami e'lonlar</span>
          <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">{properties.length} ta</div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Faol obyektlar</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Tasdiqlangan</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{verifiedCount} ta</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100% tekshirilgan</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Ijarada</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{rentCount} ta</div>
          <span className="text-[10px] text-gray-400 font-semibold">Oylik kvartiralar</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Sotuvda</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{saleCount} ta</div>
          <span className="text-[10px] text-gray-400 font-semibold">Kvartira & Villalar</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Foydalanuvchilar</span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{registeredUsers.length} ta</div>
          <span className="text-[10px] text-purple-600 font-bold">Barcha rollar</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold block">Ko'rishlar</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{totalViews.toLocaleString()}</div>
          <span className="text-[10px] text-amber-600 font-bold">Jami qiziqishlar</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'listings'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          📋 E'lonlar bazasi ({properties.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          👥 Foydalanuvchilar ({registeredUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          📈 Tahlil va Hisobotlar
        </button>
      </div>

      {/* Tab 1: Listings Management */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="E'lon nomi yoki shahar bo'yicha qidirish..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
            <span className="text-xs font-bold text-gray-500">
              Natija: {filteredProperties.length} ta e'lon
            </span>
          </div>

          <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="p-4">Mulk</th>
                  <th className="p-4">Narxi</th>
                  <th className="p-4">Bitim / Mulk</th>
                  <th className="p-4">Joylashuv</th>
                  <th className="p-4">Holati</th>
                  <th className="p-4 text-right">Boshqarish</th>
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
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <Link
                            href={`/properties/${prop.id}`}
                            className="font-bold text-gray-900 dark:text-white hover:text-blue-600 line-clamp-1 max-w-xs"
                          >
                            {prop.title}
                          </Link>
                          <span className="text-[10px] text-gray-400">
                            {prop.rooms} xona • {prop.area} m² • {prop.contact.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-black text-gray-900 dark:text-white">
                      {formatPrice(prop.price, prop.dealType, prop.pricePeriod)}
                    </td>

                    {/* Deal & Type */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
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
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Tekshirilgan
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-slate-800 text-gray-500">
                            Kutilmoqda
                          </span>
                        )}

                        {prop.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500" />
                            VIP
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
                          onClick={() => verifyProperty(prop.id, !prop.isVerified)}
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
                          onClick={() => toggleFeaturedProperty(prop.id)}
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
                            }
                          }}
                          title="E'lonni o'chirish"
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
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
                <th className="p-4">Qo'shimcha ma'lumot</th>
                <th className="p-4">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {registeredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/30"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center text-xs">
                        {u.name.charAt(0)}
                      </div>
                    )}
                    <span>{u.name}</span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{u.email}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{u.phone}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin'
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          : u.role === 'owner'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : u.role === 'realtor'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300'
                      }`}
                    >
                      {u.role === 'admin'
                        ? 'Administrator'
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

      {/* Tab 3: Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              Hududlar bo'yicha taqsimot
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Toshkent shahri</span>
                  <span className="font-bold text-blue-600">65%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Samarqand</span>
                  <span className="font-bold text-indigo-600">18%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '18%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Buxoro</span>
                  <span className="font-bold text-emerald-600">10%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Farg'ona, Namangan, Andijon</span>
                  <span className="font-bold text-amber-600">7%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: '7%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              O'rtacha Narxlar va Bozordagi Talab
            </h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">O'rtacha ijara</span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">$540</span>
                <span className="text-[10px] text-gray-400 block mt-1">/ oyiga (Toshkent)</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">O'rtacha sotuv 1 m²</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">$1,120</span>
                <span className="text-[10px] text-gray-400 block mt-1">novostroyka</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
              Tizimdagi e'lonlar bo'yicha talab eng yuqori bo'lgan tumanlar: Mirobod, Yunusobod va Mirzo Ulug'bek. Ijara shartnomalarining 92% qismi ijara.soliq.uz bilan integratsiyalashgan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
