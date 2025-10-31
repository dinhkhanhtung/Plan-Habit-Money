import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { date, completed } = body;

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    // Check if habit exists and belongs to user
    const habit = await prisma.habit.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!habit) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    // Check if log already exists for this date
    const existingLog = await prisma.habitLog.findFirst({
      where: {
        habitId: params.id,
        date: new Date(date)
      }
    });

    if (existingLog) {
      // Update existing log
      const updatedLog = await prisma.habitLog.update({
        where: { id: existingLog.id },
        data: { completed }
      });
      return NextResponse.json(updatedLog);
    } else {
      // Create new log
      const log = await prisma.habitLog.create({
        data: {
          habitId: params.id,
          date: new Date(date),
          completed
        }
      });
      return NextResponse.json(log, { status: 201 });
    }
  } catch (error) {
    console.error('Error logging habit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}