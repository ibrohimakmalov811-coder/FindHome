'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Home, Mail, Phone, MapPin, Send, ShieldCheck, Award, Scale } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 border-t border-gray-800 dark:border-slate-900 transition-colors">
      {/* Value props banner */}
      <div className="border-b border-gray-800/80 bg-gray-950/40">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">{t.trust_point_1}</h4>
                <p className="text-sm text-gray-400">{t.hero_stat_active}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">{t.trust_point_2}</h4>
                <p className="text-sm text-gray-400">{t.hero_stat_commission}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">{t.trust_point_3}</h4>
                <p className="text-sm text-gray-400">{t.hero_stat_legal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Uy<span className="text-blue-500">Bozor</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {t.footer_desc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-gray-400"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="tel:+998712000000"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-gray-400"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@uybozor.uz"
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-gray-400"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{t.footer_sections}</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?deal=rent" className="hover:text-white transition-colors">
                  {t.nav_rent}
                </Link>
              </li>
              <li>
                <Link href="/properties?deal=sale" className="hover:text-white transition-colors">
                  {t.nav_sale}
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-blue-400 hover:underline flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.nav_security}
                </Link>
              </li>
              <li>
                <Link href="/add-property" className="hover:text-white transition-colors">
                  {t.nav_add_property}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-indigo-400 transition-colors text-xs text-gray-400">
                  {t.nav_admin_panel}
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{t.search_city_label}</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?city=Toshkent" className="hover:text-white transition-colors">
                  Toshkent shahri
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Samarqand" className="hover:text-white transition-colors">
                  Samarqand
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Buxoro" className="hover:text-white transition-colors">
                  Buxoro
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Namangan" className="hover:text-white transition-colors">
                  Namangan
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Farg'ona" className="hover:text-white transition-colors">
                  Farg'ona
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{t.footer_contacts}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Toshkent shahri, Amir Temur shoh ko'chasi, 107B</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+998 (71) 200-00-00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-blue-400 shrink-0" />
                <span>@uybozor_official</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} UyBozor. {t.footer_rights}</p>
          <div className="flex items-center gap-6">
            <Link href="/security" className="hover:underline text-gray-400">{t.nav_security}</Link>
            <Link href="/login" className="hover:underline">{t.nav_login}</Link>
            <Link href="/register" className="hover:underline">{t.nav_register}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
