import { Budget } from '@/app/smart-money/page'

interface BudgetProgressProps {
  budgets: Budget[]
}

export default function BudgetProgress({ budgets }: BudgetProgressProps) {
  return (
    <div className="rounded-lg p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <h3 className="text-lg font-bold mb-4 text-text-light-primary dark:text-text-dark-primary">Budget Progress</h3>
      <div className="flex flex-col gap-4">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.limit) * 100)
          const isOverBudget = percentage > 100

          return (
            <div key={budget.id}>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-text-light-primary dark:text-text-dark-primary">{budget.category}</span>
                <span className={`text-text-light-secondary dark:text-text-dark-secondary ${isOverBudget ? 'text-expense' : ''}`}>
                  ${budget.spent} / ${budget.limit}
                </span>
              </div>
              <div className="w-full bg-background-light dark:bg-background-dark rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${isOverBudget ? 'bg-expense' : 'bg-primary'}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                {percentage}% used
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}