'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperties } from '@/context/PropertyContext';
import PropertyGallery from '@/components/PropertyGallery';
import ContactModal from '@/components/ContactModal';
import LeaseAgreementModal from '@/components/LeaseAgreementModal';
import MortgageCalculator from '@/components/MortgageCalculator';
import PropertyCard from '@/components/PropertyCard';
import {
  MapPin,
  BedDouble,
  Maximize2,
  Building,
  Bath,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Eye,
  Heart,
  Layers,
  Phone,
  Send,
  ArrowLeft,
  Share2,
  Check,
  AlertCircle,
  Home,
  Flame,
  ArrowUpToLine,
  FileCheck,
  Car,
  Utensils,
  Scale,
  FileText
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { properties, isFavorite, toggleFavorite, isInCompare, toggleCompare, formatPrice } = useProperties();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const propertyId = params.id as string;
  const property = properties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-500 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">E'lon topilmadi</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ushbu e'lon o'chirilgan yoki mavjud emas.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Katalogga qaytish</span>
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.dealType === property.dealType))
    .slice(0, 3);

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Bosh sahifa</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-blue-600 dark:hover:text-blue-400">Katalog</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-200 font-bold">{property.city}</span>
          <span>/</span>
          <span className="text-gray-400 line-clamp-1 max-w-[200px]">{property.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Nusxalandi!' : 'Ulashish'}</span>
          </button>
        </div>
      </div>

      {/* Main Header & Title */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              property.dealType === 'rent'
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {property.dealType === 'rent' ? 'Ijara' : 'Sotuv'}
          </span>
          {property.isVerified && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              100% Tekshirilgan
            </span>
          )}
          {property.isFeatured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white flex items-center gap-1 shadow-xs">
              VIP E'lon
            </span>
          )}
          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 ml-auto">
            <Eye className="w-3.5 h-3.5" />
            {property.viewsCount} marta ko'rildi
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-snug">
          {property.title}
        </h1>

        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 text-sm font-medium">
          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>{property.address}, {property.district}, {property.city}</span>
        </div>
      </div>

      {/* Media Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Content Layout: Details (left) & Sticky Contact (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        {/* Left column: specs, description, amenities, calculator */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Specifications Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Asosiy ko'rsatkichlar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Umumiy maydoni</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{property.area} m²</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Xonalar soni</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{property.rooms} xona</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Sanuzel</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{property.bathrooms} ta</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Qavati</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                    {property.floor ? `${property.floor}/${property.totalFloors || '—'}` : `${property.totalFloors || 1} qavat`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Ta'miri</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base capitalize">{property.renovation} ta'mir</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Qurilgan yili</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{property.buildYear || '2023'}-yil</span>
                </div>
              </div>

              {/* Extended fields */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <ArrowUpToLine className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Shift balandligi</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{property.ceilingHeight || 3.0} m</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Isitish tizimi</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base capitalize">{property.heatingType || 'avtonom'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Kadastr hujjati</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">100% tayyor</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Oshxona maydoni</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{property.kitchenArea || 14} m²</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Avtoturargoh</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base capitalize">{property.parkingType || 'mavjud'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">E'lon tavsifi</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Legal Lease / Contract Action Banner */}
          <div className="bg-blue-50/80 dark:bg-slate-800/80 p-6 rounded-3xl border border-blue-200/70 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                  Rasmiy Ijara / Oldi-sotdi Shartnomasi kerakmi?
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  O'zbekiston Respublikasi qonunchiligiga to'liq mos keluvchi shablonni bepul yuklab oling.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsContractModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 shadow-md transition-all active:scale-98"
            >
              Shartnomani ko'rish
            </button>
          </div>

          {/* Amenities Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mavjud qulayliklar va jihozlar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Infrastructure Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Joylashuvi va atrof-muhit</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">{property.district}, {property.city}</span>
            </div>

            {/* Map Simulation Box */}
            <div className="relative aspect-21/9 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center text-center p-4">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Map preview"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xl animate-pulse">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-lg">
                  {property.address}
                </div>
              </div>
            </div>
          </div>

          {/* Mortgage Calculator Widget (For Sale properties) */}
          {property.dealType === 'sale' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ushbu xonadon uchun ipoteka hisobi</h3>
              <MortgageCalculator initialPrice={property.price} />
            </div>
          )}
        </div>

        {/* Right column: Sticky Contact & Price Box */}
        <div className="lg:col-span-4 sticky top-28 space-y-5">
          {/* Price & Action Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1">
                {property.dealType === 'rent' ? 'Ijara narxi' : 'Sotuv narxi'}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                {formatPrice(property.price, property.dealType, property.pricePeriod)}
              </div>
              {property.dealType === 'sale' && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                  1 m² narxi: ~${Math.round(property.price / property.area)}
                </p>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={`tel:${property.contact.phone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all active:scale-98"
              >
                <Phone className="w-4 h-4" />
                <span>{property.contact.phone}</span>
              </a>

              <a
                href={`https://t.me/${property.contact.telegram}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Telegram orqali bog'lanish</span>
              </a>

              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all"
              >
                So'rov qoldirish / Qo'ng'iroq buyurtma qilish
              </button>
            </div>

            {/* Favorite & Compare Toggles */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => toggleFavorite(property.id)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  favorite
                    ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400'
                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{favorite ? 'Saqlangan' : 'Saqlash'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(property.id)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  inCompare
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400'
                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{inCompare ? 'Taqqoslashda' : 'Solishtirish'}</span>
              </button>
            </div>

            {/* Owner Info Details */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                {property.contact.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{property.contact.name}</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  {property.contact.isOwner ? 'Mulk egasi (0% komissiya)' : 'Ishonchli rieltor'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>O'zbekiston qonunchiligi asosida xavfsiz bitim kafolati</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-gray-100 dark:border-slate-800 space-y-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            O'xshash takliflar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        property={property}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Lease Agreement Modal */}
      <LeaseAgreementModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        propertyTitle={property.title}
        propertyAddress={`${property.address}, ${property.district}, ${property.city}`}
        monthlyRent={formatPrice(property.price, property.dealType, property.pricePeriod)}
      />
    </div>
  );
}
