import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary ${className}`}>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingButtonProps {
  loading: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function LoadingButton({ loading, children, className = '', disabled, onClick }: LoadingButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center ${className}`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  )
}

export function LoadingOverlay({ message = 'Đang tải...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center gap-4 shadow-xl">
        <LoadingSpinner size="lg" />
        <p className="text-gray-900 dark:text-white font-medium">{message}</p>
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
      </div>
    </div>
  );
}