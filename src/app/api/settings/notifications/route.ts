import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateNotificationsSchema = z.object({
  weeklyReminders: z.boolean(),
  habitCompletion: z.boolean(),
  budgetThreshold: z.boolean(),
})

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const notificationSettings = updateNotificationsSchema.parse(body)

    // Since notificationSettings model doesn't exist, we'll use userSettings instead
    // Get user first to get userId
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update or create user settings with notification preferences
    const updatedSettings = await prisma.userSettings.upsert({
      where: {
        userId: user.id,
      },
      update: notificationSettings,
      create: {
        userId: user.id,
        ...notificationSettings,
      },
    })

    return NextResponse.json({
      success: true,
      settings: updatedSettings,
    })
  } catch (error) {
    console.error('Error updating notification settings:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user settings for the user (which includes notifications)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { settings: true },
    })

    const settings = user?.settings

    // Return default settings if none exist
    const defaultSettings = {
      weeklyReminders: true,
      habitCompletion: true,
      budgetThreshold: false,
    }

    return NextResponse.json({
      success: true,
      settings: settings || defaultSettings,
    })
  } catch (error) {
    console.error('Error getting notification settings:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}