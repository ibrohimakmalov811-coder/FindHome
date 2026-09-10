'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/data/translations';
import { Globe, ChevronDown } from 'lucide-react';

export interface LangOption {
  code: Language;
  name: string;
  flag: string;
  label: string;
}

export const LANGUAGES: LangOption[] = [
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿', label: 'UZ' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', label: 'RU' },
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
  { code: 'zh', name: '中文', flag: '🇨🇳', label: 'ZH' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gray-100/90 dark:bg-slate-800/90 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200/70 dark:border-slate-700 text-xs font-bold transition-colors"
        title="Tilni tanlang / Select Language / Выберите язык / 选择语言"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="font-extrabold uppercase">{currentLang.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
          <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-slate-800">
            Tilni tanlang
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{item.flag}</span>
                  <span>{item.name}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
