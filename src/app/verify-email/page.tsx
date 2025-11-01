'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token không hợp lệ');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Email của bạn đã được xác thực thành công!');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Xác thực email thất bại');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-card-dark rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="size-16 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Xác thực Email
        </h1>

        {/* Loading State */}
        {status === 'loading' && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Đang xác thực email của bạn...
            </p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400">
                check_circle
              </span>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {message}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Bạn sẽ được chuyển đến trang đăng nhập trong giây lát...
            </p>
            <Link
              href="/login"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <span className="material-symbols-outlined text-4xl text-red-600 dark:text-red-400">
                error
              </span>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Xác thực thất bại
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Quay lại đăng nhập
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

