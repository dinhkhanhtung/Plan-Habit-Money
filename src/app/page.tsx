'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If user is authenticated, redirect to dashboard
  if (session) {
    router.push('/dashboard');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="size-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Prodash</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Đăng ký
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-1 items-center justify-center p-4 lg:p-0">
          <div className="layout-content-container flex w-full max-w-6xl flex-1 flex-col overflow-hidden lg:flex-row">
            {/* Left side - Content */}
            <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-1/2">
              <div className="flex w-full flex-col items-start">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white pb-6">
                  Quản lý Tuần, Theo dõi Thói quen, Làm chủ Tài chính.
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 pb-8">
                  Công cụ tất cả trong một giúp bạn sắp xếp cuộc sống và đạt được mục tiêu của mình.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/register"
                    className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors text-center font-medium"
                  >
                    Bắt đầu ngay
                  </Link>
                  <Link
                    href="/login"
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center font-medium"
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative hidden w-1/2 flex-col items-center justify-center p-10 lg:flex">
              <div className="w-full max-w-md">
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
          </div>
        </div>
      </div>
    </div>
  );
}
