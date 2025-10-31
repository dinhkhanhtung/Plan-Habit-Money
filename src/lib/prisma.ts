import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// Security: Middleware to sanitize inputs and prevent SQL injection
prisma.$use(async (params: any, next: any) => {
  // Log all database operations for security monitoring
  if (process.env.NODE_ENV === 'production') {
    console.log(`DB Operation: ${params.model}.${params.action}`, {
      userId: params.args?.where?.userId || 'unknown',
      timestamp: new Date().toISOString(),
    });
  }

  // Validate and sanitize inputs
  if (params.args?.where) {
    for (const [key, value] of Object.entries(params.args.where)) {
      if (typeof value === 'string') {
        // Basic sanitization - remove potential SQL injection patterns
        const sanitized = value.replace(/['";\\]/g, '');
        params.args.where[key] = sanitized;
      }
    }
  }

  if (params.args?.data) {
    for (const [key, value] of Object.entries(params.args.data)) {
      if (typeof value === 'string') {
        // Basic sanitization
        const sanitized = value.replace(/['";\\]/g, '');
        params.args.data[key] = sanitized;
      }
    }
  }

  return next(params);
})

// In production, don't store on globalThis to avoid connection leaks
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma