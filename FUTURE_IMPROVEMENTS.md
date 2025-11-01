# Future Improvements - NICE TO HAVE

Tài liệu này mô tả các cải tiến nên thực hiện **sau khi launch** để nâng cao hiệu suất, trải nghiệm người dùng và khả năng bảo trì của ứng dụng Plan Habit Money.

---

## 📊 1. Caching Strategy: React Query / SWR

### **Mục đích:**
- **Giảm số lượng API calls** - Cache dữ liệu đã fetch, tránh gọi API lặp lại không cần thiết
- **Tăng tốc độ load** - Hiển thị dữ liệu cached ngay lập tức, fetch mới ở background
- **Cải thiện UX** - Ứng dụng phản hồi nhanh hơn, mượt mà hơn
- **Quản lý state dễ dàng** - Tự động handle loading, error, refetch, invalidation
- **Offline support** - Hiển thị dữ liệu cached khi mất kết nối

### **Khi nào cần:**
- Khi có **nhiều users đồng thời** (>1000 users)
- Khi **API response chậm** (>500ms)
- Khi users **thường xuyên quay lại** cùng một trang
- Khi có **nhiều components** fetch cùng một data

### **Ví dụ thực tế:**
```typescript
// TRƯỚC (không cache):
// Mỗi lần vào trang Dashboard, gọi lại API
useEffect(() => {
  fetch('/api/weekly-planner')
    .then(res => res.json())
    .then(setTasks)
}, [])

// SAU (với React Query):
// Lần đầu fetch từ API, lần sau dùng cache
const { data: tasks } = useQuery('tasks', fetchTasks, {
  staleTime: 5 * 60 * 1000, // Cache 5 phút
  refetchOnWindowFocus: true, // Auto refetch khi quay lại tab
})
```

### **Lợi ích cụ thể cho Plan Habit Money:**
- **Weekly Planner**: Cache tasks của tuần, chỉ refetch khi có thay đổi
- **Habit Tracker**: Cache habit logs, giảm load khi xem statistics
- **Smart Money**: Cache transactions, budgets - data ít thay đổi
- **Dashboard**: Aggregate data từ cache của các modules khác

### **Implementation:**

#### **Option 1: React Query (Khuyến nghị)**
```bash
npm install @tanstack/react-query
```

```typescript
// src/lib/react-query.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
})

// src/app/client-layout.tsx
import { QueryClientProvider } from '@tanstack/react-query'

<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```

#### **Option 2: SWR (Đơn giản hơn)**
```bash
npm install swr
```

```typescript
// src/hooks/useTasks.ts
import useSWR from 'swr'

export function useTasks() {
  const { data, error, mutate } = useSWR('/api/weekly-planner', fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  })
  
  return { tasks: data, isLoading: !error && !data, mutate }
}
```

### **Ưu tiên:**
- **Phase 1** (sau 1 tháng launch): Implement cho Weekly Planner, Habit Tracker
- **Phase 2** (sau 3 tháng): Expand sang Smart Money, Dashboard
- **Phase 3** (sau 6 tháng): Advanced features (optimistic updates, pagination)

---

## 📊 2. Image Optimization: next/image

### **Mục đích:**
- **Giảm bandwidth** - Tự động resize, compress, convert sang WebP
- **Tăng tốc load** - Lazy loading, priority loading cho above-fold images
- **Cải thiện SEO** - Tối ưu Core Web Vitals (LCP, CLS)
- **Responsive** - Tự động serve đúng size cho từng device
- **CDN caching** - Vercel tự động cache optimized images

### **Khi nào cần:**
- Khi có **nhiều images** trên trang (>5 images)
- Khi **LCP score thấp** (<2.5s)
- Khi users phàn nàn **load chậm** trên mobile
- Khi muốn **giảm chi phí bandwidth**

### **Ví dụ thực tế:**
```typescript
// TRƯỚC (không optimize):
<img src="/avatar.jpg" alt="User" />
// - Load full size (2MB)
// - Không lazy load
// - Không responsive

// SAU (với next/image):
<Image 
  src="/avatar.jpg" 
  alt="User"
  width={100}
  height={100}
  priority={false} // Lazy load
  quality={80} // Compress 80%
/>
// - Auto resize to 100x100
// - Convert to WebP (~200KB)
// - Lazy load khi scroll đến
// - Responsive srcset
```

