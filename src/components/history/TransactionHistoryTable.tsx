'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  daysPurchased: number;
  createdAt: string;
  stripePaymentIntentId: string | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onSort: (sortBy: string, sortOrder: string) => void;
  onFilter: (status: string) => void;
}

type SortField = 'createdAt' | 'amount' | 'status';
type SortOrder = 'asc' | 'desc';

export default function TransactionHistoryTable({
  transactions,
  pagination,
  onPageChange,
  onSort,
  onFilter,
}: TransactionHistoryTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleSort = (field: SortField) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    onSort(field, newOrder);
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    onFilter(status);
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
      case 'canceled':
        return 'text-danger bg-danger/10';
      default:
        return 'text-text-secondary-light dark:text-text-secondary-dark bg-gray-100 dark:bg-gray-800';
    }
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
        <h3 className="text-lg font-bold">Lịch sử thanh toán</h3>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="succeeded">Thành công</option>
            <option value="pending">Đang xử lý</option>
            <option value="failed">Thất bại</option>
            <option value="canceled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark">
            <tr>
              <th
                className="px-6 py-3 font-medium cursor-pointer hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center gap-2">
                  Ngày
                  <SortIcon field="createdAt" />
                </div>
              </th>
              <th
                className="px-6 py-3 font-medium cursor-pointer hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center gap-2">
                  Số tiền
                  <SortIcon field="amount" />
                </div>
              </th>
              <th
                className="px-6 py-3 font-medium cursor-pointer hover:text-text-primary-light dark:hover:text-text-primary-dark"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Trạng thái
                  <SortIcon field="status" />
                </div>
              </th>
              <th className="px-6 py-3 font-medium">Số ngày</th>
              <th className="px-6 py-3 font-medium">ID thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-secondary-light dark:text-text-secondary-dark">
                  Không có giao dịch nào
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border-light dark:border-border-dark">
                  <td className="whitespace-nowrap px-6 py-4">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status === 'succeeded' ? 'Thành công' :
                       transaction.status === 'pending' ? 'Đang xử lý' :
                       transaction.status === 'failed' ? 'Thất bại' :
                       transaction.status === 'canceled' ? 'Đã hủy' : transaction.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {transaction.daysPurchased} ngày
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-text-secondary-light dark:text-text-secondary-dark">
                    {transaction.stripePaymentIntentId ? `${transaction.stripePaymentIntentId.slice(-8)}` : '-'}
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
            Hiển thị {((pagination.page - 1) * pagination.limit) + 1} đến {Math.min(pagination.page * pagination.limit, pagination.total)} của {pagination.total} kết quả
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
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}