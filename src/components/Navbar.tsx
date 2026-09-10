'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProperties } from '@/context/PropertyContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector, { LANGUAGES } from '@/components/LanguageSelector';
import { 
  Home, 
  Heart, 
  Layers, 
  PlusCircle, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ShieldAlert, 
  ChevronDown 
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { favorites, comparison, currency, setCurrency } = useProperties();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t.nav_home, href: '/' },
    { name: t.nav_catalog, href: '/properties' },
    { name: t.nav_rent, href: '/properties?deal=rent' },
    { name: t.nav_sale, href: '/properties?deal=sale' },
    { name: t.nav_security, href: '/security' },
  ];

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'admin':
        return t.role_admin;
      case 'owner':
        return t.role_owner;
      case 'realtor':
        return t.role_realtor;
      case 'buyer':
        return t.role_buyer;
      default:
        return t.role_user;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors shadow-xs">
      {/* Responsive container */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 lg:gap-4">
          
          {/* Left Flank: Brand Logo (shrink-0 to prevent squishing) */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0">
                <Home className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl 2xl:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                    Uy<span className="text-blue-600 dark:text-blue-400">Bozor</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                    UZ
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium -mt-0.5 hidden 2xl:block">
                  {t.nav_portal_subtitle}
                </p>
              </div>
            </Link>
          </div>

          {/* Center Flank: Navigation Links (Visible on xl: 1280px+) */}
          <div className="hidden xl:flex items-center justify-center shrink-0">
            <nav className="flex items-center gap-1 2xl:gap-2 bg-gray-50/90 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-700/80 shadow-2xs">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 2xl:px-4 py-1.5 2xl:py-2 rounded-xl text-xs 2xl:text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-slate-700/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Flank: Actions & Utilities (shrink-0 to prevent overlap) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 2xl:gap-3 shrink-0">
            
            {/* Tablet & Desktop utilities (hidden on mobile < 768px) */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
              {/* Language Selector */}
              <LanguageSelector />

              {/* Dark Mode Toggle */}
              <ThemeToggle />

              {/* Currency Switcher */}
              <div className="flex items-center bg-gray-100/90 dark:bg-slate-800 p-0.5 sm:p-1 rounded-xl border border-gray-200/70 dark:border-slate-700 text-xs font-bold shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currency === 'USD'
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-black'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  $ USD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('UZS')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    currency === 'UZS'
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-black'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  UZS
                </button>
              </div>

              {/* Comparison Link */}
              <Link
                href="/compare"
                title={t.nav_compare}
                className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors shrink-0"
              >
                <Layers className="w-5 h-5" />
                {comparison.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {comparison.length}
                  </span>
                )}
              </Link>

              {/* Favorites Link */}
              <Link
                href="/favorites"
                title={t.nav_favorites}
                className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors shrink-0"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* User Profile or Login/Register */}
              {isAuthenticated && user ? (
                <div className="relative shrink-0" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 sm:pr-2.5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-blue-400 transition-colors shadow-2xs"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-xl object-cover ring-1 ring-blue-500/30 shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="text-left hidden 2xl:block">
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100 block line-clamp-1 max-w-[100px]">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block">
                        {getRoleLabel(user.role)}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 py-2.5 z-50 animate-in fade-in-50 zoom-in-95">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                            {getRoleLabel(user.role)}
                          </span>
                        </div>
                      </div>

                      {(user.role === 'admin' || isAdmin) && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800"
                        >
                          <ShieldAlert className="w-4 h-4" />
                          <span>{t.nav_admin_panel}</span>
                        </Link>
                      )}

                      <Link
                        href="/add-property"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                      >
                        <PlusCircle className="w-4 h-4 text-blue-600" />
                        <span>{t.nav_add_property}</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 text-left border-t border-gray-100 dark:border-slate-800 mt-1 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t.nav_logout}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href="/login"
                    className="px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {t.nav_login}
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-1.5 2xl:px-3.5 2xl:py-2 rounded-xl text-xs font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 transition-colors shadow-xs"
                  >
                    {t.nav_register}
                  </Link>
                </div>
              )}

              {/* Add Property Button */}
              <Link
                href="/add-property"
                className="flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 hover:shadow-lg transition-all active:scale-98 shrink-0"
              >
                <PlusCircle className="w-4 h-4 shrink-0" />
                <span className="hidden 2xl:inline">{t.nav_add_property}</span>
                <span className="inline 2xl:hidden">+ E'lon</span>
              </Link>
            </div>

            {/* Tablet Menu Toggle (Between md: 768px and xl: 1280px) */}
            <div className="hidden md:flex xl:hidden items-center shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
                aria-label="Toggle Tablet Menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span>{isMobileMenuOpen ? 'Yopish' : 'Menyu'}</span>
              </button>
            </div>

            {/* Mobile Header Controls (< 768px) - Clean & Absolutely Zero Overlap */}
            <div className="flex md:hidden items-center gap-1 shrink-0">
              <ThemeToggle />
              
              <Link
                href="/favorites"
                className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title={t.nav_favorites}
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-900 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Responsive Mobile / Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 pt-4 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          
          {/* Mobile Quick Settings: 4-Language Grid & Currency */}
          <div className="p-3 bg-gray-50 dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700/60 space-y-3">
            <div>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                Til / Язык / Language / 语言
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {LANGUAGES.map((item) => {
                  const isSelected = item.code === language;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setLanguage(item.code)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200/60 dark:border-slate-700'
                      }`}
                    >
                      <span className="text-base leading-none">{item.flag}</span>
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 dark:border-slate-700/60">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Valyuta:
              </span>
              <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-200/60 dark:border-slate-700 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    currency === 'USD' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  $ USD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('UZS')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    currency === 'UZS' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  UZS
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/compare"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-indigo-500" />
                {t.nav_compare}
              </span>
              {comparison.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                  {comparison.length} ta
                </span>
              )}
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                🛡️ {t.nav_admin_panel}
              </Link>
            )}
          </div>

          {/* User Section or Login/Register */}
          <div className="pt-3 border-t border-gray-100 dark:border-slate-800 space-y-3">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <span className="font-bold text-sm text-gray-900 dark:text-white block truncate">{user.name}</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{getRoleLabel(user.role)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                  title={t.nav_logout}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-center rounded-xl bg-gray-100 dark:bg-slate-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-200 transition-colors"
                >
                  {t.nav_login}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-center rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  {t.nav_register}
                </Link>
              </div>
            )}

            {/* Post Listing CTA */}
            <Link
              href="/add-property"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/25 active:scale-98 transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              {t.nav_add_property}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