### **Lợi ích cụ thể cho Plan Habit Money:**

#### **Hiện tại có images ở:**
1. **Settings page** - User avatar (line 177)
2. **Habit Tracker** - Progress stats images (line 25)
3. **Pricing page** - Payment icons (line 68)

#### **Cải thiện:**
```typescript
// src/app/settings/page.tsx
// TRƯỚC:
<img src={user.image || '/default-avatar.png'} className="w-20 h-20 rounded-full" />

// SAU:
import Image from 'next/image'
<Image 
  src={user.image || '/default-avatar.png'} 
  alt="User avatar"
  width={80}
  height={80}
  className="rounded-full"
  priority={true} // Above fold
/>
```

### **Implementation:**

```typescript
// src/components/OptimizedImage.tsx
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className 
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..." // Blur placeholder
      className={className}
    />
  )
}
```

### **Ưu tiên:**
- **Phase 1** (ngay sau launch): Replace 3 `<img>` tags hiện tại
- **Phase 2** (khi thêm features): Dùng next/image cho tất cả images mới
- **Phase 3** (optimization): Add blur placeholders, responsive images

---

## 📊 3. E2E Tests: Playwright / Cypress

### **Mục đích:**
- **Test user flows** - Mô phỏng hành vi thực tế của users
- **Catch bugs sớm** - Phát hiện lỗi trước khi users gặp
- **Regression testing** - Đảm bảo features cũ không bị break khi update
- **Confidence** - Deploy an tâm hơn, ít bugs production
- **Documentation** - Tests là documentation sống cho user flows

### **Khi nào cần:**
- Khi có **nhiều features phức tạp** (payment, multi-step forms)
- Khi **thường xuyên deploy** (>1 lần/tuần)
- Khi có **nhiều developers** (>2 người)
- Khi có **critical bugs** ảnh hưởng revenue

### **Ví dụ thực tế:**

#### **User Flow cần test:**
1. **Registration & Login Flow**
2. **Weekly Planner Flow** - Create, edit, complete, delete task
3. **Habit Tracker Flow** - Create habit, log daily, view streak
4. **Smart Money Flow** - Add transaction, create budget, view chart
5. **Payment Flow** - Select plan, enter card, complete payment
6. **Email Verification Flow** - Register, receive email, verify

### **Lợi ích cụ thể cho Plan Habit Money:**

```typescript
// tests/e2e/weekly-planner.spec.ts (Playwright)
import { test, expect } from '@playwright/test'

test('User can create and complete a task', async ({ page }) => {
  // 1. Login
  await page.goto('/login')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  // 2. Navigate to Weekly Planner
  await page.click('text=Weekly Planner')
  await expect(page).toHaveURL('/weekly-planner')
  
  // 3. Create task
  await page.click('text=Add Task')
  await page.fill('[name="title"]', 'Test Task')
  await page.fill('[name="description"]', 'E2E test task')
  await page.click('button:has-text("Save")')
  
  // 4. Verify task appears
  await expect(page.locator('text=Test Task')).toBeVisible()
  
  // 5. Complete task
  await page.click('[data-testid="task-checkbox"]')
  await expect(page.locator('[data-testid="task-checkbox"]')).toBeChecked()
  
  // 6. Verify completion
  await expect(page.locator('text=1 task completed')).toBeVisible()
})
```

### **Implementation:**

#### **Option 1: Playwright (Khuyến nghị - Modern, Fast)**
```bash
npm install -D @playwright/test
npx playwright install
```

```javascript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
})
```

#### **Option 2: Cypress (Popular, Good DX)**
```bash
npm install -D cypress
npx cypress open
```

```javascript
// cypress/e2e/weekly-planner.cy.js
describe('Weekly Planner', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123')
    cy.visit('/weekly-planner')
  })

  it('should create a task', () => {
    cy.contains('Add Task').click()
    cy.get('[name="title"]').type('Test Task')
    cy.get('[name="description"]').type('E2E test task')
    cy.contains('Save').click()
    cy.contains('Test Task').should('be.visible')
  })
})
```

### **Ưu tiên:**
- **Phase 1** (sau 2 tháng launch): Critical flows (login, payment)
- **Phase 2** (sau 4 tháng): Core features (planner, habits, money)
- **Phase 3** (sau 6 tháng): Edge cases, error scenarios

