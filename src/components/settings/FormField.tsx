interface FormFieldProps {
  label: string
  type?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  className?: string
}

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = ""
}: FormFieldProps) {
  return (
    <label className={`flex flex-col ${className}`}>
      <p className="text-base font-medium leading-normal pb-2">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${
          error ? 'border-danger' : 'border-border-light dark:border-border-dark'
        } bg-background-light dark:bg-background-dark h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      />
      {error && (
        <p className="text-danger text-sm mt-1">{error}</p>
      )}
    </label>
  )
}
