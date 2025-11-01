'use client';

import { useEffect } from 'react';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({ id, message, type = 'info', duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/90',
      border: 'border-green-200 dark:border-green-700',
      text: 'text-green-800 dark:text-green-100',
      icon: 'check_circle',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/90',
      border: 'border-red-200 dark:border-red-700',
      text: 'text-red-800 dark:text-red-100',
      icon: 'error',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/90',
      border: 'border-yellow-200 dark:border-yellow-700',
      text: 'text-yellow-800 dark:text-yellow-100',
      icon: 'warning',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/90',
      border: 'border-blue-200 dark:border-blue-700',
      text: 'text-blue-800 dark:text-blue-100',
      icon: 'info',
    },
  };

  const style = styles[type];

  return (
    <div
      className={`${style.bg} border ${style.border} ${style.text} px-4 py-3 rounded-lg shadow-lg flex items-start gap-3 min-w-[300px] max-w-md animate-slide-in`}
    >
      <span className="material-symbols-outlined text-xl flex-shrink-0">
        {style.icon}
      </span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
}

