import { NextRequest, NextResponse } from 'next/server';
import rateLimit from 'express-rate-limit';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 API requests per windowMs
  message: 'Too many API requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

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

// Rate limiting middleware
export async function rateLimitMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  // Apply different limits based on path
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Check API rate limit
    const limitResult = await new Promise((resolve) => {
      apiLimiter(request as any, {} as any, resolve);
    });

    if (limitResult && typeof limitResult === 'object' && 'statusCode' in limitResult) {
      return NextResponse.json(
        { error: 'Too many API requests' },
        { status: 429 }
      );
    }
  } else {
    // Check general rate limit
    const limitResult = await new Promise((resolve) => {
      limiter(request as any, {} as any, resolve);
    });

    if (limitResult && typeof limitResult === 'object' && 'statusCode' in limitResult) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
  }

  return null;
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

  // Apply rate limiting
  const rateLimitResponse = await rateLimitMiddleware(request);
  if (rateLimitResponse) return rateLimitResponse;

  // Apply security headers
  return securityHeadersMiddleware(request);
}