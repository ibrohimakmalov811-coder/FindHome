'use client';

import React from 'react';
import Link from 'next/link';
import { useProperties } from '@/context/PropertyContext';
import PropertyCard from '@/components/PropertyCard';
import { Heart, ArrowRight, Trash2, Home } from 'lucide-react';

export default function FavoritesPage() {
  const { properties, favorites, toggleFavorite } = useProperties();

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  const clearAllFavorites = () => {
    favorites.forEach((id) => toggleFavorite(id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-rose-500 mb-1">
            <Heart className="w-5 h-5 fill-rose-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Saqlanganlar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Sevimli e'lonlarim ({favoriteProperties.length})
          </h1>
        </div>

        {favoriteProperties.length > 0 && (
          <button
            type="button"
            onClick={clearAllFavorites}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Barchasini tozalash</span>
          </button>
        )}
      </div>

      {/* Content */}
      {favoriteProperties.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 sm:p-20 text-center border border-gray-100 dark:border-slate-800 shadow-sm space-y-5 max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Hozircha hech qanday e'lon saqlanmagan
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sizga yoqqan xonadonlarni yurakcha belgisini bosish orqali bu yerga saqlab qo'yishingiz mumkin.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Katalogga o'tish</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
