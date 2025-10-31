import { NextRequest, NextResponse } from 'next/server'
import { cacheOptimizationMiddleware } from '@/lib/cache'
import { securityMiddleware } from '@/lib/middleware/security'

export async function middleware(request: NextRequest) {
  // Apply security middleware first
  const securityResponse = await securityMiddleware(request);
  if (securityResponse instanceof NextResponse) {
    return securityResponse;
  }

  // Apply cache optimization middleware
  return cacheOptimizationMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}