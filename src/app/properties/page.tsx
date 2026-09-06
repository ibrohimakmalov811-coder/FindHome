'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProperties } from '@/context/PropertyContext';
import { Property, FilterState, PropertyType, DealType } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';
import FilterSidebar from '@/components/FilterSidebar';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  MapPin, 
  Home, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { properties, filters, setFilters, resetFilters } = useProperties();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync URL query params into filters state on first load
  useEffect(() => {
    const dealParam = searchParams.get('deal') as DealType;
    const cityParam = searchParams.get('city');
    const typeParam = searchParams.get('type') as PropertyType;
    const roomsParam = searchParams.get('rooms');
    const maxPriceParam = searchParams.get('maxPrice');
    const queryParam = searchParams.get('q');

    setFilters((prev) => ({
      ...prev,
      dealType: dealParam ? dealParam : prev.dealType,
      city: cityParam ? cityParam : prev.city,
      propertyType: typeParam ? typeParam : prev.propertyType,
      rooms: roomsParam && roomsParam !== 'all' ? Number(roomsParam) : prev.rooms,
      maxPrice: maxPriceParam ? Number(maxPriceParam) : prev.maxPrice,
      searchQuery: queryParam ? queryParam : prev.searchQuery,
    }));
  }, [searchParams, setFilters]);

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Search text
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        const matchesDistrict = prop.district.toLowerCase().includes(q);
        const matchesCity = prop.city.toLowerCase().includes(q);
        const matchesAddress = prop.address.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesDistrict && !matchesCity && !matchesAddress) {
          return false;
        }
      }

      // Deal type
      if (filters.dealType !== 'all' && prop.dealType !== filters.dealType) {
        return false;
      }

      // City
      if (filters.city !== 'all' && prop.city !== filters.city) {
        return false;
      }

      // Property type
      if (filters.propertyType !== 'all' && prop.propertyType !== filters.propertyType) {
        return false;
      }

      // Rooms
      if (filters.rooms !== 'all') {
        if (filters.rooms === 4) {
          if (prop.rooms < 4) return false;
        } else if (prop.rooms !== filters.rooms) {
          return false;
        }
      }

      // Min Price
      if (filters.minPrice !== '' && prop.price < Number(filters.minPrice)) {
        return false;
      }

      // Max Price
      if (filters.maxPrice !== '' && prop.price > Number(filters.maxPrice)) {
        return false;
      }

      // Min Area
      if (filters.minArea !== '' && prop.area < Number(filters.minArea)) {
        return false;
      }

      // Max Area
      if (filters.maxArea !== '' && prop.area > Number(filters.maxArea)) {
        return false;
      }

      // Furnished
      if (filters.isFurnished === true && !prop.isFurnished) {
        return false;
      }

      // Amenities
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          prop.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'area_asc') return a.area - b.area;
      if (filters.sortBy === 'area_desc') return b.area - a.area;
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filters]);

  // Remove individual active filter
  const removeFilter = (key: keyof FilterState, defaultValue: any) => {
    setFilters({ ...filters, [key]: defaultValue });
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
      {/* Top Header & Search Bar */}
      <div className="space-y-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Ko'chmas mulk katalogi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ijara va sotuvdagi eng so'nggi xonadonlar, hovlilar va ofislar ({filteredProperties.length} ta taklif)
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-3 transition-colors">
          {/* Main search text input */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Shahar, tuman, ko'cha yoki so'z bo'yicha qidirish..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white font-medium focus:outline-none focus:border-blue-500"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 font-bold text-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Filtrlar</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-xs font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="newest">Eng yangilari</option>
              <option value="price_asc">Narx: Avval arzonlari</option>
              <option value="price_desc">Narx: Avval qimmatlari</option>
              <option value="area_desc">Maydoni: Kattaroq</option>
              <option value="area_asc">Maydoni: Kichikroq</option>
            </select>

            {/* View Mode Toggle (Grid / List) */}
            <div className="hidden sm:flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-gray-500 dark:text-gray-400'}`}
                title="Katakchalar (Grid)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-gray-500 dark:text-gray-400'}`}
                title="Ro'yxat (List)"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.dealType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {filters.dealType === 'rent' ? 'Ijara' : 'Sotuv'}
              <button onClick={() => removeFilter('dealType', 'all')}>
                <X className="w-3 h-3 hover:text-blue-900" />
              </button>
            </span>
          )}

          {filters.city !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {filters.city}
              <button onClick={() => removeFilter('city', 'all')}>
                <X className="w-3 h-3 hover:text-indigo-900" />
              </button>
            </span>
          )}

          {filters.propertyType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
              {filters.propertyType}
              <button onClick={() => removeFilter('propertyType', 'all')}>
                <X className="w-3 h-3 hover:text-violet-900" />
              </button>
            </span>
          )}

          {filters.rooms !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              {filters.rooms} xonali
              <button onClick={() => removeFilter('rooms', 'all')}>
                <X className="w-3 h-3 hover:text-amber-950" />
              </button>
            </span>
          )}

          {filters.maxPrice !== '' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Maks: ${filters.maxPrice}
              <button onClick={() => removeFilter('maxPrice', '')}>
                <X className="w-3 h-3 hover:text-emerald-950" />
              </button>
            </span>
          )}

          {(filters.dealType !== 'all' ||
            filters.city !== 'all' ||
            filters.propertyType !== 'all' ||
            filters.rooms !== 'all' ||
            filters.maxPrice !== '' ||
            filters.searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-500 hover:text-rose-700 underline ml-2"
            >
              Hammasini tozalash
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Sidebar + Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
            totalResults={filteredProperties.length}
          />
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="w-full max-w-xs bg-white dark:bg-slate-900 h-full overflow-y-auto p-4 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800">
                <span className="font-bold text-base text-gray-900 dark:text-white">Filtrlar</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
                totalResults={filteredProperties.length}
              />
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm"
              >
                Natijalarni ko'rish ({filteredProperties.length})
              </button>
            </div>
          </div>
        )}

        {/* Listings Result Column */}
        <div className="lg:col-span-3">
          {filteredProperties.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Hech qanday mos e'lon topilmadi
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Qidiruv shartlarini o'zgartirib ko'ring yoki filtrlarni tozalang.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Filtrlarni tozalash</span>
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-gray-500 dark:text-gray-400">Katalog yuklanmoqda...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