---

## 📊 4. API Documentation: Swagger / OpenAPI

### **Mục đích:**
- **Developer experience** - Dễ dàng hiểu và sử dụng API
- **Onboarding** - New developers nhanh chóng làm quen
- **Testing** - Test API trực tiếp từ docs
- **Client generation** - Auto-generate TypeScript types, SDK
- **Collaboration** - Frontend/Backend teams sync dễ dàng

### **Khi nào cần:**
- Khi có **nhiều developers** (>2 người)
- Khi có **mobile app** hoặc **third-party integrations**
- Khi API **phức tạp** (>20 endpoints)
- Khi muốn **public API** cho partners

### **Ví dụ thực tế:**

#### **Hiện tại có 30 API routes:**
```
/api/auth/[...nextauth]
/api/auth/register
/api/auth/forgot-password
/api/auth/reset-password
/api/auth/verify-email
/api/weekly-planner
/api/weekly-planner/[id]
/api/goals
/api/goals/[id]
/api/habits
/api/habits/[id]
/api/habits/[id]/log
/api/budgets
/api/budgets/[id]
/api/transactions
/api/transactions/[id]
/api/stripe/create-payment-intent
/api/stripe/webhook
... và nhiều hơn
```

### **Lợi ích cụ thể:**

```yaml
# swagger.yaml
openapi: 3.0.0
info:
  title: Plan Habit Money API
  version: 1.0.0
  description: API for managing tasks, habits, and finances

paths:
  /api/weekly-planner:
    get:
      summary: Get all tasks
      tags: [Weekly Planner]
      security:
        - bearerAuth: []
      parameters:
        - name: date
          in: query
          schema:
            type: string
            format: date
      responses:
        200:
          description: List of tasks
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Task'
    
    post:
      summary: Create a task
      tags: [Weekly Planner]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateTaskInput'
      responses:
        201:
          description: Task created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'

components:
  schemas:
    Task:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        description:
          type: string
        date:
          type: string
          format: date-time
        completed:
          type: boolean
```

### **Implementation:**

#### **Option 1: Swagger UI (Interactive Docs)**
```bash
npm install swagger-ui-react swagger-jsdoc
```

```typescript
// src/app/api-docs/page.tsx
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import swaggerSpec from '@/lib/swagger'

export default function ApiDocs() {
  return <SwaggerUI spec={swaggerSpec} />
}
```

#### **Option 2: OpenAPI Generator (Auto-generate)**
```bash
npm install -D openapi-typescript
npx openapi-typescript swagger.yaml -o src/types/api.ts
```

### **Ưu tiên:**
- **Phase 1** (khi có mobile app): Document core APIs
- **Phase 2** (khi có team >3): Full documentation
- **Phase 3** (khi public API): Interactive playground, SDKs

---

## 📈 Tổng kết Roadmap

| Feature | Thời điểm | Lý do | ROI |
|---------|-----------|-------|-----|
| **React Query** | Sau 1 tháng | Users tăng, API calls tăng | ⭐⭐⭐⭐⭐ |
| **next/image** | Ngay sau launch | Quick win, dễ implement | ⭐⭐⭐⭐ |
| **E2E Tests** | Sau 2 tháng | Khi deploy thường xuyên | ⭐⭐⭐⭐ |
| **API Docs** | Khi có mobile app | Khi cần collaboration | ⭐⭐⭐ |

---

## 💡 Khuyến nghị

### **Implement ngay (Quick Wins):**
1. ✅ **next/image** - 1-2 giờ, cải thiện performance ngay lập tức
2. ✅ **React Query cho Weekly Planner** - 4-6 giờ, giảm API calls 50%

### **Implement sau 1-2 tháng:**
3. ✅ **E2E Tests cho critical flows** - 1-2 ngày, tăng confidence
4. ✅ **React Query cho tất cả modules** - 2-3 ngày, hoàn thiện caching

### **Implement khi cần:**
5. ⏳ **API Documentation** - Khi có mobile app hoặc team >3 người
6. ⏳ **Advanced caching** - Khi có performance issues

---

**Kết luận:** Các tính năng NICE TO HAVE này không cần thiết cho launch, nhưng sẽ **rất quan trọng** khi ứng dụng scale và phát triển. Nên implement dần theo roadmap trên để tối ưu ROI.

