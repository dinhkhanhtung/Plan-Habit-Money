'use client';

import React from 'react';
import Link from 'next/link';

interface QuickRenewalButtonProps {
  variant?: 'primary' | 'secondary' | 'banner';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  packageDays?: number;
}

export default function QuickRenewalButton({
  variant = 'primary',
  size = 'md',
  className = '',
  showIcon = true,
  packageDays,
}: QuickRenewalButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30',
    secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white',
    banner: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  const href = packageDays ? `/pricing?package=${packageDays}` : '/pricing';

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {showIcon && (
        <span className="material-symbols-outlined text-base mr-2">
          refresh
        </span>
      )}
      <span>
        {variant === 'banner' ? 'Renew Now' : 'Renew Subscription'}
      </span>
    </Link>
  );
}