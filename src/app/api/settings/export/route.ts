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
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get related data (habits, transactions, weekly plans, etc.)
    const [habits, transactions, weeklyTasks] = await Promise.all([
      prisma.habit.findMany({
        where: { userId: user.id },
        select: {
          id: true,
          name: true,
          description: true,
          frequency: true,
        },
      }),
      prisma.financialTransaction.findMany({
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
      prisma.weeklyPlannerTask.findMany({
        where: { userId: user.id },
        select: {
          id: true,
          title: true,
          description: true,
          completed: true,
          date: true,
          time: true,
          createdAt: true,
        },
      }),
    ])

    const exportData = {
      user,
      habits,
      transactions,
      weeklyTasks,
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
  lines.push('ID,Name,Email')
  lines.push(`${data.user.id},"${data.user.name}","${data.user.email}"`)
  lines.push('')

  // Add habits
  lines.push('Habits')
  lines.push('ID,Name,Description,Frequency')
  data.habits.forEach((habit: any) => {
    lines.push(`${habit.id},"${habit.name}","${habit.description}","${habit.frequency}"`)
  })
  lines.push('')

  // Add transactions
  lines.push('Transactions')
  lines.push('ID,Type,Amount,Description,Category,Date,Created At')
  data.transactions.forEach((transaction: any) => {
    lines.push(`${transaction.id},"${transaction.type}",${transaction.amount},"${transaction.description}","${transaction.category}",${transaction.date},${transaction.createdAt}`)
  })
  lines.push('')

  // Add weekly tasks
  lines.push('Weekly Planner Tasks')
  lines.push('ID,Title,Description,Completed,Date,Time,Created At')
  data.weeklyTasks.forEach((task: any) => {
    lines.push(`${task.id},"${task.title}","${task.description}",${task.completed},${task.date},${task.time},${task.createdAt}`)
  })

  return lines.join('\n')
}