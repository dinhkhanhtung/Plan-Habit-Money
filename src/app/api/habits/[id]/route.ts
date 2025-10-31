import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, frequency } = body;

    const habit = await prisma.habit.updateMany({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(frequency !== undefined && { frequency })
      }
    });

    if (habit.count === 0) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    const updatedHabit = await prisma.habit.findUnique({
      where: { id: params.id },
      include: { logs: true }
    });

    return NextResponse.json(updatedHabit);
  } catch (error) {
    console.error('Error updating habit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const habit = await prisma.habit.deleteMany({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (habit.count === 0) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Error deleting habit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}