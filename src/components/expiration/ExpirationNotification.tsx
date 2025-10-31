'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ExpirationNotificationProps {
  daysRemaining: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpirationNotification({
  daysRemaining,
  isOpen,
  onClose,
}: ExpirationNotificationProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleRenewal = (packageDays: number) => {
    // Redirect to pricing page with package selection
    router.push(`/pricing?package=${packageDays}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-4xl rounded-xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 mb-4">
              <span className="material-symbols-outlined text-4xl text-amber-500 dark:text-amber-400">
                hourglass_top
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Your Access is About to Expire!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              You have{' '}
              <span className="font-bold text-amber-500 dark:text-amber-400">
                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
              </span>
              . Choose a package below to continue using all features without interruption.
            </p>

            <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
              {/* 30 Days */}
              <div
                className="flex flex-1 cursor-pointer flex-col gap-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 transition-all hover:border-primary/50 hover:shadow-lg dark:hover:border-primary/70"
                onClick={() => handleRenewal(30)}
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">30 Days</h2>
                  <p className="flex items-baseline gap-1 text-gray-900 dark:text-white">
                    <span className="text-4xl font-black tracking-tighter">30.000đ</span>
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">/ 30 days</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="material-symbols-outlined text-base text-gray-400 dark:text-gray-500">check_circle</span>
                  <span>Basic top-up</span>
                </div>
              </div>

              {/* 90 Days (Popular) */}
              <div
                className="relative flex flex-1 cursor-pointer flex-col gap-4 rounded-xl border-2 border-primary bg-primary/5 dark:bg-primary/10 p-6 shadow-xl shadow-primary/10 transition-all"
                onClick={() => handleRenewal(90)}
              >
                <div className="absolute -top-3 right-5">
                  <p className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">Popular</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">90 Days</h2>
                  <p className="flex items-baseline gap-1 text-gray-900 dark:text-white">
                    <span className="text-4xl font-black tracking-tighter">85.000đ</span>
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">/ 90 days</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary dark:text-primary-300">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span className="font-medium">Save 5%</span>
                </div>
              </div>

              {/* 365 Days (Best Value) */}
              <div
                className="relative flex flex-1 cursor-pointer flex-col gap-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 transition-all hover:border-primary/50 hover:shadow-lg dark:hover:border-primary/70"
                onClick={() => handleRenewal(365)}
              >
                <div className="absolute -top-3 right-5">
                  <p className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">Best Value</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">365 Days</h2>
                  <p className="flex items-baseline gap-1 text-gray-900 dark:text-white">
                    <span className="text-4xl font-black tracking-tighter">300.000đ</span>
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">/ 365 days</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span className="font-medium">Save over 15%</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex w-full max-w-md flex-col items-center gap-2">
              <button
                className="flex h-12 w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
                onClick={() => handleRenewal(90)}
              >
                <span>Continue with 85.000đ</span>
              </button>
              <button
                className="flex h-10 w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent px-4 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                onClick={onClose}
              >
                <span>Maybe Later</span>
              </button>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-xs text-gray-400 dark:text-gray-500">SECURE PAYMENTS</p>
              <div className="flex items-center space-x-4">
                {/* Payment method icons - placeholder */}
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <span className="material-symbols-outlined text-lg">account_balance</span>
                  <span className="text-sm font-medium">Bank</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}