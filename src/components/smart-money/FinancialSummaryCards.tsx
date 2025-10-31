interface FinancialSummaryCardsProps {
  currentBalance: number
  totalIncome: number
  totalExpenses: number
  netSavings: number
}

export default function FinancialSummaryCards({
  currentBalance,
  totalIncome,
  totalExpenses,
  netSavings
}: FinancialSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="flex flex-col gap-2 rounded-lg p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <p className="text-base font-medium text-text-light-secondary dark:text-text-dark-secondary">Current Balance</p>
        <p className="tracking-tight text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
          ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-income text-sm font-medium flex items-center">
          <span className="material-symbols-outlined text-base">trending_up</span>
          +2.5%
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-lg p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <p className="text-base font-medium text-text-light-secondary dark:text-text-dark-secondary">Total Income (Month)</p>
        <p className="tracking-tight text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
          ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-income text-sm font-medium flex items-center">
          <span className="material-symbols-outlined text-base">trending_up</span>
          +5.2%
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-lg p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <p className="text-base font-medium text-text-light-secondary dark:text-text-dark-secondary">Total Expenses (Month)</p>
        <p className="tracking-tight text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
          ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-expense text-sm font-medium flex items-center">
          <span className="material-symbols-outlined text-base">trending_down</span>
          -1.8%
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-lg p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <p className="text-base font-medium text-text-light-secondary dark:text-text-dark-secondary">Net Savings</p>
        <p className="tracking-tight text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
          ${netSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-income text-sm font-medium flex items-center">
          <span className="material-symbols-outlined text-base">trending_up</span>
          +10.1%
        </p>
      </div>
    </div>
  )
}