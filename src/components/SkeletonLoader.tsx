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

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
        {[...Array(4)].map((_, i) => (
          <SkeletonLoader key={i} height="h-4" width="w-24" />
        ))}
      </div>
      {/* Table Rows */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
          {[...Array(4)].map((_, j) => (
            <SkeletonLoader key={j} height="h-4" width="w-24" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="w-full h-64 bg-white dark:bg-gray-900/40 rounded-xl p-6 border border-gray-200 dark:border-white/10">
      <SkeletonLoader height="h-6" width="w-32" className="mb-4" />
      <div className="flex items-end justify-between h-48 gap-2">
        {[...Array(7)].map((_, i) => (
          <SkeletonLoader
            key={i}
            height={`h-${Math.floor(Math.random() * 40) + 10}`}
            width="w-full"
          />
        ))}
      </div>
    </div>
  )
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(items)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900/40 rounded-lg border border-gray-200 dark:border-white/10">
          <SkeletonLoader height="h-12" width="w-12" className="rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader height="h-4" width="w-48" />
            <SkeletonLoader height="h-3" width="w-32" />
          </div>
          <SkeletonLoader height="h-8" width="w-20" className="rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export function CalendarSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900/40 rounded-xl p-6 border border-gray-200 dark:border-white/10">
      <div className="flex items-center justify-between mb-6">
        <SkeletonLoader height="h-6" width="w-32" />
        <div className="flex gap-2">
          <SkeletonLoader height="h-8" width="w-8" className="rounded-lg" />
          <SkeletonLoader height="h-8" width="w-8" className="rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(35)].map((_, i) => (
          <SkeletonLoader key={i} height="h-16" width="w-full" className="rounded-lg" />
        ))}
      </div>
    </div>
  )
}

export function ButtonSkeleton() {
  return <SkeletonLoader height="h-10" width="w-24" className="rounded-lg" />
}