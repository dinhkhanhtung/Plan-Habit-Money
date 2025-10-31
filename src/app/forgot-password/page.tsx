'use client'

import AuthForm from '@/components/AuthForm'
import { forgotPasswordSchema } from '@/lib/validations/auth'

export default function ForgotPasswordPage() {
  const handleForgotPassword = async (data: any) => {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error)
    }

    alert('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.')
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 items-center justify-center p-4 lg:p-0">
          <div className="layout-content-container flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-xl bg-white dark:bg-background-dark shadow-lg lg:flex-row">
            <div className="relative hidden w-1/2 flex-col items-center justify-center bg-primary/10 p-10 dark:bg-primary/20 lg:flex">
              <div className="w-full max-w-sm">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Khôi phục tài khoản của bạn
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu vào email của bạn.
                </p>
              </div>
              <div className="mt-8 w-full max-w-md">
                <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXesflKVcwbDDM6ZkNnVpJspknA2bn8EeoThKumw0DpxGyqRvyOeFuCQmiWPLnkzhMv6UiV7CFFK7HSM_vEEvxwfr-gXqPMAFvgYU4YHP7seOqqwFRf8EI2yfudlqjrIUYWujZtRTRVZX3P4GbGD1kjykDXUOGuM9lxPz4zfNqFhfW4flsdAX12_8LxaADzuvRinteAc_xvK5c3wJDQU3Gj2k7G0VFTUf53ZNidwABQ0DRrdVAoLqnGOnDJwze_MTzAggxt09jLPU")`
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col justify-center bg-background-light p-8 dark:bg-[#152427] sm:p-12 lg:w-1/2">
              <div className="flex w-full flex-col items-center">
                <span className="material-symbols-outlined text-5xl text-primary">lock_reset</span>
              </div>
              <AuthForm
                type="forgot-password"
                schema={forgotPasswordSchema}
                onSubmit={handleForgotPassword}
                title="Quên mật khẩu"
                submitButtonText="Gửi email đặt lại mật khẩu"
                alternativeLink={{
                  text: 'Nhớ mật khẩu? ',
                  href: '/login',
                  linkText: 'Đăng nhập'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}