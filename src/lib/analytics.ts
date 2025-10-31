// Performance monitoring utilities
export interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  type: 'measure' | 'mark'
}

// Performance observer for Web Vitals
export function observePerformance() {
  if (typeof window === 'undefined') return

  // Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        logPerformanceMetric({
          name: entry.name,
          value: entry.duration,
          timestamp: entry.startTime,
          type: 'measure',
        })
      }
    }
  })

  try {
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] })
  } catch (e) {
    console.warn('Performance observer not supported')
  }

  // Web Vitals
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(logWebVital)
    onINP(logWebVital)
    onFCP(logWebVital)
    onLCP(logWebVital)
    onTTFB(logWebVital)
  }).catch(() => {
    // web-vitals not available
  })
}

function logWebVital(metric: any) {
  logPerformanceMetric({
    name: metric.name,
    value: metric.value,
    timestamp: Date.now(),
    type: 'measure',
  })
}

function logPerformanceMetric(metric: PerformanceMetric) {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}: ${metric.value}ms`)
  }

  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Send to your analytics service (Google Analytics, Sentry, etc.)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        event_category: 'Web Vitals',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_map: { metric_value: metric.value }
      })
    }
  }
}

// Page load timing
export function trackPageLoad() {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    setTimeout(() => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

        logPerformanceMetric({
          name: 'page_load_time',
          value: perfData.loadEventEnd - perfData.fetchStart,
          timestamp: Date.now(),
          type: 'measure',
        })

        logPerformanceMetric({
          name: 'dom_content_loaded',
          value: perfData.domContentLoadedEventEnd - perfData.fetchStart,
          timestamp: Date.now(),
          type: 'measure',
        })
      }
    }, 0)
  })
}

// User interaction tracking
export function trackUserInteraction(eventName: string, data?: any) {
  if (typeof window === 'undefined') return

  if (process.env.NODE_ENV === 'development') {
    console.log(`[User Interaction] ${eventName}`, data)
  }

  if (process.env.NODE_ENV === 'production' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'user_interaction',
      ...data,
    })
  }
}

// Error tracking
export function trackError(error: Error, context?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', error, context)
  }

  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service (Sentry, etc.)
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        ...context,
      })
    }
  }
}

// Global declarations for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}