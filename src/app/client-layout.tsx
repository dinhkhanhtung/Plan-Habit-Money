'use client';

import { SessionProvider } from 'next-auth/react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PerformanceTracker } from '@/components/PerformanceTracker'
import { ToastProvider } from '@/components/ToastContainer'
import Analytics from '@/components/Analytics'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <PerformanceTracker />
      <Analytics />
      <SessionProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </SessionProvider>
    </ErrorBoundary>
  )
}