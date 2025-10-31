'use client';

import { SessionProvider } from 'next-auth/react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PerformanceTracker } from '@/components/PerformanceTracker'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <PerformanceTracker />
      <SessionProvider>
        {children}
      </SessionProvider>
    </ErrorBoundary>
  )
}