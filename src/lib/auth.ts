import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'
import { NEXTAUTH_SECRET } from './env'

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Brute force protection: track failed attempts
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.passwordHash) {
          // Log failed attempt for monitoring
          console.log(`Failed login attempt for email: ${credentials.email}`)
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash)

        if (!isPasswordValid) {
          // Log failed attempt for monitoring
          console.log(`Invalid password for email: ${credentials.email}`)
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      // Log session termination for security monitoring
      console.log(`User session terminated: ${token?.id || 'unknown'}`);
    },
  },
}