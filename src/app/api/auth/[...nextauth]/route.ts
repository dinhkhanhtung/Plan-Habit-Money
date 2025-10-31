import NextAuth from 'next-auth'
import { authOptions, loginLimiter } from '@/lib/auth'

const handler = async (req: any, res: any) => {
  // Apply rate limiting to login attempts
  if (req.method === 'POST' && req.url?.includes('/signin')) {
    await new Promise((resolve) => loginLimiter(req, res, resolve))
  }

  return NextAuth(authOptions)(req, res)
}

export { handler as GET, handler as POST }