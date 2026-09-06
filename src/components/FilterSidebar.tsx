'use client';

import React from 'react';
import { FilterState, PropertyType, DealType, RenovationType } from '@/types/property';
import { RotateCcw, Filter, Check } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const AMENITIES_LIST = [
  'Wi-Fi',
  'Konditsioner',
  'Mebel',
  'Muzlatgich',
  'Kir yuvish mashinasi',
  'Lift',
  'Avtoturargoh',
  'Bolalar maydonchasi',
  'Qo\'riqlash xizmati',
  'Basseyn',
];

export default function FilterSidebar({
  filters,
  onChange,
  onReset,
  totalResults,
}: FilterSidebarProps) {
  const handleDealType = (type: DealType | 'all') => {
    onChange({ ...filters, dealType: type });
  };

  const handlePropertyType = (type: PropertyType | 'all') => {
    onChange({ ...filters, propertyType: type });
  };

  const handleRooms = (r: number | 'all') => {
    onChange({ ...filters, rooms: r });
  };

  const toggleAmenity = (item: string) => {
    const exists = filters.amenities.includes(item);
    const updated = exists
      ? filters.amenities.filter((a) => a !== item)
      : [...filters.amenities, item];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <aside className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Filtrlar</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-rose-500 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Tozalash</span>
        </button>
      </div>

      {/* Bitim turi (Deal Type) */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2.5">
          Bitim turi
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleDealType('all')}
            className={`py-2 rounded-xl transition-all ${
              filters.dealType === 'all'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Hammasi
          </button>
          <button
            type="button"
            onClick={() => handleDealType('rent')}
            className={`py-2 rounded-xl transition-all ${
              filters.dealType === 'rent'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Ijara
          </button>
          <button
            type="button"
            onClick={() => handleDealType('sale')}
            className={`py-2 rounded-xl transition-all ${
              filters.dealType === 'sale'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Sotuv
          </button>
        </div>
      </div>

      {/* Shahar */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
          Shahar / Viloyat
        </label>
        <select
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value })}
          className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 focus:outline-none focus:border-blue-500"
        >
          <option value="all">Barcha hududlar</option>
          <option value="Toshkent">Toshkent shahri</option>
          <option value="Samarqand">Samarqand</option>
          <option value="Buxoro">Buxoro</option>
          <option value="Namangan">Namangan</option>
          <option value="Farg'ona">Farg'ona</option>
          <option value="Andijon">Andijon</option>
        </select>
      </div>

      {/* Mulk turi */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
          Mulk turi
        </label>
        <div className="space-y-1.5 text-xs font-semibold">
          {[
            { id: 'all', label: 'Barcha mulk turlari' },
            { id: 'apartment', label: 'Kvartira' },
            { id: 'house', label: 'Hovli uy' },
            { id: 'villa', label: 'Kottej / Villa' },
            { id: 'new_building', label: 'Yangi bino (Novostroyka)' },
            { id: 'commercial', label: 'Tijorat maydoni' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePropertyType(item.id as any)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                filters.propertyType === item.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{item.label}</span>
              {filters.propertyType === item.id && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Xonalar soni */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
          Xonalar soni
        </label>
        <div className="grid grid-cols-5 gap-1.5 text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => handleRooms('all')}
            className={`py-2 rounded-xl border transition-all ${
              filters.rooms === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            Hammasi
          </button>
          {[1, 2, 3, 4].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRooms(r)}
              className={`py-2 rounded-xl border transition-all ${
                filters.rooms === r
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {r === 4 ? '4+' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Narx oralig'i */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
          Narx ($)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={filters.minPrice}
            onChange={(e) =>
              onChange({
                ...filters,
                minPrice: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({
                ...filters,
                maxPrice: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Maydoni (m²) */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
          Maydoni (m²)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min m²"
            value={filters.minArea}
            onChange={(e) =>
              onChange({
                ...filters,
                minArea: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Max m²"
            value={filters.maxArea}
            onChange={(e) =>
              onChange({
                ...filters,
                maxArea: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Mebel borligi */}
      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={filters.isFurnished === true}
            onChange={(e) =>
              onChange({
                ...filters,
                isFurnished: e.target.checked ? true : null,
              })
            }
            className="w-4 h-4 rounded text-blue-600 border-gray-300 dark:border-slate-700 focus:ring-blue-500"
          />
          <span>Faqat mebelli uylar</span>
        </label>
      </div>

      {/* Qulayliklar (Amenities) */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2.5">
          Qulayliklar
        </label>
        <div className="space-y-2">
          {AMENITIES_LIST.map((item) => {
            const checked = filters.amenities.includes(item);
            return (
              <label
                key={item}
                className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAmenity(item)}
                  className="w-4 h-4 rounded text-blue-600 border-gray-300 dark:border-slate-700 focus:ring-blue-500"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Total Result Badge */}
      <div className="pt-4 border-t border-gray-100 dark:border-slate-800 text-center">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          Topilgan takliflar: <strong className="text-blue-600 dark:text-blue-400 text-sm">{totalResults} ta</strong>
        </span>
      </div>
    </aside>
  );
}
