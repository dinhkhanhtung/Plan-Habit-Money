import { NextRequest, NextResponse } from 'next/server';


// Input sanitization function
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// Security headers middleware
export function securityHeadersMiddleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  // Set security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;");

  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN || '*' : '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  return response;
}


// Request size validation
export function validateRequestSize(request: NextRequest): NextResponse | null {
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 1024 * 1024) { // 1MB limit
    return NextResponse.json(
      { error: 'Request too large' },
      { status: 413 }
    );
  }
  return null;
}

// Combined security middleware
export async function securityMiddleware(request: NextRequest): Promise<NextResponse> {
  // Check request size
  const sizeValidation = validateRequestSize(request);
  if (sizeValidation) return sizeValidation;

  // Apply security headers
  return securityHeadersMiddleware(request);
}