'use client';

import React from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { useProperties } from '@/context/PropertyContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Heart, 
  Layers, 
  MapPin, 
  BedDouble, 
  Maximize2, 
  Building, 
  CheckCircle2, 
  Star 
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, toggleFavorite, isInCompare, toggleCompare, formatPrice } = useProperties();
  const { t } = useLanguage();

  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const getPropertyTypeLabel = (type: Property['propertyType']) => {
    switch (type) {
      case 'apartment':
        return t.type_apartment;
      case 'house':
        return t.type_house;
      case 'villa':
        return t.type_villa;
      case 'new_building':
        return t.type_new_building;
      case 'commercial':
        return t.type_commercial;
      default:
        return type;
    }
  };

  const dealLabel = property.dealType === 'rent' ? (t.nav_rent || 'Ijara') : (t.nav_sale || 'Sotuv');

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-gray-200 dark:hover:border-slate-700 transition-all duration-300 flex flex-col">
      {/* Media / Image Box */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-slate-800">
        <Link href={`/properties/${property.id}`} className="block w-full h-full">
          <img
            src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${
              property.dealType === 'rent'
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {dealLabel}
          </span>
          {property.isVerified && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/90 text-blue-700 dark:text-blue-300 backdrop-blur-xs flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              {t.card_verified}
            </span>
          )}
          {property.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white flex items-center gap-1 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-white" />
              {t.card_vip}
            </span>
          )}
        </div>

        {/* Action Buttons: Favorite & Compare */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
            title={favorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all ${
              favorite
                ? 'bg-rose-500 text-white scale-105'
                : 'bg-white/90 dark:bg-slate-900/90 text-gray-700 dark:text-gray-200 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(property.id);
            }}
            title={inCompare ? "Taqqoslashdan chiqarish" : "Taqqoslashga qo'shish"}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all ${
              inCompare
                ? 'bg-indigo-600 text-white scale-105'
                : 'bg-white/90 dark:bg-slate-900/90 text-gray-700 dark:text-gray-200 hover:bg-white hover:text-indigo-600'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* Property Type Badge bottom left */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-900/80 text-white backdrop-blur-xs">
            {getPropertyTypeLabel(property.propertyType)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {formatPrice(property.price, property.dealType, property.pricePeriod)}
            </span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.id}`} className="block">
            <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-medium mt-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
            <span className="line-clamp-1">
              {property.district}, {property.city}
            </span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1.5 text-xs">
            <BedDouble className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="font-semibold">{property.rooms} {t.card_rooms}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Maximize2 className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="font-semibold">{property.area} {t.card_area}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Building className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="font-semibold">
              {property.floor ? `${property.floor}/${property.totalFloors || '—'}` : `${property.totalFloors || 1} ${t.card_floor}`}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3">
          <Link
            href={`/properties/${property.id}`}
            className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 text-gray-700 dark:text-gray-200 group-hover:text-white dark:group-hover:text-white font-bold text-xs flex items-center justify-center transition-all"
          >
            {t.card_details}
          </Link>
        </div>
      </div>
    </div>
  );
}
