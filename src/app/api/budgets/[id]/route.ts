import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, category, amount, period, spent } = body;

    const budget = await prisma.budget.updateMany({
      where: {
        id: id,
        userId: session.user.id
      },
      data: {
        ...(name !== undefined && { name }),
        ...(category !== undefined && { category }),
        ...(amount !== undefined && { amount: Math.round(amount * 100) }),
        ...(period !== undefined && { period }),
        ...(spent !== undefined && { spent: Math.round(spent * 100) })
      }
    });

    if (budget.count === 0) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    const updatedBudget = await prisma.budget.findUnique({
      where: { id: id }
    });

    return NextResponse.json(updatedBudget);
  } catch (error) {
    console.error('Error updating budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const budget = await prisma.budget.deleteMany({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (budget.count === 0) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Error deleting budget:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}