'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  BookOpen, 
  Scale, 
  Info,
  Phone,
  ChevronDown,
  Building2 
} from 'lucide-react';
import { UZBEKISTAN_REAL_ESTATE_LAWS, SAFETY_TIPS } from '@/data/uzbekistanLaws';
import LeaseAgreementModal from '@/components/LeaseAgreementModal';

export default function SecurityPage() {
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('civil-code-sale');

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl sm:rounded-4xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>O'zbekiston Respublikasi Qonunchiligi va Xavfsizlik Standartlari</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Xavfsizlik va Huquqiy Kafolatlar
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            UyBozor platformasi har bir foydalanuvchiga halol, shaffof va O'zbekiston Respublikasining amaldagi qonunlariga to'liq mos keluvchi ko'chmas mulk xizmatlarini taqdim etadi.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setIsContractModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs sm:text-sm shadow-xl transition-all active:scale-98"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Namunaviy Ijara Shartnomasini Ko'rish</span>
            </button>
            <a
              href="https://ijara.soliq.uz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600/30 hover:bg-blue-600/50 text-white border border-blue-400/40 font-bold text-xs sm:text-sm transition-all"
            >
              <span>ijara.soliq.uz tizimi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Safety Rules Grid */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Tavsiyalar
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Ko'chmas mulk oldi-sotdisi va ijarasida 4 ta oltin qoida
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAFETY_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {tip.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Laws & Regulations Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-gray-100 dark:border-slate-800 shadow-sm space-y-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Normativ-huquqiy hujjatlar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            O'zbekiston Respublikasining Ko'chmas Mulk Qonunchiligi
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Fuqarolik Kodeksi, Uy-joy Kodeksi va Soliq normalarining asosiy moddalari sharhi
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100 dark:border-slate-800">
          {UZBEKISTAN_REAL_ESTATE_LAWS.map((law) => (
            <button
              key={law.id}
              onClick={() => setActiveTab(law.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === law.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {law.code}
            </button>
          ))}
        </div>

        {/* Active Law Details */}
        {(() => {
          const current = UZBEKISTAN_REAL_ESTATE_LAWS.find((l) => l.id === activeTab) || UZBEKISTAN_REAL_ESTATE_LAWS[0];
          return (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-gray-200/70 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{current.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">{current.description}</p>
              </div>

              <div className="space-y-4">
                {current.articles.map((art, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                        {art.number}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                        O'zbekiston Qonunchiligi
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {art.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* Verification Process Workflow */}
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white rounded-3xl sm:rounded-4xl p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
            Shaffoflik
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            UyBozor-da e'lonlar qanday tekshiriladi?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black">
              1
            </div>
            <h4 className="font-bold text-base">Hujjatlar autentifikatsiyasi</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Mulkdorning pasport ma'lumotlari, kadastr hujjati va egalik huquqi tasdiqlovchi order/shartnomalar solishtiriladi.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-black">
              2
            </div>
            <h4 className="font-bold text-base">Haqiqiy fotosuratlar nazorati</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Internetdan ko'chirilgan feyk rasmlar tizim moderatsiyasidan o'tmaydi. Har bir xonadonning haqiqiy ko'rinishi ta'minlanadi.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black">
              3
            </div>
            <h4 className="font-bold text-base">Doimiy moderatsiya va shikoyatlar</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Foydalanuvchilar shikoyat qilgan yoki narxi asossiz o'zgartirilgan e'lonlar darhol tekshirilib, faoliyati to'xtatiladi.
            </p>
          </div>
        </div>
      </section>

      {/* Contract Template Modal */}
      <LeaseAgreementModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
      />
    </div>
  );
}
