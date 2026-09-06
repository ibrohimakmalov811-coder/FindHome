'use client';

import React from 'react';
import { useProperties } from '@/context/PropertyContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useProperties();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Yorug\' rejimga o\'tish' : 'Qorong\'u (Dark) rejimga o\'tish'}
      className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 animate-in spin-in-180 duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 animate-in spin-in-180 duration-300" />
      )}
    </button>
  );
}
