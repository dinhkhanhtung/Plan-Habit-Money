'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'Weekly Planner', href: '/weekly-planner', icon: 'calendar_month' },
  { name: 'Habit Tracker', href: '/habit-tracker', icon: 'check_circle' },
  { name: 'Smart Money', href: '/smart-money', icon: 'account_balance_wallet' },
  { name: 'Settings', href: '/settings', icon: 'settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col bg-white dark:bg-background-dark border-r border-gray-200/60 dark:border-white/10 p-4 md:translate-x-0 translate-x-[-100%] transition-transform duration-300 ease-in-out fixed md:relative inset-y-0 left-0 z-50 md:z-auto">
      <div className="flex items-center gap-2.5 p-3 mb-4">
        <div className="size-8 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Prodash</h1>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBx0H-uYgknrxaNL7rhD81STeCLyGJg-hFXXQofXQaM-w0lMtAv1BJFcPwCqX63wbhP-gApBUrELGWIZXAP0d1hmrVsnbQmh7GCzp9X82GKpzEMpaga5DdUjhkBQOhJeDktuepw_npUEGQYxa0_mMMziGt6VWlbHBMxqpTirPj_lQsXdpe7y_fdhEq63_1PqOKabDoo0wAvTH9Yt0-YJXzP6l0FRZvIY_UIpuM-pAkJT3dqsLj4fiFF73ObGjUsc0jBdBZ3fxBfoL4")' }}></div>
          <div className="flex flex-col">
            <h1 className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal">Minh Anh</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">minhanh@email.com</p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              pathname === item.href
                ? 'bg-primary/20 dark:bg-primary/30'
                : 'hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            <span className={`material-symbols-outlined ${
              pathname === item.href ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {item.icon}
            </span>
            <p className={`text-sm font-medium leading-normal ${
              pathname === item.href ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {item.name}
            </p>
          </Link>
        ))}
      </nav>
    </aside>
  )
}