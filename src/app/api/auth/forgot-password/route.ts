import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        { message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.' },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Save reset token to database
    await prisma.verificationToken.create({
      data: {
        identifier: `reset-${user.email}`,
        token: resetToken,
        expires: resetTokenExpiry,
      }
    })

    // Send password reset email
    sendPasswordResetEmail(user.email, resetToken).catch((error) => {
      console.error('Failed to send password reset email:', error);
    });

    return NextResponse.json(
      { message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra' },
      { status: 500 }
    )
  }
}