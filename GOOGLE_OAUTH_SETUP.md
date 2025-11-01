# Hướng dẫn cấu hình Google OAuth cho Plan Habit Money

## 🔍 Vấn đề hiện tại

Đăng ký và đăng nhập với Google **chưa hoạt động** vì:
- ❌ Chưa có Google Client ID và Client Secret
- ❌ Chưa cấu hình OAuth Consent Screen trên Google Cloud Console
- ❌ Chưa thêm Authorized Redirect URIs

---

## ✅ Giải pháp: Cấu hình Google OAuth (10 phút)

### **Bước 1: Tạo Google Cloud Project**

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Đăng nhập bằng tài khoản Google của bạn
3. Click **"Select a project"** → **"New Project"**
4. Nhập thông tin:
   - **Project name**: `Plan Habit Money`
   - **Organization**: Để trống (hoặc chọn nếu có)
5. Click **"Create"**
6. Đợi 10-20 giây để project được tạo

---

### **Bước 2: Cấu hình OAuth Consent Screen**

1. Trong Google Cloud Console, chọn project vừa tạo
2. Vào menu **"APIs & Services"** → **"OAuth consent screen"**
3. Chọn **"External"** (cho phép bất kỳ ai đăng nhập)
4. Click **"Create"**

#### **OAuth consent screen - Trang 1:**
- **App name**: `Plan Habit Money`
- **User support email**: Email của bạn (ví dụ: `your-email@gmail.com`)
- **App logo**: (Tùy chọn - có thể bỏ qua)
- **Application home page**: `http://localhost:3000` (development) hoặc `https://your-domain.com` (production)
- **Application privacy policy link**: `http://localhost:3000/privacy` (tạm thời)
- **Application terms of service link**: `http://localhost:3000/terms` (tạm thời)
- **Authorized domains**: 
  - Development: Để trống
  - Production: Thêm domain của bạn (ví dụ: `your-domain.com`)
- **Developer contact information**: Email của bạn

Click **"Save and Continue"**

#### **OAuth consent screen - Trang 2: Scopes**
- Click **"Add or Remove Scopes"**
- Chọn các scopes sau:
  - ✅ `.../auth/userinfo.email`
  - ✅ `.../auth/userinfo.profile`
  - ✅ `openid`
- Click **"Update"** → **"Save and Continue"**

#### **OAuth consent screen - Trang 3: Test users** (Chỉ cho development)
- Click **"Add Users"**
- Thêm email của bạn và các tester (tối đa 100 users)
- Click **"Save and Continue"**

#### **OAuth consent screen - Trang 4: Summary**
- Review thông tin
- Click **"Back to Dashboard"**

---

### **Bước 3: Tạo OAuth 2.0 Credentials**

1. Vào menu **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Chọn **"Application type"**: **Web application**
4. Nhập thông tin:

#### **Name**: `Plan Habit Money Web Client`

#### **Authorized JavaScript origins**:
- Development:
  ```
  http://localhost:3000
  ```
- Production (thêm sau khi deploy):
  ```
  https://your-domain.com
  https://your-domain.vercel.app
  ```

#### **Authorized redirect URIs**:
- Development:
  ```
  http://localhost:3000/api/auth/callback/google
  ```
- Production (thêm sau khi deploy):
  ```
  https://your-domain.com/api/auth/callback/google
  https://your-domain.vercel.app/api/auth/callback/google
  ```

5. Click **"Create"**

---

### **Bước 4: Lấy Client ID và Client Secret**

Sau khi tạo xong, một popup sẽ hiển thị:
- **Your Client ID**: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- **Your Client Secret**: `GOCSPX-abcdefghijklmnopqrstuvwxyz`

**⚠️ QUAN TRỌNG**: Copy cả 2 giá trị này ngay!

---

### **Bước 5: Cập nhật file .env**

1. Mở file `.env` trong project
2. Thêm/cập nhật các dòng sau:

