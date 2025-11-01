import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClientLayout } from './client-layout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plan Habit Money',
  description: 'Quản lý Tuần, Theo dõi Thói quen, Làm chủ Tài chính',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" rel="stylesheet"/>
      </head>
      <body className="font-display antialiased bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}