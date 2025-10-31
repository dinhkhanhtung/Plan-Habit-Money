'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface AuthFormProps {
  type: 'login' | 'register' | 'forgot-password'
  schema: z.ZodSchema<any>
  onSubmit: (data: any) => Promise<void>
  title: string
  submitButtonText: string
  alternativeLink?: {
    text: string
    href: string
    linkText: string
  }
}

export default function AuthForm({ type, schema, onSubmit, title, submitButtonText, alternativeLink }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema as any),
  })

  const submitHandler = async (data: any) => {
    setLoading(true)
    setError('')

    try {
      if (type === 'login') {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (result?.error) {
          setError('Email hoặc mật khẩu không đúng')
        } else {
          router.push('/')
        }
      } else {
        await onSubmit(data)
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white pb-3 pt-6">
        {title}
      </h1>

      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4 py-3">
        {type === 'register' && (
          <label className="flex flex-col flex-1">
            <p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">Tên</p>
            <input
              {...register('name')}
              className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary"
              placeholder="Nhập tên của bạn"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message as string}</span>}
          </label>
        )}

        <label className="flex flex-col flex-1">
          <p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
            {type === 'forgot-password' ? 'Email' : 'Email hoặc Tên đăng nhập'}
          </p>
          <input
            {...register('email')}
            type="email"
            className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary"
            placeholder={type === 'forgot-password' ? 'Nhập email của bạn' : 'Nhập email hoặc tên đăng nhập'}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message as string}</span>}
        </label>

        {(type === 'login' || type === 'register') && (
          <>
            <label className="flex flex-col flex-1">
              <p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">Mật khẩu</p>
              <div className="flex w-full flex-1 items-stretch">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg border border-r-0 border-gray-300 bg-white p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex cursor-pointer items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-white px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
            </label>

            {type === 'register' && (
              <label className="flex flex-col flex-1">
                <p className="pb-2 text-sm font-medium text-gray-800 dark:text-gray-200">Xác nhận mật khẩu</p>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="form-input flex h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary"
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message as string}</span>}
              </label>
            )}
          </>
        )}

        {type === 'login' && (
          <div className="flex items-center justify-end">
            <a className="text-sm font-medium text-primary hover:underline" href="/forgot-password">
              Quên mật khẩu?
            </a>
          </div>
        )}

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-50"
        >
          {loading ? 'Đang xử lý...' : submitButtonText}
        </button>
      </form>

      {alternativeLink && (
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          {alternativeLink.text}
          <a className="font-semibold text-primary hover:underline" href={alternativeLink.href}>
            {alternativeLink.linkText}
          </a>
        </p>
      )}
    </div>
  )
}