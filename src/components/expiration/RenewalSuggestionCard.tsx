'use client';

import React from 'react';
import Link from 'next/link';

interface RenewalSuggestionCardProps {
  days: number;
  price: string;
  originalPrice?: string;
  savings?: string;
  popular?: boolean;
  bestValue?: boolean;
  onSelect: (days: number) => void;
}

export default function RenewalSuggestionCard({
  days,
  price,
  originalPrice,
  savings,
  popular = false,
  bestValue = false,
  onSelect,
}: RenewalSuggestionCardProps) {
  return (
    <div
      className={`relative flex flex-1 cursor-pointer flex-col gap-4 rounded-xl border-2 p-6 transition-all hover:border-primary/50 hover:shadow-lg dark:hover:border-primary/70 ${
        popular
          ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-xl shadow-primary/10'
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
      }`}
      onClick={() => onSelect(days)}
    >
      {popular && (
        <div className="absolute -top-3 right-5">
          <p className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">Popular</p>
        </div>
      )}
      {bestValue && (
        <div className="absolute -top-3 right-5">
          <p className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">Best Value</p>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">{days} Days</h2>
        <p className="flex items-baseline gap-1 text-gray-900 dark:text-white">
          <span className="text-4xl font-black tracking-tighter">{price}</span>
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">/ {days} days</span>
        </p>
      </div>
      {savings && (
        <div className="flex items-center gap-2 text-sm text-primary dark:text-primary-300">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span className="font-medium">{savings}</span>
        </div>
      )}
      {!savings && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="material-symbols-outlined text-base text-gray-400 dark:text-gray-500">check_circle</span>
          <span>Basic top-up</span>
        </div>
      )}
    </div>
  );
}