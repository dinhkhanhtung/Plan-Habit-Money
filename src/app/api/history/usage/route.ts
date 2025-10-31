import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        usageDaysRemaining: true,
        subscriptionExpiresAt: true,
        usageLogs: {
          select: {
            date: true,
            daysUsed: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const totalUsed = user.usageLogs.reduce((sum: number, log: { daysUsed: number }) => sum + log.daysUsed, 0);
    const lastUsedDate = user.usageLogs[0]?.date || null;

    return NextResponse.json({
      daysRemaining: user.usageDaysRemaining || 0,
      totalUsed,
      expirationDate: user.subscriptionExpiresAt,
      lastUsedDate,
      usageLogs: user.usageLogs,
    });
  } catch (error) {
    console.error('Usage stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}