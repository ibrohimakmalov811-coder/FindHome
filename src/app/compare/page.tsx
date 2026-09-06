'use client';

import React from 'react';
import Link from 'next/link';
import { useProperties } from '@/context/PropertyContext';
import { 
  Layers, 
  Trash2, 
  Home, 
  Check, 
  X, 
  ArrowRight,
  Phone 
} from 'lucide-react';

export default function ComparePage() {
  const { properties, comparison, toggleCompare, clearCompare, formatPrice } = useProperties();

  const compareProperties = properties.filter((p) => comparison.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Taqqoslov</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Uylarni yonma-yon solishtirish ({compareProperties.length}/4)
          </h1>
        </div>

        {compareProperties.length > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Taqqoslovni tozalash</span>
          </button>
        )}
      </div>

      {compareProperties.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 sm:p-20 text-center border border-gray-100 dark:border-slate-800 shadow-sm space-y-5 max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Layers className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Solishtirish uchun uylar tanlanmagan
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Katalogdagi uylar kartochkasida qatlamlar (solishtirish) tugmasini bosib, 4 tagacha uyni bir vaqtda taqqoslashingiz mumkin.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Katalogdan uy tanlash</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[700px] border-collapse bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800">
            {/* Table Header: Photos & Quick Actions */}
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
                <th className="p-4 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-48">
                  Ko'rsatkichlar
                </th>
                {compareProperties.map((property) => (
                  <th key={property.id} className="p-4 text-left w-64 align-top">
                    <div className="space-y-3">
                      <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => toggleCompare(property.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white hover:bg-rose-600 flex items-center justify-center transition-colors"
                          title="O'chirish"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <div className="text-lg font-black text-gray-900 dark:text-white">
                          {formatPrice(property.price, property.dealType, property.pricePeriod)}
                        </div>
                        <h4 className="font-bold text-xs text-gray-800 dark:text-gray-200 line-clamp-2 mt-1">
                          {property.title}
                        </h4>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body: Specifications */}
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-xs sm:text-sm">
              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Bitim turi</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-gray-900 dark:text-white">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                        p.dealType === 'rent' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      {p.dealType === 'rent' ? 'Ijara' : 'Sotuv'}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Mulk turi</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200 capitalize">
                    {p.propertyType}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Joylashuv</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                    {p.district}, {p.city}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Umumiy maydon</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-black text-gray-900 dark:text-white">
                    {p.area} m²
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Xonalar</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                    {p.rooms} xona ({p.bedrooms} yotoqxona)
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Shift balandligi</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                    {p.ceilingHeight || 3.0} m
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Qavati</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                    {p.floor ? `${p.floor}/${p.totalFloors || '—'}` : `${p.totalFloors || 1} qavat`}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Ta'miri</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200 capitalize">
                    {p.renovation} ta'mir
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Mebel</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                    {p.isFurnished ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Mavjud
                      </span>
                    ) : (
                      <span className="text-gray-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Yo'q
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Kadastr</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ 100% tayyor
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">1 m² narxi</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-gray-900 dark:text-white">
                    ~${Math.round(p.price / p.area)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Qulayliklar</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex flex-wrap gap-1">
                      {p.amenities.map((a) => (
                        <span key={a} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Aloqa</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                    <div>{p.contact.name}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold">{p.contact.phone}</div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-slate-800/30">Harakat</td>
                {compareProperties.map((p) => (
                  <td key={p.id} className="p-4">
                    <Link
                      href={`/properties/${p.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
                    >
                      <span>Ko'rish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
