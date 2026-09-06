'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProperties } from '@/context/PropertyContext';
import { useAuth } from '@/context/AuthContext';
import { DealType, PropertyType, RenovationType } from '@/types/property';
import { 
  PlusCircle, 
  CheckCircle2, 
  Building, 
  MapPin, 
  DollarSign, 
  Home, 
  Phone, 
  Send, 
  Sparkles, 
  Camera, 
  ArrowRight,
  ShieldCheck,
  Flame,
  ArrowUpToLine,
  FileCheck 
} from 'lucide-react';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
];

const AVAILABLE_AMENITIES = [
  'Wi-Fi',
  'Konditsioner',
  'Mebel',
  'Muzlatgich',
  'Kir yuvish mashinasi',
  'Televizor',
  'Lift',
  'Avtoturargoh',
  'Bolalar maydonchasi',
  'Qo\'riqlash xizmati',
  'Basseyn',
  'Kamera kuzatuvi',
];

export default function AddPropertyPage() {
  const router = useRouter();
  const { addProperty } = useProperties();
  const { user } = useAuth();

  const [dealType, setDealType] = useState<DealType>('rent');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [city, setCity] = useState('Toshkent');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState<number | ''>('');
  const [rooms, setRooms] = useState<number>(2);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [floor, setFloor] = useState<number | ''>(3);
  const [totalFloors, setTotalFloors] = useState<number | ''>(9);
  const [renovation, setRenovation] = useState<RenovationType>('evro');
  const [isFurnished, setIsFurnished] = useState(true);

  // Extended specs
  const [ceilingHeight, setCeilingHeight] = useState<number>(3.0);
  const [heatingType, setHeatingType] = useState<'avtonom' | 'markaziy' | 'gaz'>('avtonom');
  const [cadastreStatus, setCadastreStatus] = useState(true);
  const [kitchenArea, setKitchenArea] = useState<number | ''>(14);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Wi-Fi',
    'Konditsioner',
    'Muzlatgich',
  ]);
  const [selectedImages, setSelectedImages] = useState<string[]>([SAMPLE_IMAGES[0], SAMPLE_IMAGES[1]]);

  // Contact info
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('+998 ');
  const [contactTelegram, setContactTelegram] = useState('');
  const [isOwner, setIsOwner] = useState(true);

  // Auto populate if user is logged in
  useEffect(() => {
    if (user) {
      setContactName(user.name);
      if (user.phone && user.phone.length > 5) {
        setContactPhone(user.phone);
      }
      if (user.role === 'realtor') {
        setIsOwner(false);
      } else if (user.role === 'owner') {
        setIsOwner(true);
      }
    }
  }, [user]);

  // Status
  const [createdPropertyId, setCreatedPropertyId] = useState<string | null>(null);

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const toggleImage = (url: string) => {
    setSelectedImages((prev) =>
      prev.includes(url) ? prev.filter((img) => img !== url) : [...prev, url]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !price || !area || !district.trim() || !contactName.trim() || !contactPhone.trim()) {
      alert('Iltimos, barcha majburiy maydonlarni to\'ldiring.');
      return;
    }

    const imagesToUse = selectedImages.length > 0 ? selectedImages : [SAMPLE_IMAGES[0]];

    const created = addProperty({
      title: title.trim(),
      description: description.trim() || `${city} shahrida joylashgan qulay va shinam mulk. Barcha sharoitlari mavjud. O'zbekiston qonunchiligiga to'liq muvofiq rasmiylashtiriladi.`,
      dealType,
      propertyType,
      price: Number(price),
      pricePeriod: dealType === 'rent' ? 'month' : undefined,
      city,
      district: district.trim(),
      address: address.trim() || `${district} tumani`,
      area: Number(area),
      rooms,
      bedrooms,
      bathrooms,
      floor: floor !== '' ? Number(floor) : undefined,
      totalFloors: totalFloors !== '' ? Number(totalFloors) : undefined,
      renovation,
      isFurnished,
      ceilingHeight,
      heatingType,
      cadastreStatus,
      kitchenArea: kitchenArea !== '' ? Number(kitchenArea) : undefined,
      amenities: selectedAmenities,
      images: imagesToUse,
      isVerified: true,
      contact: {
        name: contactName.trim(),
        phone: contactPhone.trim(),
        telegram: contactTelegram.trim().replace(/^@/, '') || 'uybozor',
        isOwner,
      },
    });

    setCreatedPropertyId(created.id);
  };

  if (createdPropertyId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          E'loningiz muvaffaqiyatli joylashtirildi!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
          Sizning taklifingiz platformamizda darhol faollashtirildi va minglab qiziquvchilar uchun ko'rinadi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href={`/properties/${createdPropertyId}`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
          >
            E'lonni ko'rish
          </Link>
          <Link
            href="/properties"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-bold text-sm transition-all"
          >
            Katalogga o'tish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100 dark:border-blue-900">
          <Sparkles className="w-3.5 h-3.5" />
          <span>0% Vositachilik • Bepul joylashtirish</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Yangi e'lon berish
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Uyingizni tez va foydali ijaraga bering yoki soting
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Bitim va Mulk turi */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            Bitim va Mulk turi
          </h3>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
              Bitim turini tanlang *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDealType('rent')}
                className={`py-3.5 px-4 rounded-2xl font-black text-sm border transition-all ${
                  dealType === 'rent'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100'
                }`}
              >
                🔑 Ijaraga berish (Rent)
              </button>
              <button
                type="button"
                onClick={() => setDealType('sale')}
                className={`py-3.5 px-4 rounded-2xl font-black text-sm border transition-all ${
                  dealType === 'sale'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100'
                }`}
              >
                🏠 Sotish (Sale)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
              Mulk toifasi *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'apartment', label: 'Kvartira' },
                { id: 'house', label: 'Hovli uy' },
                { id: 'villa', label: 'Kottej' },
                { id: 'new_building', label: 'Novostroyka' },
                { id: 'commercial', label: 'Tijorat' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPropertyType(t.id as any)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                    propertyType === t.id
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-400'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Joylashuv */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
            Joylashuv
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Shahar / Viloyat *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Toshkent">Toshkent shahri</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Namangan">Namangan</option>
                <option value="Farg'ona">Farg'ona</option>
                <option value="Andijon">Andijon</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Tuman yoki Hudud *
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: Chilonzor, Mirobod, Yunusobod"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
              Aniq manzil yoki mo'ljal
            </label>
            <input
              type="text"
              placeholder="Masalan: Amir Temur shoh ko'chasi, 24-uy"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* 3. Narx va Parametrlar (including detailed room & building specs) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
            Narx va Texnik parametrlar
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Narxi ($ USD da) *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="number"
                  required
                  placeholder={dealType === 'rent' ? 'Masalan: 600' : 'Masalan: 75000'}
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">
                {dealType === 'rent' ? 'Oylik ijara narxi' : 'To\'liq sotuv narxi'}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Maydoni (m²) *
              </label>
              <input
                type="number"
                required
                placeholder="Masalan: 85"
                value={area}
                onChange={(e) => setArea(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Xonalar soni
              </label>
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} xonali</option>
                ))}
              </select>
            </div>
          </div>

          {/* Detailed Room & Construction Technical Inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Shift balandligi (m)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Masalan: 3.2"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Oshxona maydoni (m²)
              </label>
              <input
                type="number"
                placeholder="Masalan: 14"
                value={kitchenArea}
                onChange={(e) => setKitchenArea(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Isitish tizimi
              </label>
              <select
                value={heatingType}
                onChange={(e) => setHeatingType(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="avtonom">Avtonom (Kotyol)</option>
                <option value="markaziy">Markaziy isitish</option>
                <option value="gaz">Gaz isitgich</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Ta'miri
              </label>
              <select
                value={renovation}
                onChange={(e) => setRenovation(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="evro">Yevro ta'mir</option>
                <option value="yangi">Yangi ta'mir</option>
                <option value="kosmetik">Kosmetik</option>
                <option value="qora_suvoq">Qora suvoq</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800 dark:text-gray-200">
              <input
                type="checkbox"
                checked={isFurnished}
                onChange={(e) => setIsFurnished(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Mebellari bilan jihozlangan</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <input
                type="checkbox"
                checked={cadastreStatus}
                onChange={(e) => setCadastreStatus(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Kadastr hujjati 100% tayyor</span>
            </label>
          </div>
        </div>

        {/* 4. Qulayliklar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">4</span>
            Mavjud qulayliklar
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {AVAILABLE_AMENITIES.map((item) => {
              const selected = selectedAmenities.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAmenity(item)}
                  className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between ${
                    selected
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 font-bold'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{item}</span>
                  {selected && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Sarlavha, Tavsif va Fotosuratlar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">5</span>
            Sarlavha, Tavsif va Rasmlar
          </h3>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
              E'lon sarlavhasi *
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: Yunusobod markazida hashamatli 2 xonali novostroyka kvartira"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
              Batafsil tavsif
            </label>
            <textarea
              rows={4}
              placeholder="Uy haqida, uning afzalliklari, infratuzilmasi va boshqa muhim tafsilotlarni yozing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Preset image picker */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2">
              Sifatli fotosuratlardan tanlang:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {SAMPLE_IMAGES.map((imgUrl, i) => {
                const isSelected = selectedImages.includes(imgUrl);
                return (
                  <div
                    key={i}
                    onClick={() => toggleImage(imgUrl)}
                    className={`relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      isSelected ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Sample ${i}`} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 6. Aloqa ma'lumotlari */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">6</span>
            Aloqa ma'lumotlari
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Ismingiz *
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: Sardorbek"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Telefon raqamingiz *
              </label>
              <input
                type="tel"
                required
                placeholder="+998 90 123 45 67"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Telegram username
              </label>
              <input
                type="text"
                placeholder="sardor_realty"
                value={contactTelegram}
                onChange={(e) => setContactTelegram(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800 dark:text-gray-200">
              <input
                type="radio"
                name="user_role"
                checked={isOwner}
                onChange={() => setIsOwner(true)}
                className="w-4 h-4 text-blue-600"
              />
              <span>Men mulk egasiman (0% komissiya)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800 dark:text-gray-200">
              <input
                type="radio"
                name="user_role"
                checked={!isOwner}
                onChange={() => setIsOwner(false)}
                className="w-4 h-4 text-blue-600"
              />
              <span>Rieltor / Agentlik</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>E'lonni bepul joylashtirish</span>
          </button>
        </div>
      </form>
    </div>
  );
}
