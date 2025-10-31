export default function SmartMoneyWidget() {
  const transactions = [
    { title: 'Ăn trưa', amount: '-50.000₫', type: 'expense' },
    { title: 'Cà phê', amount: '-35.000₫', type: 'expense' },
    { title: 'Tiền lương', amount: '+15.000.000₫', type: 'income' },
  ]

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-900/40 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-none border border-transparent dark:border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tài chính Thông minh</h3>
        <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
      </div>
      <div className="flex flex-col items-start bg-primary/20 dark:bg-primary/30 p-4 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">Ngân sách tháng này</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">4.500.000₫</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">còn lại</p>
      </div>
      <div className="flex flex-col">
        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Giao dịch gần đây</h4>
        {transactions.map((transaction, index) => (
          <div key={index} className={`flex justify-between items-center py-2 ${index < transactions.length - 1 ? 'border-b border-gray-200/60 dark:border-white/10' : ''}`}>
            <p className="text-gray-700 dark:text-gray-300">{transaction.title}</p>
            <p className={`font-medium ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>{transaction.amount}</p>
          </div>
        ))}
      </div>
      <button className="mt-auto flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-gray-900 text-sm font-medium leading-normal">
        Quản lý Tài chính
      </button>
    </div>
  )
}