```env
# Google OAuth
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz"

# NextAuth.js
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

#### **Tạo NEXTAUTH_SECRET:**

**Option 1: Dùng OpenSSL (Khuyến nghị)**
```bash
openssl rand -base64 32
```

**Option 2: Dùng Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3: Online Generator**
- Truy cập: https://generate-secret.vercel.app/32
- Copy secret key

Paste kết quả vào `NEXTAUTH_SECRET`

---

### **Bước 6: Restart Development Server**

1. Dừng server hiện tại (Ctrl + C)
2. Chạy lại:
```bash
npm run dev
```

---

### **Bước 7: Test Google OAuth**

1. Mở trình duyệt: http://localhost:3000/login
2. Click **"Đăng nhập với Google"**
3. Chọn tài khoản Google
4. Cho phép quyền truy cập (email, profile)
5. Sẽ redirect về `/dashboard`

**✅ Thành công!** User đã được tạo trong database với:
- Email từ Google
- Name từ Google
- Avatar từ Google (nếu có)

---

## 🔧 Troubleshooting

### **Lỗi 1: "Error 400: redirect_uri_mismatch"**

**Nguyên nhân**: Redirect URI không khớp với cấu hình trên Google Cloud Console

**Giải pháp**:
1. Kiểm tra URL trong error message
2. Vào Google Cloud Console → Credentials
3. Edit OAuth client ID
4. Thêm chính xác URL đó vào **Authorized redirect URIs**
5. Click **"Save"**
6. Đợi 5 phút để Google cập nhật
7. Thử lại

**Ví dụ**:
```
Error message: redirect_uri_mismatch
The redirect URI in the request: http://localhost:3000/api/auth/callback/google
does not match the ones authorized for the OAuth client.

→ Thêm chính xác: http://localhost:3000/api/auth/callback/google
```

---

### **Lỗi 2: "Error 403: access_denied"**

**Nguyên nhân**: Email chưa được thêm vào Test users (khi app ở chế độ Testing)

**Giải pháp**:
1. Vào Google Cloud Console → OAuth consent screen
2. Scroll xuống **"Test users"**
3. Click **"Add Users"**
4. Thêm email bạn đang dùng để test
5. Click **"Save"**
6. Thử lại

---

### **Lỗi 3: "Error: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET"**

**Nguyên nhân**: Biến môi trường chưa được load

**Giải pháp**:
1. Kiểm tra file `.env` có đúng tên (không phải `.env.local` hoặc `.env.example`)
2. Kiểm tra không có khoảng trắng thừa:
   ```env
   # ❌ SAI
   GOOGLE_CLIENT_ID = "123456..."
   
   # ✅ ĐÚNG
   GOOGLE_CLIENT_ID="123456..."
   ```
3. Restart server: Ctrl + C → `npm run dev`

---

### **Lỗi 4: "Error: Callback URL not allowed"**

**Nguyên nhân**: NextAuth callback URL không được cấu hình đúng

**Giải pháp**:
1. Kiểm tra `NEXTAUTH_URL` trong `.env`:
   ```env
   # Development
   NEXTAUTH_URL="http://localhost:3000"
   
   # Production
   NEXTAUTH_URL="https://your-domain.com"
   ```
2. Restart server

---

### **Lỗi 5: User được tạo nhưng không có passwordHash**

**Đây KHÔNG phải lỗi!** Đây là behavior đúng:
- User đăng ký bằng Google → `passwordHash = null`
- User chỉ có thể login bằng Google
- Nếu muốn set password sau, cần implement "Set Password" feature

---

## 🚀 Deploy lên Production (Vercel)

### **Bước 1: Cập nhật Google OAuth Credentials**

1. Deploy app lên Vercel → Lấy URL (ví dụ: `https://plan-habit-money.vercel.app`)
2. Vào Google Cloud Console → Credentials → Edit OAuth client ID
3. Thêm vào **Authorized JavaScript origins**:
   ```
   https://plan-habit-money.vercel.app
   ```
