'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, Home, DollarSign, Sparkles } from 'lucide-react';
import { DealType, PropertyType } from '@/types/property';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSearch() {
  const router = useRouter();
  const { t } = useLanguage();
  const [dealType, setDealType] = useState<DealType>('rent');
  const [city, setCity] = useState('all');
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>('all');
  const [rooms, setRooms] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (dealType) params.set('deal', dealType);
    if (city !== 'all') params.set('city', city);
    if (propertyType !== 'all') params.set('type', propertyType);
    if (rooms !== 'all') params.set('rooms', rooms);
    if (maxPrice) params.set('maxPrice', maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto">
      {/* Search Container Card */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl sm:rounded-4xl shadow-2xl border border-white/40 dark:border-slate-800 transition-colors">
        {/* Deal Type Switcher Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setDealType('rent')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all ${
              dealType === 'rent'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-102'
                : 'bg-gray-100/80 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>{t.search_tab_rent}</span>
          </button>
          <button
            type="button"
            onClick={() => setDealType('sale')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all ${
              dealType === 'sale'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-102'
                : 'bg-gray-100/80 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200/70 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span>{t.search_tab_sale}</span>
          </button>
        </div>

        {/* Search Inputs Grid */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* City / Location */}
          <div className="bg-gray-50/80 dark:bg-slate-800/80 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 block mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500" />
              {t.search_city_label}
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label={t.search_city_label}
              className="w-full bg-transparent font-semibold text-gray-800 dark:text-gray-200 text-sm focus:outline-none cursor-pointer"
            >
              <option value="all" className="dark:bg-slate-900">{t.search_all_cities}</option>
              <option value="Toshkent" className="dark:bg-slate-900">Toshkent shahri</option>
              <option value="Samarqand" className="dark:bg-slate-900">Samarqand</option>
              <option value="Buxoro" className="dark:bg-slate-900">Buxoro</option>
              <option value="Namangan" className="dark:bg-slate-900">Namangan</option>
              <option value="Farg'ona" className="dark:bg-slate-900">Farg'ona</option>
              <option value="Andijon" className="dark:bg-slate-900">Andijon</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="bg-gray-50/80 dark:bg-slate-800/80 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 block mb-1 flex items-center gap-1">
              <Building className="w-3 h-3 text-blue-500" />
              {t.search_type_label}
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as any)}
              aria-label={t.search_type_label}
              className="w-full bg-transparent font-semibold text-gray-800 dark:text-gray-200 text-sm focus:outline-none cursor-pointer"
            >
              <option value="all" className="dark:bg-slate-900">{t.search_all_types}</option>
              <option value="apartment" className="dark:bg-slate-900">{t.type_apartment}</option>
              <option value="house" className="dark:bg-slate-900">{t.type_house}</option>
              <option value="villa" className="dark:bg-slate-900">{t.type_villa}</option>
              <option value="new_building" className="dark:bg-slate-900">{t.type_new_building}</option>
              <option value="commercial" className="dark:bg-slate-900">{t.type_commercial}</option>
            </select>
          </div>

          {/* Rooms */}
          <div className="bg-gray-50/80 dark:bg-slate-800/80 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 block mb-1 flex items-center gap-1">
              <Home className="w-3 h-3 text-blue-500" />
              {t.search_rooms_label}
            </label>
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              aria-label={t.search_rooms_label}
              className="w-full bg-transparent font-semibold text-gray-800 dark:text-gray-200 text-sm focus:outline-none cursor-pointer"
            >
              <option value="all" className="dark:bg-slate-900">{t.search_all_rooms}</option>
              <option value="1" className="dark:bg-slate-900">1 {t.search_rooms_suffix}</option>
              <option value="2" className="dark:bg-slate-900">2 {t.search_rooms_suffix}</option>
              <option value="3" className="dark:bg-slate-900">3 {t.search_rooms_suffix}</option>
              <option value="4" className="dark:bg-slate-900">{t.search_rooms_4plus}</option>
            </select>
          </div>

          {/* Max Price */}
          <div className="bg-gray-50/80 dark:bg-slate-800/80 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 block mb-1 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-blue-500" />
              {t.search_max_price}
            </label>
            <input
              type="number"
              placeholder={dealType === 'rent' ? '600' : '80000'}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-transparent font-semibold text-gray-800 dark:text-white text-sm focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Submit Search Button */}
          <div className="flex items-center">
            <button
              type="submit"
              className="w-full h-full min-h-[52px] bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
            >
              <Search className="w-5 h-5" />
              <span>{t.search_button}</span>
            </button>
          </div>
        </form>

        {/* Quick Search Tags */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {t.cat_title}:
          </span>
          <button
            type="button"
            onClick={() => router.push('/properties?city=Toshkent&deal=rent')}
            className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 text-gray-600 dark:text-gray-300 font-medium transition-colors"
          >
            Toshkent • {t.nav_rent}
          </button>
          <button
            type="button"
            onClick={() => router.push('/properties?type=new_building&deal=sale')}
            className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 text-gray-600 dark:text-gray-300 font-medium transition-colors"
          >
            {t.type_new_building}
          </button>
          <button
            type="button"
            onClick={() => router.push('/properties?deal=rent&maxPrice=400')}
            className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 text-gray-600 dark:text-gray-300 font-medium transition-colors"
          >
            $400 max • {t.nav_rent}
          </button>
          <button
            type="button"
            onClick={() => router.push('/properties?type=villa')}
            className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 text-gray-600 dark:text-gray-300 font-medium transition-colors"
          >
            {t.type_villa}
          </button>
        </div>
      </div>
    </div>
  );
}
