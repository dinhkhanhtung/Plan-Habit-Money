# Quick Start - Plan Habit Money

Hướng dẫn nhanh để chạy ứng dụng trong 5 phút.

---

## 📋 Yêu cầu

- Node.js 18+ đã cài đặt
- PostgreSQL database (hoặc Supabase)
- Tài khoản Google (để setup OAuth)

---

## 🚀 Bước 1: Clone và Install (2 phút)

```bash
# Clone repository
git clone https://github.com/dinhkhanhtung/Plan-Habit-Money.git
cd Plan-Habit-Money

# Install dependencies
npm install
```

---

## 🔧 Bước 2: Cấu hình Environment Variables (3 phút)

### **2.1. Copy file .env.example**

```bash
cp .env.example .env
```

### **2.2. Cập nhật file .env**

Mở file `.env` và cập nhật các giá trị sau:

```env
# Database (Bắt buộc)
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth.js (Bắt buộc)
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Bắt buộc cho đăng nhập Google)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe (Tùy chọn - cho payment)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Tùy chọn - cho email verification)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Analytics (Tùy chọn)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 🔑 Bước 3: Tạo các Keys cần thiết

### **3.1. NEXTAUTH_SECRET**

**Option 1: OpenSSL**
```bash
openssl rand -base64 32
```

**Option 2: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3: Online**
- Truy cập: https://generate-secret.vercel.app/32
- Copy và paste vào `NEXTAUTH_SECRET`

### **3.2. Google OAuth Credentials**

**Xem hướng dẫn chi tiết:** [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)

**Tóm tắt nhanh:**
1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới: "Plan Habit Money"
3. Vào **APIs & Services** → **OAuth consent screen** → Setup
4. Vào **Credentials** → **Create OAuth client ID** → Web application
5. Thêm Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID và Client Secret vào `.env`

---

## 🗄️ Bước 4: Setup Database (1 phút)

### **4.1. Chạy Prisma migrations**

```bash
npx prisma migrate dev
```

### **4.2. (Tùy chọn) Seed database với sample data**

```bash
npx prisma db seed
```

### **4.3. Mở Prisma Studio để xem database**

```bash
npx prisma studio
```

Truy cập: http://localhost:5555

---

## ▶️ Bước 5: Chạy Development Server

```bash
npm run dev
```

Truy cập: http://localhost:3000

---

## ✅ Kiểm tra

### **1. Trang chủ**
- Truy cập: http://localhost:3000
- Nên thấy landing page

### **2. Đăng ký**
- Truy cập: http://localhost:3000/register
- Thử đăng ký với email/password
- Hoặc click "Đăng ký với Google"

### **3. Đăng nhập**
- Truy cập: http://localhost:3000/login
- Đăng nhập với tài khoản vừa tạo
- Hoặc click "Đăng nhập với Google"

### **4. Dashboard**
- Sau khi đăng nhập, sẽ redirect đến: http://localhost:3000/dashboard
- Nên thấy dashboard với 3 modules:
  - 📅 Weekly Planner
  - ✅ Habit Tracker
  - 💰 Smart Money

---

## 🧪 Chạy Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 🏗️ Build Production

```bash
# Build
npm run build

# Start production server
npm start
```

---

## 📚 Tài liệu bổ sung

- **[USER_GUIDE.md](./USER_GUIDE.md)** - Hướng dẫn sử dụng cho end users
- **[FAQ.md](./FAQ.md)** - Câu hỏi thường gặp
- **[GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)** - Hướng dẫn chi tiết setup Google OAuth
- **[FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md)** - Các tính năng sẽ implement sau
- **[READINESS_ASSESSMENT.md](./READINESS_ASSESSMENT.md)** - Đánh giá mức độ sẵn sàng

---

## 🐛 Troubleshooting

### **Lỗi: "Error: Invalid `prisma.user.findUnique()` invocation"**

**Nguyên nhân**: Database chưa được migrate

**Giải pháp**:
```bash
npx prisma migrate dev
```

---

### **Lỗi: "Error: Missing GOOGLE_CLIENT_ID"**

**Nguyên nhân**: Chưa cấu hình Google OAuth

**Giải pháp**: Xem [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)

---

### **Lỗi: "Error: connect ECONNREFUSED"**

**Nguyên nhân**: Database không chạy hoặc DATABASE_URL sai

**Giải pháp**:
1. Kiểm tra PostgreSQL đang chạy
2. Kiểm tra DATABASE_URL trong `.env`
3. Test connection:
```bash
npx prisma db pull
```

---

### **Lỗi: "Module not found"**

**Nguyên nhân**: Dependencies chưa được install

**Giải pháp**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### **Google OAuth không hoạt động**

**Giải pháp**: Xem phần Troubleshooting trong [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)

---

## 🚀 Deploy lên Production

### **Vercel (Khuyến nghị)**

1. Push code lên GitHub
2. Vào [Vercel](https://vercel.com)
3. Import repository
4. Thêm Environment Variables (copy từ `.env`)
5. Deploy

**Chi tiết**: Xem [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) phần "Deploy lên Production"

---

## 📊 Tech Stack

- **Framework**: Next.js 14.2.15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.0
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Payment**: Stripe
- **Email**: Nodemailer
- **Testing**: Jest + React Testing Library
- **Analytics**: Google Analytics

---

## 🎯 Features

### **Core Features**
- ✅ User Authentication (Email/Password + Google OAuth)
- ✅ Email Verification
- ✅ Password Reset
- ✅ Weekly Planner (Tasks, Goals, Calendar)
- ✅ Habit Tracker (Daily logging, Streaks, Statistics)
- ✅ Smart Money (Budgets, Transactions, Charts)
- ✅ Subscription & Payment (Stripe integration)
- ✅ Dark Mode
- ✅ Responsive Design
- ✅ Mobile Navigation

### **Advanced Features**
- ✅ Error Handling với user-friendly messages
- ✅ Toast Notifications
- ✅ Loading States (Skeletons, Spinners)
- ✅ Database Indexes (Performance optimization)
- ✅ Google Analytics Integration
- ✅ Unit Tests (19 tests)
- ✅ Security (Rate limiting, CSRF protection, bcrypt)

---

## 📞 Support

- **Email**: support@planhabitmoney.com (tạm thời)
- **GitHub Issues**: https://github.com/dinhkhanhtung/Plan-Habit-Money/issues
- **In-app Help**: http://localhost:3000/help

---

## 📝 License

MIT License - Xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

---

**Chúc bạn code vui vẻ! 🎉**

