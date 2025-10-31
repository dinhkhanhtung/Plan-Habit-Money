import ToggleSwitch from './ToggleSwitch'

interface NotificationItemProps {
  title: string
  description: string
  enabled: boolean
  onChange: (enabled: boolean) => void
  disabled?: boolean
}

export default function NotificationItem({
  title,
  description,
  enabled,
  onChange,
  disabled = false
}: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-background-light dark:bg-background-dark">
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-subtext-light dark:text-subtext-dark">{description}</p>
      </div>
      <ToggleSwitch
        checked={enabled}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}