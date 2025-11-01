# Cập nhật Google Cloud Console cho Production

## 🎯 Mục đích
Thêm production domain vào Google OAuth để đăng nhập Google hoạt động trên Vercel.

---

## 📝 Bước 1: Truy cập Google Cloud Console

1. Vào: https://console.cloud.google.com/
2. Chọn project: **Plan Habit Money** (hoặc project bạn đã tạo)
3. Vào menu: **APIs & Services** → **Credentials**

---

## 🔧 Bước 2: Cập nhật OAuth 2.0 Client

1. Tìm OAuth client ID đã tạo (tên: **Plan Habit Money Web Client** hoặc tương tự)
2. Click vào tên để edit
3. Thêm vào **Authorized JavaScript origins**:

```
http://localhost:3000
https://plan-habit-money.vercel.app
```

4. Thêm vào **Authorized redirect URIs**:

```
http://localhost:3000/api/auth/callback/google
https://plan-habit-money.vercel.app/api/auth/callback/google
```

5. Click **"Save"**

---

## ✅ Kết quả

Sau khi save, Google OAuth sẽ hoạt động cho cả:
- ✅ Local development: `http://localhost:3000`
- ✅ Production: `https://plan-habit-money.vercel.app`

---

## ⏱️ Thời gian

- **Cập nhật**: 2 phút
- **Google propagate changes**: 5-10 phút
- **Tổng**: ~10-15 phút

---

## 🧪 Test

1. Truy cập: https://plan-habit-money.vercel.app/login
2. Click **"Đăng nhập với Google"**
3. Chọn tài khoản Google
4. Nếu thành công → Redirect về `/dashboard` ✅

---

**Note**: Nếu vẫn gặp lỗi `redirect_uri_mismatch`, đợi thêm 5-10 phút để Google cập nhật.

