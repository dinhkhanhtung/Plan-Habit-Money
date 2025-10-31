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

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';
    const status = searchParams.get('status');

    const where: any = {
      user: { email: session.user.email },
    };

    if (status && status !== 'all') {
      where.status = status;
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        daysPurchased: true,
        createdAt: true,
        stripePaymentIntentId: true,
      },
    });

    if (format === 'csv') {
      const csvHeader = 'ID,Amount,Currency,Status,Days Purchased,Date,Payment Intent ID\n';
      const csvRows = transactions.map((t: any) =>
        `${t.id},${t.amount},${t.currency},${t.status},${t.daysPurchased},${t.createdAt.toISOString()},${t.stripePaymentIntentId || ''}`
      ).join('\n');

      const csv = csvHeader + csvRows;

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=payment-history.csv',
        },
      });
    }

    // JSON export
    return NextResponse.json({
      transactions,
      exportedAt: new Date().toISOString(),
      total: transactions.length,
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}