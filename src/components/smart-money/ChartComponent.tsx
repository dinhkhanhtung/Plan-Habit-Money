import { Transaction } from '@/app/smart-money/page'

interface ChartComponentProps {
  title: string
  type: 'bar' | 'donut'
  data: Transaction[]
  className?: string
}

export default function ChartComponent({ title, type, data, className }: ChartComponentProps) {
  if (type === 'bar') {
    // Mock bar chart for income vs expense
    return (
      <div className={`rounded-lg p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark ${className}`}>
        <h3 className="text-lg font-bold mb-4 text-text-light-primary dark:text-text-dark-primary">{title}</h3>
        <div className="h-80 flex items-end justify-center">
          <div className="text-center">
            <div className="text-6xl text-primary mb-4">
              <span className="material-symbols-outlined">bar_chart</span>
            </div>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Bar chart visualization for {title.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'donut') {
    // Mock donut chart for spending by category
    return (
      <div className={`rounded-lg p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark ${className}`}>
        <h3 className="text-lg font-bold mb-4 text-text-light-primary dark:text-text-dark-primary">{title}</h3>
        <div className="h-40 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl text-primary mb-2">
              <span className="material-symbols-outlined">donut_large</span>
            </div>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Donut chart for spending categories
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}