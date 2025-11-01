'use client';

import React from 'react';

interface UsageStats {
  daysRemaining: number;
  totalUsed: number;
  expirationDate: string | null;
  lastUsedDate: string | null;
}

interface UsageSummaryCardsProps {
  stats: UsageStats;
}

export default function UsageSummaryCards({ stats }: UsageSummaryCardsProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const isExpiringSoon = stats.expirationDate && new Date(stats.expirationDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 border border-border-light dark:border-border-dark">
        <p className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark">
          Số ngày còn lại
        </p>
        <p className="text-3xl font-bold tracking-tight text-primary">
          {stats.daysRemaining}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 border border-border-light dark:border-border-dark">
        <p className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark">
          Tổng số ngày đã sử dụng
        </p>
        <p className="text-3xl font-bold tracking-tight">
          {stats.totalUsed}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-card-light dark:bg-card-dark p-6 border border-border-light dark:border-border-dark">
        <p className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark">
          Ngày hết hạn
        </p>
        <p className={`text-3xl font-bold tracking-tight ${isExpiringSoon ? 'text-danger' : ''}`}>
          {formatDate(stats.expirationDate)}
        </p>
        {isExpiringSoon && (
          <p className="text-sm text-danger">
            Hết hạn trong 7 ngày tới
          </p>
        )}
      </div>
    </div>
  );
}