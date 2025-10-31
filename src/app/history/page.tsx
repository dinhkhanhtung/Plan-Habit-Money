'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '@/components/ProtectedRoute';
import UsageSummaryCards from '@/components/history/UsageSummaryCards';
import TransactionHistoryTable from '@/components/history/TransactionHistoryTable';
import ExportOptions from '@/components/history/ExportOptions';

interface UsageStats {
  daysRemaining: number;
  totalUsed: number;
  expirationDate: string | null;
  lastUsedDate: string | null;
}

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

interface UsageLog {
  date: string;
  daysUsed: number;
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'usage' | 'payments'>('usage');
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Query parameters for payments
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (activeTab === 'usage') {
      fetchUsageStats();
    } else {
      fetchPayments();
    }
  }, [status, activeTab, page, statusFilter, sortBy, sortOrder]);

  const fetchUsageStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/history/usage');
      if (!response.ok) throw new Error('Failed to fetch usage stats');
      const data = await response.json();
      setUsageStats(data);
    } catch (err) {
      setError('Không thể tải thống kê sử dụng');
      console.error('Usage stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        status: statusFilter,
        sortBy,
        sortOrder,
      });
      const response = await fetch(`/api/history/payments?${params}`);
      if (!response.ok) throw new Error('Failed to fetch payments');
      const data = await response.json();
      setTransactions(data.transactions);
      setPagination(data.pagination);
    } catch (err) {
      setError('Không thể tải lịch sử thanh toán');
      console.error('Payments error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: string, status?: string) => {
    try {
      const params = new URLSearchParams({
        format,
        ...(status && status !== 'all' && { status }),
      });
      const response = await fetch(`/api/history/export?${params}`);
      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payment-history.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Export error:', err);
      alert('Không thể xuất dữ liệu');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSort = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleFilter = (status: string) => {
    setStatusFilter(status);
    setPage(1); // Reset to first page when filtering
  };

  if (status === 'loading' || loading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Đang tải...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        {/* Header similar to design */}
        <header className="sticky top-0 z-10 flex items-center justify-center border-b border-border-light dark:border-border-dark bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm">
          <div className="flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <div className="size-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fill-rule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold">Planner App</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/pricing')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary/90"
              >
                <span className="material-symbols-outlined text-lg">add_card</span>
                Nạp thêm ngày
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex w-full flex-1 justify-center py-8 sm:py-12">
          <div className="flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
            {/* Page Heading */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">
                Lịch sử sử dụng & Thanh toán
              </h1>
            </div>

            {/* Tabs */}
            <div className="border-b border-border-light dark:border-border-dark">
              <div className="flex gap-8 px-4">
                <button
                  className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 ${
                    activeTab === 'usage'
                      ? 'border-b-primary'
                      : 'border-b-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
                  }`}
                  onClick={() => setActiveTab('usage')}
                >
                  <p className="text-sm font-bold">Lịch sử sử dụng</p>
                </button>
                <button
                  className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 ${
                    activeTab === 'payments'
                      ? 'border-b-primary'
                      : 'border-b-transparent text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
                  }`}
                  onClick={() => setActiveTab('payments')}
                >
                  <p className="text-sm font-bold">Lịch sử thanh toán</p>
                </button>
              </div>
            </div>

            {/* Content */}
            {activeTab === 'usage' && usageStats && (
              <div className="space-y-6">
                <UsageSummaryCards stats={usageStats} />
                <div className="flex flex-col gap-6 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-light dark:border-border-dark px-6 py-4">
                    <h3 className="text-lg font-bold">Hoạt động gần đây</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead className="border-b border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark">
                        <tr>
                          <th className="px-6 py-3 font-medium">Ngày</th>
                          <th className="px-6 py-3 font-medium">Hoạt động</th>
                          <th className="px-6 py-3 font-medium text-right">Số ngày trừ</th>
                          <th className="px-6 py-3 font-medium text-right">Số ngày còn lại</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usageStats.totalUsed === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-text-secondary-light dark:text-text-secondary-dark">
                              Chưa có hoạt động sử dụng nào
                            </td>
                          </tr>
                        ) : (
                          // This would need actual usage logs - for now showing summary
                          <tr className="border-b border-border-light dark:border-border-dark">
                            <td className="whitespace-nowrap px-6 py-4">
                              {usageStats.lastUsedDate ? new Date(usageStats.lastUsedDate).toLocaleDateString('vi-VN') : 'N/A'}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">Sử dụng ngày</td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">-1</td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">{usageStats.daysRemaining}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-lg font-bold">Lịch sử thanh toán</h3>
                  <ExportOptions onExport={handleExport} />
                </div>
                <TransactionHistoryTable
                  transactions={transactions}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-danger/10 border border-danger/20 p-4">
                <p className="text-danger">{error}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}