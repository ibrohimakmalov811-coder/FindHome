'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProperties } from '@/context/PropertyContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
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
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
      {/* Expanded wide container for spacious layout */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20 sm:h-22 gap-6">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Home className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                  Uy<span className="text-blue-600 dark:text-blue-400">Bozor</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                  UZ
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium -mt-1 hidden sm:block">
                {t.nav_portal_subtitle}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links - Relaxed, spread out and breathable */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 bg-gray-50/90 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-700/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 xl:px-5 py-2.5 rounded-xl text-sm xl:text-base font-semibold transition-all whitespace-nowrap ${
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

          {/* Actions & Utilities - Wide and evenly spaced */}
          <div className="hidden md:flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Language Selector (UZ / RU / EN / ZH) */}
            <LanguageSelector />

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Currency Switcher */}
            <div className="flex items-center bg-gray-100/90 dark:bg-slate-800 p-1 rounded-xl border border-gray-200/70 dark:border-slate-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
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
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
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
              className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Layers className="w-5 h-5" />
              {comparison.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in-50">
                  {comparison.length}
                </span>
              )}
            </Link>

            {/* Favorites Link */}
            <Link
              href="/favorites"
              title={t.nav_favorites}
              className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in-50">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Profile or Login/Register */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-blue-400 transition-colors shadow-2xs"
                >
                  {/* Real Photo Avatar */}
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/20 shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="text-left hidden xl:block">
                    <span className="text-xs font-bold text-gray-900 dark:text-gray-100 block line-clamp-1 max-w-[110px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block">
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 py-2.5 z-50 animate-in fade-in-50 zoom-in-95">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-500/20"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-base">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
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
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 text-left border-t border-gray-100 dark:border-slate-800 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.nav_logout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {t.nav_login}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 transition-colors shadow-xs"
                >
                  {t.nav_register}
                </Link>
              </div>
            )}

            {/* Add Property Button */}
            <Link
              href="/add-property"
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 hover:shadow-lg transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.nav_add_property}</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger & Quick Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <ThemeToggle />
            <Link
              href="/favorites"
              className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/compare"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                {t.nav_compare}
              </span>
              {comparison.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  {comparison.length} ta
                </span>
              )}
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                🛡️ {t.nav_admin_panel}
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-slate-800 space-y-3">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl">
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
                  <div>
                    <span className="font-bold text-sm text-gray-900 dark:text-white block">{user.name}</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{getRoleLabel(user.role)}</span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50"
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
                  className="py-2.5 text-center rounded-xl bg-gray-100 dark:bg-slate-800 text-xs font-bold text-gray-800 dark:text-gray-200"
                >
                  {t.nav_login}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-blue-600 text-xs font-bold text-white"
                >
                  {t.nav_register}
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Valyuta:</span>
              <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1.5 rounded-lg ${currency === 'USD' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-gray-500'}`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency('UZS')}
                  className={`px-3 py-1.5 rounded-lg ${currency === 'UZS' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-gray-500'}`}
                >
                  UZS
                </button>
              </div>
            </div>

            <Link
              href="/add-property"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25"
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
