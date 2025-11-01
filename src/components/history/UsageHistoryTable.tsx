'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface UsageRecord {
  id: string;
  date: string;
  activity: string;
  daysDeducted: number;
  daysRemaining: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface UsageHistoryTableProps {
  records: UsageRecord[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onSort: (sortBy: string, sortOrder: string) => void;
}

type SortField = 'date' | 'activity' | 'daysDeducted' | 'daysRemaining';
type SortOrder = 'asc' | 'desc';

export default function UsageHistoryTable({
  records,
  pagination,
  onPageChange,
  onSort,
}: UsageHistoryTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    onSort(field, newOrder);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-light dark:border-border-dark px-6 py-4">
        <h3 className="text-lg font-bold">Hoạt động gần đây</h3>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            <span>Last 30 days</span>
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
          <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5">
            <span className="material-symbols-outlined text-lg">file_download</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark">
            <tr>
              <th
                className="px-6 py-3 font-medium cursor-pointer hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Ngày
                  <SortIcon field="date" />
                </div>
              </th>
              <th
                className="px-6 py-3 font-medium cursor-pointer hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={() => handleSort('activity')}
              >
                <div className="flex items-center gap-2">
                  Hoạt động
                  <SortIcon field="activity" />
                </div>
              </th>
              <th
                className="px-6 py-3 font-medium text-right cursor-pointer hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={() => handleSort('daysDeducted')}
              >
                <div className="flex items-center justify-end gap-2">
                  Số ngày trừ
                  <SortIcon field="daysDeducted" />
                </div>
              </th>
              <th
                className="px-6 py-3 font-medium text-right cursor-pointer hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={() => handleSort('daysRemaining')}
              >
                <div className="flex items-center justify-end gap-2">
                  Số ngày còn lại
                  <SortIcon field="daysRemaining" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-text-secondary-light dark:text-text-secondary-dark">
                  Không có hoạt động nào
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-b border-border-light dark:border-border-dark">
                  <td className="whitespace-nowrap px-6 py-4">
                    {formatDate(record.date)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {record.activity}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    {record.daysDeducted}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    {record.daysRemaining}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border-light dark:border-border-dark px-6 py-4">
          <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </span>
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={!pagination.hasPrev}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={!pagination.hasNext}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}