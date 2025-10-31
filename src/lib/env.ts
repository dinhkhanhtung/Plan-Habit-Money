import { z } from 'zod';

// Environment variable validation schema
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  // NextAuth
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),

  // Stripe
  STRIPE_PUBLISHABLE_KEY: z.string().regex(/^pk_(test|live)_/, 'Invalid Stripe publishable key format'),
  STRIPE_SECRET_KEY: z.string().regex(/^sk_(test|live)_/, 'Invalid Stripe secret key format'),
  STRIPE_WEBHOOK_SECRET: z.string().regex(/^whsec_/, 'Invalid Stripe webhook secret format'),

  // Security
  NODE_ENV: z.enum(['development', 'production', 'test']),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).optional().default('info'),

  // CORS
  ALLOWED_ORIGIN: z.string().url().optional(),
});

// Parse and validate environment variables
let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  console.error('Environment variable validation failed:', error);
  throw new Error('Invalid environment configuration');
}

// Export validated environment variables
export const {
  DATABASE_URL,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  NODE_ENV,
  LOG_LEVEL,
  ALLOWED_ORIGIN,
} = env;

// Security check: Ensure we never log sensitive information
const sensitiveKeys = ['STRIPE_SECRET_KEY', 'DATABASE_URL', 'NEXTAUTH_SECRET'];

export function safeLogEnv() {
  const safeEnv = { ...process.env };
  sensitiveKeys.forEach(key => {
    if (safeEnv[key]) {
      safeEnv[key] = '[REDACTED]';
    }
  });
  return safeEnv;
}

// Validate environment on startup
export function validateEnvironment() {
  console.log('Environment validation successful');

  if (NODE_ENV === 'production') {
    // Additional production checks
    if (NEXTAUTH_URL.includes('localhost')) {
      console.warn('Warning: NEXTAUTH_URL points to localhost in production');
    }

    if (!ALLOWED_ORIGIN) {
      console.warn('Warning: ALLOWED_ORIGIN not set in production');
    }
  }
}