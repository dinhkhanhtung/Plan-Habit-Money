import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Plan Habit Money" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: text || '',
      html,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Xác thực Email</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo svg {
          width: 48px;
          height: 48px;
          fill: #13c8ec;
        }
        h1 {
          color: #0d191b;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
        }
        p {
          color: #4a5568;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          background: #13c8ec;
          color: #ffffff;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          margin: 20px 0;
        }
        .button:hover {
          background: #0fb5d6;
        }
        .button-container {
          text-align: center;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #718096;
          font-size: 14px;
        }
        .link {
          color: #13c8ec;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fill-rule="evenodd"></path>
          </svg>
        </div>
        
        <h1>Xác thực Email của bạn</h1>
        
        <p>Chào bạn,</p>
        
        <p>Cảm ơn bạn đã đăng ký tài khoản Plan Habit Money! Để hoàn tất quá trình đăng ký, vui lòng xác thực địa chỉ email của bạn bằng cách nhấn vào nút bên dưới:</p>
        
        <div class="button-container">
          <a href="${verificationUrl}" class="button">Xác thực Email</a>
        </div>
        
        <p>Hoặc copy và paste link sau vào trình duyệt:</p>
        <p class="link">${verificationUrl}</p>
        
        <p><strong>Lưu ý:</strong> Link này sẽ hết hạn sau 24 giờ.</p>
        
        <p>Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.</p>
        
        <div class="footer">
          <p>© 2025 Plan Habit Money. All rights reserved.</p>
          <p>Quản lý Tuần, Theo dõi Thói quen, Làm chủ Tài chính.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Xác thực Email của bạn

Chào bạn,

Cảm ơn bạn đã đăng ký tài khoản Plan Habit Money! Để hoàn tất quá trình đăng ký, vui lòng xác thực địa chỉ email của bạn bằng cách truy cập link sau:

${verificationUrl}

Lưu ý: Link này sẽ hết hạn sau 24 giờ.

Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.

© 2025 Plan Habit Money
Quản lý Tuần, Theo dõi Thói quen, Làm chủ Tài chính.
  `;

  return sendEmail({
    to: email,
    subject: 'Xác thực Email - Plan Habit Money',
    html,
    text,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Đặt lại Mật khẩu</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo svg {
          width: 48px;
          height: 48px;
          fill: #13c8ec;
        }
        h1 {
          color: #0d191b;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
        }
        p {
          color: #4a5568;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          background: #13c8ec;
          color: #ffffff;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          margin: 20px 0;
        }
        .button:hover {
          background: #0fb5d6;
        }
        .button-container {
          text-align: center;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #718096;
          font-size: 14px;
        }
        .link {
          color: #13c8ec;
          word-break: break-all;
        }
        .warning {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 12px;
          margin: 20px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fill-rule="evenodd"></path>
          </svg>
        </div>
        
        <h1>Đặt lại Mật khẩu</h1>
        
        <p>Chào bạn,</p>
        
        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nhấn vào nút bên dưới để tạo mật khẩu mới:</p>
        
        <div class="button-container">
          <a href="${resetUrl}" class="button">Đặt lại Mật khẩu</a>
        </div>
        
        <p>Hoặc copy và paste link sau vào trình duyệt:</p>
        <p class="link">${resetUrl}</p>
        
        <div class="warning">
          <p style="margin: 0;"><strong>⚠️ Lưu ý bảo mật:</strong></p>
          <p style="margin: 5px 0 0 0;">Link này sẽ hết hạn sau 1 giờ. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.</p>
        </div>
        
        <div class="footer">
          <p>© 2025 Plan Habit Money. All rights reserved.</p>
          <p>Quản lý Tuần, Theo dõi Thói quen, Làm chủ Tài chính.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Đặt lại Mật khẩu

Chào bạn,

Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Truy cập link sau để tạo mật khẩu mới:

${resetUrl}

⚠️ Lưu ý bảo mật:
Link này sẽ hết hạn sau 1 giờ. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.

© 2025 Plan Habit Money
Quản lý Tuần, Theo dõi Thói quen, Làm chủ Tài chính.
  `;

  return sendEmail({
    to: email,
    subject: 'Đặt lại Mật khẩu - Plan Habit Money',
    html,
    text,
  });
}

