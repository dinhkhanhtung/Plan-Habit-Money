import { Transaction } from '@/app/smart-money/page'

interface TransactionListProps {
  transactions: Transaction[]
  onAddTransaction: () => void
  onEditTransaction: (transaction: Transaction) => void
  onDeleteTransaction: (id: string) => void
}

export default function TransactionList({
  transactions,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction
}: TransactionListProps) {
  return (
    <div className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">Recent Transactions</h3>
        <button
          onClick={onAddTransaction}
          className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer rounded-DEFAULT h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-opacity-90 transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="truncate hidden sm:inline">Add Transaction</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
            <tr>
              <th className="px-6 py-3 font-medium text-text-light-secondary dark:text-text-dark-secondary tracking-wider">Date</th>
              <th className="px-6 py-3 font-medium text-text-light-secondary dark:text-text-dark-secondary tracking-wider">Description</th>
              <th className="px-6 py-3 font-medium text-text-light-secondary dark:text-text-dark-secondary tracking-wider">Category</th>
              <th className="px-6 py-3 font-medium text-text-light-secondary dark:text-text-dark-secondary tracking-wider text-right">Amount</th>
              <th className="px-6 py-3 font-medium text-text-light-secondary dark:text-text-dark-secondary tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border-light dark:border-border-dark">
                <td className="px-6 py-4 whitespace-nowrap text-text-light-primary dark:text-text-dark-primary">
                  {new Date(transaction.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 font-medium text-text-light-primary dark:text-text-dark-primary">{transaction.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.type === 'income'
                      ? 'bg-income/10 text-income'
                      : transaction.category === 'Groceries'
                      ? 'bg-primary/10 text-primary'
                      : transaction.category === 'Transport'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {transaction.category}
                  </span>
                </td>
                <td className={`px-6 py-4 text-right font-semibold ${
                  transaction.type === 'income' ? 'text-income' : 'text-expense'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditTransaction(transaction)}
                      className="p-1 hover:bg-background-light dark:hover:bg-background-dark rounded transition-colors"
                    >
                      <span className="material-symbols-outlined text-base text-text-light-secondary dark:text-text-dark-secondary">edit</span>
                    </button>
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="p-1 hover:bg-background-light dark:hover:bg-background-dark rounded transition-colors"
                    >
                      <span className="material-symbols-outlined text-base text-expense">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}