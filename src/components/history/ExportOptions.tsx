'use client';

import React, { useState } from 'react';

interface ExportOptionsProps {
  onExport: (format: string, status?: string) => void;
}

export default function ExportOptions({ onExport }: ExportOptionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5">
        <span className="material-symbols-outlined text-lg">calendar_today</span>
        <span>Last 30 days</span>
        <span className="material-symbols-outlined text-lg">expand_more</span>
      </button>
      <button 
        onClick={() => onExport('csv')}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5"
      >
        <span className="material-symbols-outlined text-lg">file_download</span>
        <span>Export</span>
      </button>
    </div>
  );
}