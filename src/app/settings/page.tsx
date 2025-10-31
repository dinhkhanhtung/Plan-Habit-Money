'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import SettingsSection from '@/components/settings/SettingsSection'
import FormField from '@/components/settings/FormField'
import Button from '@/components/settings/Button'
import ToggleSwitch from '@/components/settings/ToggleSwitch'
import NotificationItem from '@/components/settings/NotificationItem'
import { useSubscriptionStatus } from '@/hooks/useSubscriptionStatus'
import CountdownTimer from '@/components/expiration/CountdownTimer'
import QuickRenewalButton from '@/components/expiration/QuickRenewalButton'

export default function SettingsPage() {
  const { data: session } = useSession()
  const [activeSection, setActiveSection] = useState('personal')

  const navigation = [
    { id: 'personal', name: 'Thông tin cá nhân', icon: 'person' },
    { id: 'subscription', name: 'Đăng ký & Thanh toán', icon: 'credit_card' },
    { id: 'notifications', name: 'Thông báo', icon: 'notifications' },
    { id: 'security', name: 'Bảo mật', icon: 'shield' },
    { id: 'language', name: 'Ngôn ngữ & Giao diện', icon: 'language' },
    { id: 'export', name: 'Xuất dữ liệu', icon: 'download' },
  ]

  return (
    <div className="relative flex h-screen w-full flex-col">
      <div className="flex h-full grow">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <div className="w-full max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">Cài đặt tài khoản</h1>
            </header>
            <div className="flex gap-8">
              {/* Navigation Sidebar */}
              <div className="w-64 flex-shrink-0">
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                        activeSection === item.id
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-primary/10 dark:hover:bg-primary/20'
                      }`}
                    >
                      <span className={`material-symbols-outlined ${
                        activeSection === item.id ? 'fill' : ''
                      }`}>
                        {item.icon}
                      </span>
                      <p className="text-sm font-medium leading-normal">{item.name}</p>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1">
                {activeSection === 'personal' && <PersonalInformationSection />}
                {activeSection === 'subscription' && <SubscriptionSection />}
                {activeSection === 'notifications' && <NotificationsSection />}
                {activeSection === 'security' && <SecuritySection />}
                {activeSection === 'language' && <LanguageAppearanceSection />}
                {activeSection === 'export' && <DataExportSection />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Section components
function PersonalInformationSection() {
  const [name, setName] = useState('Minh Anh')
  const [email] = useState('minhanh@email.com')
  const [profilePicture, setProfilePicture] = useState('')

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving personal info:', { name, profilePicture })
  }

  const handleCancel = () => {
    // Reset to original values
    setName('Minh Anh')
    setProfilePicture('')
  }

  return (
    <SettingsSection title="Thông tin cá nhân">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 @container md:flex-row md:items-center">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24 border-2 border-primary/20" style={{
              backgroundImage: profilePicture ? `url(${profilePicture})` : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUopwTp6WSOk7mXQEQiBBB-jwoZFbdA5_oElC8nHezBehUZlRWurukHfNvWUfRZflk68A8eLf3L0I_Gwg3ryxmdlwuwY6vglKcO0J6g7xTQRBGlobk9L96oGaLuibO412HdTLgcP0GWZdfLVblZf3Sqr6AGkyhpuXDsF01p98DRvTugrqF1nVXvqAIrlWm6NzQm5FpiHtICLPKOMcrNMnc0EGbJEwhb_G18D3kYyv1qk1G715Y2W79BWovWYHzQAuSjwF0FB8")'
            }}></div>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold">Ảnh đại diện</p>
              <p className="text-sm text-subtext-light dark:text-subtext-dark">Tải lên ảnh PNG, JPG. Tối đa 800Kb.</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">
            Thay đổi
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <FormField
            label="Họ và tên"
            value={name}
            onChange={setName}
          />
          <FormField
            label="Địa chỉ email"
            value={email}
            disabled={true}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border-light dark:border-border-dark">
        <Button variant="secondary" onClick={handleCancel}>
          Hủy
        </Button>
        <Button onClick={handleSave}>
          Lưu thay đổi
        </Button>
      </div>
    </SettingsSection>
  )
}

function SubscriptionSection() {
  const { daysRemaining, isExpiringSoon } = useSubscriptionStatus();

  return (
    <div className="space-y-12">
      {/* Expiration Alert */}
      {isExpiringSoon && (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">warning</span>
              <div>
                <p className="text-amber-800 dark:text-amber-200 font-medium">
                  Your subscription expires soon
                </p>
                <CountdownTimer daysRemaining={daysRemaining} className="mt-1" />
              </div>
            </div>
            <QuickRenewalButton variant="banner" size="sm" />
          </div>
        </div>
      )}

      <SettingsSection title="Gói đăng ký hiện tại">
        <div className="p-4 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-bold text-primary">Gói Pro</p>
            <p className="text-sm text-subtext-light dark:text-subtext-dark">Gia hạn vào ngày 25 tháng 12, 2024</p>
          </div>
          <Button variant="secondary" size="sm">
            Quản lý gói
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection title="Phương thức thanh toán">
        <div className="p-4 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img alt="Visa card icon" className="w-10 h-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf24_RwDCZ1_UesEk-slwf5EWXQ-FXKsdYAntEuo5jQjua_CduebPe94FkvF1hIPzD2w6pZZIsHeYRTFf0BB8gbUpmKneAtoQP_s9bYScdCdnTK6idV1WfYzC3LXdLhr0rwYLewcWrMDjM6St6ZX0G8DsrUuGBk19uMyaUM_liBeETFdQsbhfAeRpyUuDt9tTOgCZvZ3HzKmeRloeFyHtm0ocPjAUQqoBA9lpJpYV76TMEQO5-ig87qyKWIB1eYsuyjXaXTvlJ1yU"/>
            <div>
              <p className="font-medium">Visa kết thúc bằng 4242</p>
              <p className="text-sm text-subtext-light dark:text-subtext-dark">Hết hạn 12/2025</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">
            Cập nhật
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection title="Tự động gia hạn">
        <div className="flex items-center justify-between p-4 rounded-lg bg-background-light dark:bg-background-dark">
          <div>
            <h4 className="font-medium">Bật tự động gia hạn</h4>
            <p className="text-sm text-subtext-light dark:text-subtext-dark">Tài khoản của bạn sẽ tự động được gia hạn.</p>
          </div>
          <ToggleSwitch checked={true} onChange={() => {}} />
        </div>
      </SettingsSection>

      <SettingsSection title="Lịch sử thanh toán">
        <div className="flow-root">
          <ul className="divide-y divide-border-light dark:divide-border-dark" role="list">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-success">receipt_long</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Gói Pro - Thanh toán hàng năm</p>
                  <p className="text-sm text-subtext-light dark:text-subtext-dark truncate">25 tháng 12, 2023</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold">1.200.000đ</div>
                <a className="ml-4 text-primary hover:underline text-sm font-medium" href="#">Tải về</a>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-success">receipt_long</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Gói Pro - Thanh toán hàng năm</p>
                  <p className="text-sm text-subtext-light dark:text-subtext-dark truncate">25 tháng 12, 2022</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold">1.000.000đ</div>
                <a className="ml-4 text-primary hover:underline text-sm font-medium" href="#">Tải về</a>
              </div>
            </li>
          </ul>
        </div>
      </SettingsSection>
    </div>
  )
}

function NotificationsSection() {
  const [notifications, setNotifications] = useState({
    weeklyReminders: true,
    habitCompletion: true,
    budgetThreshold: false,
  })

  const handleNotificationChange = (key: keyof typeof notifications) => (enabled: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: enabled }))
  }

  return (
    <SettingsSection title="Thông báo">
      <div className="space-y-4">
        <NotificationItem
          title="Nhắc nhở kế hoạch tuần"
          description="Gửi thông báo về các sự kiện sắp tới."
          enabled={notifications.weeklyReminders}
          onChange={handleNotificationChange('weeklyReminders')}
        />
        <NotificationItem
          title="Cảnh báo hoàn thành thói quen"
          description="Thông báo khi bạn hoàn thành một mục tiêu."
          enabled={notifications.habitCompletion}
          onChange={handleNotificationChange('habitCompletion')}
        />
        <NotificationItem
          title="Cảnh báo ngưỡng ngân sách"
          description="Nhận cảnh báo khi chi tiêu gần đến giới hạn."
          enabled={notifications.budgetThreshold}
          onChange={handleNotificationChange('budgetThreshold')}
        />
      </div>
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border-light dark:border-border-dark">
        <Button variant="secondary" disabled={true}>
          Hủy
        </Button>
        <Button disabled={true}>
          Lưu thay đổi
        </Button>
      </div>
    </SettingsSection>
  )
}

function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = () => {
    // TODO: Implement password change
    console.log('Changing password')
  }

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Deleting account')
  }

  return (
    <div className="space-y-8">
      <SettingsSection title="Đổi mật khẩu">
        <div className="space-y-4">
          <FormField
            label="Mật khẩu hiện tại"
            type="password"
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="••••••••"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Mật khẩu mới"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="••••••••"
            />
            <FormField
              label="Xác nhận mật khẩu mới"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleChangePassword}>
            Đổi mật khẩu
          </Button>
        </div>
      </SettingsSection>

      <div className="mt-8 pt-8 border-t border-danger/50">
        <h3 className="font-bold text-danger">Xóa tài khoản</h3>
        <p className="text-sm text-subtext-light dark:text-subtext-dark mt-2">Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.</p>
        <div className="mt-4">
          <Button variant="danger" onClick={handleDeleteAccount}>
            Xóa tài khoản của tôi
          </Button>
        </div>
      </div>
    </div>
  )
}

function LanguageAppearanceSection() {
  const [language, setLanguage] = useState('vi')
  const [theme, setTheme] = useState('light')

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving language and appearance:', { language, theme })
  }

  const handleCancel = () => {
    // Reset to original values
    setLanguage('vi')
    setTheme('light')
  }

  return (
    <SettingsSection title="Ngôn ngữ & Giao diện">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="flex flex-col">
            <p className="text-base font-medium leading-normal pb-2">Ngôn ngữ</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-12 px-4"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col">
          <p className="text-base font-medium leading-normal pb-2">Giao diện</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-lg border-2 ${
                theme === 'light' ? 'border-primary bg-primary/10 text-primary' : 'border-border-light dark:border-border-dark bg-transparent'
              }`}
            >
              <span className="material-symbols-outlined">light_mode</span>
              Sáng
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-lg border-2 ${
                theme === 'dark' ? 'border-primary bg-primary/10 text-primary' : 'border-border-light dark:border-border-dark bg-transparent'
              }`}
            >
              <span className="material-symbols-outlined">dark_mode</span>
              Tối
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border-light dark:border-border-dark">
        <Button variant="secondary" onClick={handleCancel}>
          Hủy
        </Button>
        <Button onClick={handleSave}>
          Lưu thay đổi
        </Button>
      </div>
    </SettingsSection>
  )
}

function DataExportSection() {
  const [format, setFormat] = useState('csv')

  const handleExport = () => {
    // TODO: Implement data export
    console.log('Exporting data in format:', format)
  }

  return (
    <SettingsSection
      title="Xuất dữ liệu cá nhân"
      description="Bạn có thể yêu cầu một bản sao dữ liệu cá nhân của mình. Thao tác này có thể mất một chút thời gian để chuẩn bị tệp tải xuống của bạn."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="flex flex-col">
            <p className="text-base font-medium leading-normal pb-2">Định dạng tệp</p>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark h-12 px-4"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex justify-end mt-8 pt-6 border-t border-border-light dark:border-border-dark">
        <Button onClick={handleExport}>
          <span className="material-symbols-outlined text-base mr-2">download</span>
          <span>Xuất dữ liệu</span>
        </Button>
      </div>
    </SettingsSection>
  )
}