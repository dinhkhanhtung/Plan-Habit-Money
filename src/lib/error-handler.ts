import { NextRequest, NextResponse } from 'next/server';
import { logger } from './logger';

// Error types for better categorization
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

// Safe error response function
export function createSafeErrorResponse(error: unknown, request: NextRequest): NextResponse {
  // Log the full error for debugging
  logger.error('Application error:', {
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
    url: request.url,
    method: request.method,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
  });

  // Determine error type and create safe response
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.isOperational ? error.message : 'Internal server error';
  } else if (error instanceof Error) {
    // For unexpected errors, don't expose details in production
    if (process.env.NODE_ENV === 'development') {
      message = error.message;
    }
  }

  // Never expose sensitive information
  const safeResponse = {
    error: {
      message,
      timestamp: new Date().toISOString(),
      path: new URL(request.url).pathname,
    },
  };

  // Add request ID for tracking if available
  const requestId = request.headers.get('x-request-id');
  if (requestId) {
    (safeResponse.error as any).requestId = requestId;
  }

  return NextResponse.json(safeResponse, { status: statusCode });
}

// Global error handler for API routes
export function withErrorHandler(handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      return createSafeErrorResponse(error, request);
    }
  };
}

// Input validation wrapper
export function validateInput<T>(schema: { safeParse: (data: any) => { success: boolean; error?: any; data?: T } }, data: any): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorMessage = result.error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ');
    throw new ValidationError(`Validation failed: ${errorMessage}`);
  }
  return result.data!;
}