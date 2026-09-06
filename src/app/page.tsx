'use client';

import React from 'react';
import Link from 'next/link';
import { useProperties } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import HeroSearch from '@/components/HeroSearch';
import PropertyCard from '@/components/PropertyCard';
import MortgageCalculator from '@/components/MortgageCalculator';
import { 
  Building2, 
  Home, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  KeyRound, 
  CheckCircle, 
  PlusCircle, 
  Scale,
  FileText 
} from 'lucide-react';

export default function HomePage() {
  const { properties } = useProperties();
  const { t } = useLanguage();

  // Exactly at least 12 cards displayed in the main showcase
  const showcaseProperties = properties.slice(0, 12);
  const rentalProperties = properties.filter((p) => p.dealType === 'rent').slice(0, 4);

  const categories = [
    {
      title: t.type_apartment,
      desc: t.cat_apartment_desc,
      icon: Building2,
      href: '/properties?type=apartment',
      badge: t.cat_apartment_badge,
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      title: t.type_new_building,
      desc: t.cat_new_desc,
      icon: Sparkles,
      href: '/properties?type=new_building',
      badge: t.cat_new_badge,
      gradient: 'from-indigo-600 to-purple-600',
    },
    {
      title: t.type_villa,
      desc: t.cat_villa_desc,
      icon: Home,
      href: '/properties?type=villa',
      badge: t.cat_villa_badge,
      gradient: 'from-emerald-600 to-teal-600',
    },
    {
      title: t.type_commercial,
      desc: t.cat_comm_desc,
      icon: TrendingUp,
      href: '/properties?type=commercial',
      badge: t.cat_comm_badge,
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[640px] flex items-center justify-center pt-12 pb-24 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Modern real estate background"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-gray-950/80 via-gray-900/65 to-gray-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-500">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.hero_badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
            {t.hero_title_1} <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              {t.hero_title_2}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-xs">
            {properties.length} {t.hero_subtitle}
          </p>

          {/* Interactive Search Widget */}
          <div className="pt-4">
            <HeroSearch />
          </div>

          {/* Quick Stats */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-white">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="text-xl sm:text-2xl font-black text-blue-300">{properties.length}+</div>
              <div className="text-[11px] text-gray-300 font-medium">{t.hero_stat_active}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="text-xl sm:text-2xl font-black text-emerald-300">100%</div>
              <div className="text-[11px] text-gray-300 font-medium">{t.hero_stat_legal}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="text-xl sm:text-2xl font-black text-amber-300">0%</div>
              <div className="text-[11px] text-gray-300 font-medium">{t.hero_stat_commission}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="text-xl sm:text-2xl font-black text-purple-300">24/7</div>
              <div className="text-[11px] text-gray-300 font-medium">{t.hero_stat_support}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Uzbekistan Legal Banner Teaser */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-blue-800/40 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center shrink-0">
              <Scale className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {t.legal_badge}
              </span>
              <h3 className="text-lg sm:text-xl font-black">
                {t.legal_title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                {t.legal_desc}
              </p>
            </div>
          </div>
          <Link
            href="/security"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs sm:text-sm shrink-0 shadow-md transition-all active:scale-98"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>{t.legal_button}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
              {t.cat_title}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {t.cat_subtitle}
            </h2>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline group"
          >
            <span>{t.cat_all}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-linear-to-r ${cat.gradient} text-white flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 inline-block mb-2">
                    {cat.badge}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{cat.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>{t.cat_view_ads}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Properties Showcase (Kamida 12 ta kartochka) */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
              {t.featured_badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {t.featured_title} ({showcaseProperties.length} ta)
            </h2>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline group"
          >
            <span>{t.featured_view_all}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {showcaseProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Rent Section Highlight */}
      <section className="bg-blue-50/60 dark:bg-slate-900/60 py-16 border-y border-blue-100/60 dark:border-slate-800 transition-colors">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4" />
                {t.rent_badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {t.rent_title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t.rent_subtitle}
              </p>
            </div>
            <Link
              href="/properties?deal=rent"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
            >
              <span>{t.rent_view_all}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentalProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Mortgage Calculator on Home Page */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            {t.mortgage_badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {t.mortgage_title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            {t.mortgage_subtitle}
          </p>
        </div>

        <MortgageCalculator initialPrice={95000} />
      </section>

      {/* Trust & Guarantee Section */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-linear-to-r from-gray-900 to-slate-800 dark:from-slate-900 dark:to-black rounded-3xl sm:rounded-4xl p-8 sm:p-14 text-white border border-gray-800 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 inline-block">
                {t.trust_badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {t.trust_title}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t.trust_desc}
              </p>

              <div className="space-y-3 pt-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span>{t.trust_point_1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span>{t.trust_point_2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span>{t.trust_point_3}</span>
                </div>
              </div>
            </div>

            {/* CTA Box inside */}
            <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 dark:border-slate-700 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
                <PlusCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {t.cta_title}
                </h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  {t.cta_desc}
                </p>
              </div>
              <Link
                href="/add-property"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-sm shadow-xl transition-all active:scale-98"
              >
                <PlusCircle className="w-5 h-5 text-blue-600" />
                <span>{t.cta_button}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
