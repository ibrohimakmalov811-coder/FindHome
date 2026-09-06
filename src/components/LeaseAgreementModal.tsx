'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Printer, FileText } from 'lucide-react';

interface LeaseAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyAddress?: string;
  monthlyRent?: string;
}

export default function LeaseAgreementModal({
  isOpen,
  onClose,
  propertyTitle = "Turar joy xonadoni",
  propertyAddress = "Toshkent shahri, Mirobod tumani",
  monthlyRent = "$500 / oyiga",
}: LeaseAgreementModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sampleContractText = `TURAR JOYNING IJARA SHARTNOMASI № ___

Toshkent shahri                                                   "___" ________ 2025-yil

Mulkdor (Ijaraga beruvchi): ____________________________________, pasport seriya: ____, raqami: ________, 
bir tomondan, va
Ijarachi: ____________________________________, pasport seriya: ____, raqami: ________, 
ikkinchi tomondan, O'zbekiston Respublikasi Fuqarolik Kodeksining 34-bobi va 535-557-moddalariga asosan quyidagi mazmunda ushbu shartnomani tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Ijaraga beruvchi o'ziga xususiy mulk huquqi asosida tegishli bo'lgan quyidagi manzil bo'yicha joylashgan:
${propertyAddress} manzilidagi turar joyni (${propertyTitle}) Ijarachiga vaqtincha egalik qilish va yashash uchun topshiradi.
1.2. Turar joyning umumiy maydoni: _____ m², xonalar soni: ____ ta.
1.3. Kadastr raqami: ____________________________.

2. IJARA HAQI VA HISOB-KITOB TARTIBI
2.1. Oylik ijara haqi: ${monthlyRent} miqdorida belgilanadi.
2.2. To'lov har oyning ___ sanasigacha naqd yoki bank plastik kartasi orqali to'lanadi.
2.3. Garov (depozit) summasi: __________ so'm bo'lib, shartnoma yakunlanganda mol-mulkka zarar yetkazilmagan taqdirda to'liq qaytariladi.
2.4. Ushbu shartnoma soliq organlarining "ijara.soliq.uz" portalida rasmiy hisobga qo'yiladi.

3. TARAFLARNING MAJBURIYATLARI
3.1. Ijaraga beruvchi:
- Turar joyni belgilangan muddatda soz holatda, yashash uchun yaroqli qilib topshirish;
- Kommunal tarmoqlar (elektr, gaz, sovuq va issiq suv) uzluksiz ishlashini ta'minlash;
3.2. Ijarachi:
- Turar joydan faqat yashash maqsadida foydalanish, uni uchinchi shaxslarga qayta ijaraga (subarenda) bermaslik;
- Yong'in xavfsizligi va sanitariya qoidalariga, qo'shnilarning tinchligiga rioya etish;
- Haqiqiy foydalanilgan kommunal to'lovlarni hisoblagich ko'rsatkichlari bo'yicha to'lash.

4. NIZOLARNI HAL ETISH
4.1. Ushbu shartnomadan kelib chiqadigan barcha nizolar muzokaralar yo'li bilan, kelishuvga erishilmaganda esa O'zbekiston Respublikasining Fuqarolik ishlari bo'yicha tegishli sudida qonunchilikda belgilangan tartibda hal etiladi.

TARAFLARNING MANZILLARI VA IMZOLARI:

Ijaraga beruvchi:                                   Ijarachi:
F.I.SH: _______________________                     F.I.SH: _______________________
Imzo: _________________________                     Imzo: _________________________`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleContractText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-gray-100 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Namunaviy Ijara Shartnomasi
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                O'zbekiston Respublikasi qonunchiligiga to'liq moslangan rasmiy shablon
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Matn nusxalandi!' : 'Shablonni nusxalash'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 text-xs font-bold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish (Print)</span>
            </button>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
            ✓ ijara.soliq.uz talablariga mos
          </span>
        </div>

        {/* Scrollable Text Body */}
        <div className="flex-1 overflow-y-auto my-4 p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap leading-relaxed">
          {sampleContractText}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            * Eslatma: Ushbu shartnoma namunaviy bo'lib, taraflar o'zaro kelishgan qo'shimcha shartlarni kiritishlari mumkin.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}
