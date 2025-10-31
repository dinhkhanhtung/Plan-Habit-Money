import React from 'react'

interface SkeletonLoaderProps {
  className?: string
  height?: string
  width?: string
}

export function SkeletonLoader({ className = '', height = 'h-4', width = 'w-full' }: SkeletonLoaderProps) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${height} ${width} ${className}`} />
  )
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-900/40 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-none border border-transparent dark:border-white/10">
      <div className="flex items-center justify-between">
        <SkeletonLoader height="h-6" width="w-32" />
        <SkeletonLoader height="h-6" width="w-6" className="rounded-full" />
      </div>
      <SkeletonLoader height="h-4" width="w-48" />
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <SkeletonLoader height="h-10" width="w-10" className="rounded-lg" />
            <div className="flex-1 space-y-2">
              <SkeletonLoader height="h-4" width="w-24" />
              <SkeletonLoader height="h-3" width="w-16" />
            </div>
          </div>
        ))}
      </div>
      <SkeletonLoader height="h-10" width="w-full" className="rounded-lg" />
    </div>
  )
}