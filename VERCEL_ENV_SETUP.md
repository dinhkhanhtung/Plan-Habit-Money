# Vercel Environment Variables Setup

## 📋 Danh sách Environment Variables cần thêm vào Vercel

Truy cập: **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

---

## ✅ Required Variables (Bắt buộc)

### 1. DATABASE_URL
```
postgresql://user:password@host:5432/database
```
**Environments**: ✅ Production, ✅ Preview, ✅ Development

**Note**: Lấy từ Supabase hoặc PostgreSQL provider của bạn

---

### 2. NEXTAUTH_SECRET
```
your-generated-secret-here
```
**Environments**: ✅ Production, ✅ Preview, ✅ Development

**Cách tạo**: `openssl rand -base64 32`

---

### 3. NEXTAUTH_URL
```
https://your-app.vercel.app
```
**Environments**: ✅ Production

**For Preview/Development**: Vercel tự động set

---

### 4. GOOGLE_CLIENT_ID
```
your-google-client-id.apps.googleusercontent.com
```
**Environments**: ✅ Production, ✅ Preview, ✅ Development

**Note**: Lấy từ Google Cloud Console → Credentials

---

### 5. GOOGLE_CLIENT_SECRET
```
GOCSPX-your-google-client-secret
```
**Environments**: ✅ Production, ✅ Preview, ✅ Development

**Note**: Lấy từ Google Cloud Console → Credentials

---

## 🔧 Optional Variables (Tùy chọn)

### 6. NODE_ENV
```
production
```
**Environments**: ✅ Production

---

### 7. VERCEL_URL
```
plan-habit-money.vercel.app
```
**Note**: Vercel tự động set biến này, không cần thêm thủ công

---

### 8. NEXT_PUBLIC_GA_ID (Google Analytics)
```
G-XXXXXXXXXX
```
**Environments**: ✅ Production, ✅ Preview
**Note**: Thay `G-XXXXXXXXXX` bằng GA Measurement ID thực tế

---

### 9. SMTP Variables (Email)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```
**Environments**: ✅ Production, ✅ Preview

---

### 10. Stripe Variables (Payment)
```
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
**Environments**: ✅ Production, ✅ Preview

---

## 🚀 Cách thêm nhanh (Copy-Paste)

### Option 1: Thêm từng biến qua UI

1. Vào **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Paste **Key** và **Value** từ danh sách trên
4. Chọn **Environments** (Production, Preview, Development)
5. Click **"Save"**
6. Lặp lại cho tất cả biến

---

### Option 2: Import từ file (Nhanh hơn)

1. Tạo file `vercel-env.txt` với nội dung:

```env
# Thay thế bằng giá trị thật của bạn
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="https://your-app.vercel.app"
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-client-secret"
NODE_ENV="production"
```

2. Vào **Vercel Dashboard** → **Settings** → **Environment Variables**
3. Click **"Import .env"**
4. Upload file `vercel-env.txt`
5. Chọn environments
6. Click **"Import"**

---

## 🔄 Sau khi thêm Environment Variables

1. **Redeploy** project:
   - Vào **Deployments** tab
   - Click **"..."** ở deployment mới nhất
   - Click **"Redeploy"**

2. **Hoặc push commit mới** lên GitHub để trigger auto-deploy

---

## ✅ Kiểm tra

Sau khi deploy xong:

1. Truy cập: https://plan-habit-money.vercel.app
2. Click **"Đăng nhập với Google"**
3. Nếu thành công → Environment Variables đã hoạt động ✅

---

## 🔐 Bảo mật

- ✅ Tất cả secrets đã được lưu trên Vercel (an toàn)
- ✅ File `.env.local` chỉ dùng cho local development (đã gitignore)
- ✅ File `.env.example` không chứa giá trị thật (safe to commit)
- ✅ Không có secrets nào bị push lên GitHub

---

## 📝 Notes

- **NEXTAUTH_URL**: Phải match với domain production (`https://plan-habit-money.vercel.app`)
- **Google OAuth**: Nhớ thêm redirect URI vào Google Cloud Console:
  ```
  https://plan-habit-money.vercel.app/api/auth/callback/google
  ```
- **Database**: Đang dùng Supabase PostgreSQL (đã có sẵn)
- **Stripe**: Chưa cấu hình, có thể thêm sau khi có API keys

---

## 🆘 Troubleshooting

### Lỗi: "Missing environment variable"
→ Kiểm tra lại tên biến có đúng không (case-sensitive)
→ Redeploy sau khi thêm biến mới

### Lỗi: Google OAuth không hoạt động
→ Kiểm tra `NEXTAUTH_URL` có đúng domain production không
→ Kiểm tra Google Cloud Console có redirect URI production chưa

### Lỗi: Database connection failed
→ Kiểm tra `DATABASE_URL` có đúng format không
→ Kiểm tra Supabase database có đang chạy không

---

**Thời gian ước tính**: 5-10 phút để thêm tất cả variables