4. Thêm vào **Authorized redirect URIs**:
   ```
   https://plan-habit-money.vercel.app/api/auth/callback/google
   ```
5. Click **"Save"**

### **Bước 2: Cập nhật Environment Variables trên Vercel**

1. Vào Vercel Dashboard → Project Settings → Environment Variables
2. Thêm các biến sau:

```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://plan-habit-money.vercel.app
DATABASE_URL=postgresql://...
```

3. Click **"Save"**
4. Redeploy app

### **Bước 3: Publish OAuth App (Tùy chọn)**

Nếu muốn cho phép **bất kỳ ai** đăng nhập (không chỉ test users):

1. Vào Google Cloud Console → OAuth consent screen
2. Click **"Publish App"**
3. Confirm

**Lưu ý**: Google có thể yêu cầu verification nếu app request nhiều scopes nhạy cảm. Với scopes cơ bản (email, profile), thường không cần verification.

---

## 📊 Kiểm tra Database

Sau khi đăng nhập thành công với Google, kiểm tra database:

```sql
-- Xem user vừa tạo
SELECT id, email, name, image, "emailVerified", "passwordHash"
FROM "User"
WHERE email = 'your-email@gmail.com';

-- Kết quả mong đợi:
-- id: uuid
-- email: your-email@gmail.com
-- name: Your Name (từ Google)
-- image: https://lh3.googleusercontent.com/... (avatar từ Google)
-- emailVerified: timestamp (tự động verified vì từ Google)
-- passwordHash: NULL (vì đăng nhập bằng Google)

-- Xem account liên kết
SELECT * FROM "Account"
WHERE "userId" = 'user-id-from-above';

-- Kết quả mong đợi:
-- provider: google
-- providerAccountId: Google user ID
-- type: oauth
```

---

## 🔐 Security Best Practices

### **1. Bảo vệ Client Secret**
- ❌ KHÔNG commit `.env` vào Git
- ✅ Chỉ commit `.env.example` (không có giá trị thật)
- ✅ Add `.env` vào `.gitignore`

### **2. Rotate Secrets định kỳ**
- Mỗi 6 tháng, tạo Client Secret mới
- Update trên Vercel và local

### **3. Giới hạn Authorized URIs**
- Chỉ thêm URIs thực sự cần thiết
- Không thêm wildcard (`*`)

### **4. Monitor OAuth Usage**
- Vào Google Cloud Console → APIs & Services → Dashboard
- Xem số lượng requests, errors

---

## 📝 Checklist

- [ ] Tạo Google Cloud Project
- [ ] Cấu hình OAuth Consent Screen
- [ ] Tạo OAuth 2.0 Credentials
- [ ] Copy Client ID và Client Secret
- [ ] Cập nhật file `.env`
- [ ] Tạo NEXTAUTH_SECRET
- [ ] Restart development server
- [ ] Test đăng nhập với Google
- [ ] Kiểm tra user trong database
- [ ] (Production) Cập nhật Authorized URIs
- [ ] (Production) Cập nhật Vercel Environment Variables

---

## 🎉 Kết quả mong đợi

Sau khi hoàn thành:
- ✅ Click "Đăng nhập với Google" → Popup Google OAuth
- ✅ Chọn tài khoản → Cho phép quyền
- ✅ Redirect về `/dashboard`
- ✅ User được tạo trong database với email, name, avatar từ Google
- ✅ Session được tạo, user đã đăng nhập
- ✅ Có thể sử dụng tất cả tính năng của app

---

**Thời gian ước tính**: 10-15 phút cho lần đầu setup

**Nếu gặp vấn đề**, kiểm tra lại từng bước trong phần Troubleshooting hoặc xem console logs để biết lỗi cụ thể.

