import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { name, email, passwordHash } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email đã được sử dụng' },
        { status: 400 }
      )
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        subscriptionStatus: 'free',
      }
    })

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // 24 hours expiry

    // Store token in database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send verification email (don't wait for it to complete)
    sendVerificationEmail(email, token).catch((error) => {
      console.error('Failed to send verification email:', error);
    });

    return NextResponse.json(
      {
        message: 'Tài khoản đã được tạo thành công. Vui lòng kiểm tra email để xác thực tài khoản.',
        userId: user.id,
        emailSent: true
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra khi tạo tài khoản' },
      { status: 500 }
    )
  }
}