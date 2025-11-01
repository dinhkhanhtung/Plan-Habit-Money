'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout'
import { CardSkeleton } from '@/components/SkeletonLoader'
import ExpirationNotification from '@/components/expiration/ExpirationNotification'
import CountdownTimer from '@/components/expiration/CountdownTimer'
import QuickRenewalButton from '@/components/expiration/QuickRenewalButton'
import { useSubscriptionStatus } from '@/hooks/useSubscriptionStatus'
import ProtectedRoute from '@/components/ProtectedRoute'

// Lazy load heavy components with proper skeletons
const WeeklyPlannerWidget = dynamic(() => import('@/components/WeeklyPlannerWidget'), {
  loading: () => <CardSkeleton />
})
const HabitTrackerWidget = dynamic(() => import('@/components/HabitTrackerWidget'), {
  loading: () => <CardSkeleton />
})
const SmartMoneyWidget = dynamic(() => import('@/components/SmartMoneyWidget'), {
  loading: () => <CardSkeleton />
})

export default function DashboardPage() {
  const { showNotification, daysRemaining, isExpiringSoon } = useSubscriptionStatus();
  const [showModal, setShowModal] = useState(false);

  return (
    <ProtectedRoute>
      <AppLayout title="Dashboard Tổng quan">
        <div className="p-10">
            {/* Expiration Banner */}
            {isExpiringSoon && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">warning</span>
                  <div>
                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                      Your subscription expires soon
                    </p>
                    <CountdownTimer daysRemaining={daysRemaining} className="mt-1" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 font-medium text-sm underline"
                  >
                    View options
                  </button>
                  <QuickRenewalButton variant="banner" size="sm" />
                </div>
              </div>
            </div>
          )}

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-4 mb-8">
              <div className="flex min-w-72 flex-col gap-2">
                <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Chào buổi sáng, Minh Anh!</p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">"The secret of getting ahead is getting started." – Mark Twain</p>
              </div>
            </div>

            {/* Widget Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Suspense fallback={<CardSkeleton />}>
                <WeeklyPlannerWidget />
              </Suspense>
              <Suspense fallback={<CardSkeleton />}>
                <HabitTrackerWidget />
              </Suspense>
              <Suspense fallback={<CardSkeleton />}>
                <SmartMoneyWidget />
              </Suspense>
            </div>
          </div>

          {/* Expiration Notification Modal */}
          <ExpirationNotification
            daysRemaining={daysRemaining}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </AppLayout>
    </ProtectedRoute>
  )
}
