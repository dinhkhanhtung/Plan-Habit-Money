'use client'

import AuthForm from '@/components/AuthForm'
import { registerSchema } from '@/lib/validations/auth'
import bcrypt from 'bcryptjs'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const handleRegister = async (data: any) => {
    const { confirmPassword, ...userData } = data

    const hashedPassword = await bcrypt.hash(userData.password, 12)

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        passwordHash: hashedPassword,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error)
    }

    // Redirect to login or auto-login
    window.location.href = '/login?message=Registration successful'
  }

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 items-center justify-center p-4 lg:p-0">
          <div className="layout-content-container flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-xl bg-white dark:bg-background-dark shadow-lg lg:flex-row">
            <div className="relative hidden w-1/2 flex-col items-center justify-center bg-primary/10 p-10 dark:bg-primary/20 lg:flex">
              <div className="w-full max-w-sm">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Quản lý Tuần, Theo dõi Thói quen, Làm chủ Tài chính.
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Công cụ tất cả trong một giúp bạn sắp xếp cuộc sống và đạt được mục tiêu của mình.
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
            <div className="flex w-full flex-col justify-center bg-background-light p-8 dark:bg-background-dark sm:p-12 lg:w-1/2">
              <div className="flex w-full flex-col items-center">
                <span className="material-symbols-outlined text-5xl text-primary">task_alt</span>
              </div>
              <AuthForm
                type="register"
                schema={registerSchema}
                onSubmit={handleRegister}
                title="Tạo tài khoản mới"
                submitButtonText="Đăng ký"
                alternativeLink={{
                  text: 'Đã có tài khoản? ',
                  href: '/login',
                  linkText: 'Đăng nhập'
                }}
              />
              <div className="relative my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                <span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">hoặc</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
              </div>
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 text-base font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-background-dark mb-4"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5777 12.2714C22.5777 11.4514 22.5077 10.6514 22.3877 9.87141H12.2277V14.3514H18.1577C17.9077 15.9314 17.0277 17.2914 15.6377 18.2614V21.1014H19.5877C21.6177 19.2414 22.5777 16.1414 22.5777 12.2714Z" fill="#4285F4" />
                  <path d="M12.2276 23.0014C15.1576 23.0014 17.6176 22.0314 19.5876 20.4014L15.6376 17.5614C14.6576 18.2314 13.5176 18.6614 12.2276 18.6614C9.7276 18.6614 7.6176 17.0314 6.8476 14.8114H2.7876V17.7414C4.7576 20.9314 8.2176 23.0014 12.2276 23.0014Z" fill="#34A853" />
                  <path d="M6.84755 14.8113C6.58755 14.0713 6.42755 13.2813 6.42755 12.4513C6.42755 11.6213 6.58755 10.8313 6.84755 10.0913V7.16129H2.78755C1.94755 8.79129 1.94755 10.5713 1.94755 12.4513C1.94755 14.3313 1.94755 16.1113 2.78755 17.7413L6.84755 14.8113Z" fill="#FBBC05" />
                  <path d="M12.2276 6.24127C13.6676 6.24127 14.9476 6.74127 15.9876 7.72127L19.6676 4.09127C17.6176 2.18127 15.1576 1.10127 12.2276 1.10127C8.2176 1.10127 4.7576 3.17127 2.7876 6.36127L6.8476 9.29127C7.6176 7.07127 9.7276 6.24127 12.2276 6.24127Z" fill="#EA4335" />
                </svg>
                <span>Đăng ký với Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
