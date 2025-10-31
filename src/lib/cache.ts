import { NextRequest, NextResponse } from 'next/server'

// Cache settings for different resource types
export const CACHE_DURATIONS = {
  STATIC: 60 * 60 * 24 * 30, // 30 days for static assets
  IMAGES: 60 * 60 * 24 * 7, // 7 days for images
  API: 60 * 5, // 5 minutes for API responses
  HTML: 60 * 30, // 30 minutes for HTML pages
} as const

// Set cache headers for static assets
export function setStaticCacheHeaders(response: NextResponse) {
  response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATIONS.STATIC}, immutable`)
  return response
}

// Set cache headers for images
export function setImageCacheHeaders(response: NextResponse) {
  response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATIONS.IMAGES}`)
  return response
}

// Set cache headers for API responses
export function setApiCacheHeaders(response: NextResponse) {
  response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATIONS.API}`)
  return response
}

// Set cache headers for HTML pages
export function setPageCacheHeaders(response: NextResponse) {
  response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATIONS.HTML}`)
  return response
}

// Add security headers
export function addSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  return response
}

// Middleware for cache optimization
export function cacheOptimizationMiddleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers to all responses
  addSecurityHeaders(response)

  // Cache static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    return setStaticCacheHeaders(response)
  }

  // Cache images
  if (request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)) {
    return setImageCacheHeaders(response)
  }

  // Don't cache API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    return response
  }

  return response
}