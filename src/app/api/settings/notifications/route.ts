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

    // Update or create notification settings for the user
    const updatedSettings = await prisma.notificationSettings.upsert({
      where: {
        userEmail: session.user.email,
      },
      update: notificationSettings,
      create: {
        userEmail: session.user.email,
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

    // Get notification settings for the user
    const settings = await prisma.notificationSettings.findUnique({
      where: {
        userEmail: session.user.email,
      },
    })

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