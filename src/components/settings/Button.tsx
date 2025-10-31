interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = "",
  type = 'button'
}: ButtonProps) {
  const baseClasses = "flex items-center justify-center overflow-hidden rounded-lg font-bold leading-normal tracking-[0.015em] transition-colors"

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90 disabled:opacity-50",
    secondary: "bg-transparent text-text-light dark:text-text-dark border border-border-light dark:border-border-dark hover:bg-primary/10 dark:hover:bg-primary/20",
    danger: "bg-danger text-white hover:bg-danger/90 disabled:opacity-50"
  }

  const sizeClasses = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {loading && (
        <span className="material-symbols-outlined animate-spin mr-2 text-sm">refresh</span>
      )}
      {children}
    </button>
  )
}