import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token và mật khẩu mới là bắt buộc' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 8 ký tự' },
        { status: 400 }
      );
    }

    // Find reset token
    const resetToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Token không hợp lệ hoặc đã hết hạn' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { token },
      });
      return NextResponse.json(
        { error: 'Token đã hết hạn. Vui lòng yêu cầu đặt lại mật khẩu mới.' },
        { status: 400 }
      );
    }

    // Extract email from identifier (format: "reset-email@example.com")
    const email = resetToken.identifier.replace('reset-', '');

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Người dùng không tồn tại' },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user's password
    await prisma.user.update({
      where: { email },
      data: { passwordHash: hashedPassword },
    });

    // Delete used token
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({
      message: 'Mật khẩu đã được đặt lại thành công',
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra khi đặt lại mật khẩu' },
      { status: 500 }
    );
  }
}

