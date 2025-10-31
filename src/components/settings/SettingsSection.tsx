interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export default function SettingsSection({
  title,
  description,
  children,
  className = ""
}: SettingsSectionProps) {
  return (
    <section className={`p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark ${className}`}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-sm text-subtext-light dark:text-subtext-dark">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}