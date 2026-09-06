'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Percent, Calendar, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useProperties } from '@/context/PropertyContext';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export default function MortgageCalculator({ initialPrice = 80000 }: MortgageCalculatorProps) {
  const { formatPrice } = useProperties();
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(17.5); // Average Uzbekistan bank mortgage rate

  const calculation = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;

    if (loanAmount <= 0) {
      return {
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
        loanAmount: 0,
        downPayment,
      };
    }

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;

    // Annuity formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      loanAmount: Math.round(loanAmount),
      downPayment: Math.round(downPayment),
    };
  }, [propertyPrice, downPaymentPercent, loanTermYears, interestRate]);

  const principalPercent = calculation.totalPayment > 0 
    ? Math.round((calculation.loanAmount / calculation.totalPayment) * 100) 
    : 50;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-xl transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ipoteka Kalkulyatori</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Oylik kredit to'lovlarini aniq hisoblang</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Uy narxi */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-700 dark:text-gray-300">Uy narxi:</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">${propertyPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Boshlang'ich to'lov */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-700 dark:text-gray-300">Boshlang'ich to'lov ({downPaymentPercent}%):</span>
              <span className="text-gray-900 dark:text-white font-bold">${calculation.downPayment.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10}
              max={70}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-gray-400 dark:text-gray-500 mt-1">
              <span>10%</span>
              <span>30%</span>
              <span>50%</span>
              <span>70%</span>
            </div>
          </div>

          {/* Kredit muddati */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
              Kredit muddati:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTermYears(term)}
                  className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                    loanTermYears === term
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {term} yil
                </button>
              ))}
            </div>
          </div>

          {/* Yillik foiz stavkasi */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-700 dark:text-gray-300">Yillik bank foiz stavkasi:</span>
              <span className="text-gray-900 dark:text-white font-bold">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={28}
              step={0.5}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Result Card */}
        <div className="lg:col-span-5 bg-linear-to-br from-blue-600 via-indigo-700 to-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg">
          <div>
            <span className="text-xs uppercase tracking-wider text-blue-200 font-bold">
              Taxminiy oylik to'lov
            </span>
            <div className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              {formatPrice(calculation.monthlyPayment, 'rent', 'month')}
            </div>
            <p className="text-[11px] text-blue-200 mt-1">
              Bankning standart annuitet to'lov jadvali asosida
            </p>

            <div className="mt-6 pt-6 border-t border-white/15 space-y-3 text-xs">
              <div className="flex justify-between text-blue-100">
                <span>Kredit summasi (Qarz):</span>
                <span className="font-bold text-white">${calculation.loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>Boshlang'ich to'lov:</span>
                <span className="font-bold text-white">${calculation.downPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>Bank foizi (Ustama):</span>
                <span className="font-bold text-white">${calculation.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-blue-100 font-bold text-sm pt-2 border-t border-white/10">
                <span>Jami to'lov:</span>
                <span className="text-white">${calculation.totalPayment.toLocaleString()}</span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="mt-5">
              <div className="h-2 w-full bg-indigo-900/60 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${principalPercent}%` }}
                  className="bg-emerald-400 h-full"
                  title="Asosiy qarz"
                />
                <div
                  style={{ width: `${100 - principalPercent}%` }}
                  className="bg-amber-400 h-full"
                  title="Bank foizi"
                />
              </div>
              <div className="flex justify-between text-[10px] text-blue-200 mt-1 font-semibold">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  Asosiy qarz ({principalPercent}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Foiz ({100 - principalPercent}%)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-blue-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>O'zbekistonning barcha banklari ipoteka shartlariga mos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
