'use client';

import React, { useState } from 'react';

interface ExportOptionsProps {
  onExport: (format: string, status?: string) => void;
}

export default function ExportOptions({ onExport }: ExportOptionsProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleExport = (format: string) => {
    onExport(format, statusFilter);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark text-sm"
      >
        <option value="all">Tất cả trạng thái</option>
        <option value="succeeded">Chỉ thành công</option>
        <option value="failed">Chỉ thất bại</option>
      </select>
      <button
        onClick={() => handleExport('csv')}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5"
      >
        <span className="material-symbols-outlined text-lg">file_download</span>
        Xuất CSV
      </button>
      <button
        onClick={() => handleExport('json')}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5"
      >
        <span className="material-symbols-outlined text-lg">file_download</span>
        Xuất JSON
      </button>
    </div>
  );
}