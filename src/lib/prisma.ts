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

// Note: Prisma middleware ($use) is deprecated in newer Prisma versions
// Removed middleware to fix build issues

// In production, don't store on globalThis to avoid connection leaks
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma