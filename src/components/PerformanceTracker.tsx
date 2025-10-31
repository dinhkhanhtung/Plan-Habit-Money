'use client'

import { useEffect } from 'react'
import { observePerformance, trackPageLoad } from '@/lib/analytics'

export function PerformanceTracker() {
  useEffect(() => {
    // Initialize performance tracking
    observePerformance()
    trackPageLoad()
  }, [])

  return null // This component doesn't render anything
}