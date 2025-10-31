import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const exportDataSchema = z.object({
  format: z.enum(['csv', 'json']),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { format } = exportDataSchema.parse(body)

    // Get user data
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get related data (habits, transactions, weekly plans, etc.)
    const [habits, transactions, weeklyPlans] = await Promise.all([
      prisma.habit.findMany({
        where: { userId: user.id },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          frequency: true,
          targetCount: true,
          currentCount: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.transaction.findMany({
        where: { userId: user.id },
        select: {
          id: true,
          type: true,
          amount: true,
          description: true,
          category: true,
          date: true,
          createdAt: true,
        },
      }),
      prisma.weeklyPlan.findMany({
        where: { userId: user.id },
        include: {
          tasks: {
            select: {
              id: true,
              title: true,
              description: true,
              completed: true,
              priority: true,
              dueDate: true,
              createdAt: true,
            },
          },
        },
      }),
    ])

    const exportData = {
      user,
      habits,
      transactions,
      weeklyPlans,
      exportDate: new Date().toISOString(),
      format,
    }

    let content: string
    let contentType: string
    let filename: string

    if (format === 'json') {
      content = JSON.stringify(exportData, null, 2)
      contentType = 'application/json'
      filename = `data-export-${user.id}.json`
    } else {
      // CSV format - convert to CSV
      content = convertToCSV(exportData)
      contentType = 'text/csv'
      filename = `data-export-${user.id}.csv`
    }

    // Return the file as a download
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error exporting data:', error)

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

function convertToCSV(data: any): string {
  // This is a simplified CSV conversion
  // In a real application, you'd want to use a proper CSV library
  const lines: string[] = []

  // Add user data
  lines.push('User Data')
  lines.push('ID,Name,Email,Created At,Updated At')
  lines.push(`${data.user.id},"${data.user.name}","${data.user.email}",${data.user.createdAt},${data.user.updatedAt}`)
  lines.push('')

  // Add habits
  lines.push('Habits')
  lines.push('ID,Title,Description,Category,Frequency,Target Count,Current Count,Created At,Updated At')
  data.habits.forEach((habit: any) => {
    lines.push(`${habit.id},"${habit.title}","${habit.description}","${habit.category}","${habit.frequency}",${habit.targetCount},${habit.currentCount},${habit.createdAt},${habit.updatedAt}`)
  })
  lines.push('')

  // Add transactions
  lines.push('Transactions')
  lines.push('ID,Type,Amount,Description,Category,Date,Created At')
  data.transactions.forEach((transaction: any) => {
    lines.push(`${transaction.id},"${transaction.type}",${transaction.amount},"${transaction.description}","${transaction.category}",${transaction.date},${transaction.createdAt}`)
  })
  lines.push('')

  // Add weekly plans
  lines.push('Weekly Plans')
  lines.push('ID,Week Start,Tasks Count,Created At')
  data.weeklyPlans.forEach((plan: any) => {
    lines.push(`${plan.id},${plan.weekStart},${plan.tasks.length},${plan.createdAt}`)
  })

  return lines.join('\n')
}