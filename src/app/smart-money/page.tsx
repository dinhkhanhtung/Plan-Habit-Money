'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import FinancialSummaryCards from '@/components/smart-money/FinancialSummaryCards'
import ChartComponent from '@/components/smart-money/ChartComponent'
import BudgetProgress from '@/components/smart-money/BudgetProgress'
import TransactionList from '@/components/smart-money/TransactionList'
import TransactionModal from '@/components/smart-money/TransactionModal'

export interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
}

export interface Budget {
  id: string
  category: string
  limit: number
  spent: number
}

export default function SmartMoneyPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2023-10-26',
      description: 'Monthly Salary',
      category: 'Income',
      amount: 2900,
      type: 'income'
    },
    {
      id: '2',
      date: '2023-10-25',
      description: 'SuperMart Grocery',
      category: 'Groceries',
      amount: -85.40,
      type: 'expense'
    },
    {
      id: '3',
      date: '2023-10-24',
      description: 'Gas Station',
      category: 'Transport',
      amount: -45.00,
      type: 'expense'
    },
    {
      id: '4',
      date: '2023-10-22',
      description: 'The Corner Cafe',
      category: 'Dining Out',
      amount: -24.80,
      type: 'expense'
    },
    {
      id: '5',
      date: '2023-10-21',
      description: 'Freelance Project Payment',
      category: 'Income',
      amount: 500,
      type: 'income'
    }
  ])

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      category: 'Groceries',
      limit: 500,
      spent: 350
    },
    {
      id: '2',
      category: 'Dining Out',
      limit: 200,
      spent: 180
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [timeFilter, setTimeFilter] = useState('this-month')

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  const handleEditTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const updatedTransaction: Transaction = {
      ...transaction,
      id: editingTransaction?.id || Date.now().toString()
    }
    setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t))
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const handleOpenModal = (transaction?: Transaction) => {
    setEditingTransaction(transaction || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  // Calculate financial data
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))
  const currentBalance = totalIncome - totalExpenses
  const netSavings = totalIncome - totalExpenses

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Smart Money" />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-text-light-primary dark:text-text-dark-primary">
                  Smart Money Dashboard
                </h1>
                <p className="text-base font-normal text-text-light-secondary dark:text-text-dark-secondary mt-1">
                  Here's a comprehensive overview of your financial health.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-DEFAULT text-sm font-bold bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                  <span>Budgets</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-DEFAULT text-sm font-bold bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors">
                  <span className="material-symbols-outlined">summarize</span>
                  <span>Reports</span>
                </button>
              </div>
            </div>

            {/* Time Filter */}
            <div className="flex gap-2 mb-6">
              <button className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-DEFAULT pl-4 pr-3 ${
                timeFilter === 'this-month' ? 'bg-primary/20 text-primary' : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark'
              }`}>
                <p className="text-sm font-medium">This Month</p>
                <span className="material-symbols-outlined">expand_more</span>
              </button>
              <button className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-DEFAULT bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark pl-4 pr-3 ${
                timeFilter === 'last-90-days' ? 'bg-primary/20 text-primary' : ''
              }`}>
                <p className="text-sm font-medium">Last 90 Days</p>
              </button>
              <button className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-DEFAULT bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark pl-4 pr-3 ${
                timeFilter === 'this-year' ? 'bg-primary/20 text-primary' : ''
              }`}>
                <p className="text-sm font-medium">This Year</p>
              </button>
            </div>

            {/* Financial Summary Cards */}
            <FinancialSummaryCards
              currentBalance={currentBalance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              netSavings={netSavings}
            />

            {/* Charts and Budget Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <ChartComponent
                title="Income vs. Expense"
                type="bar"
                data={transactions}
                className="lg:col-span-2"
              />
              <div className="flex flex-col gap-6">
                <ChartComponent
                  title="Spending by Category"
                  type="donut"
                  data={transactions.filter(t => t.type === 'expense')}
                />
                <BudgetProgress budgets={budgets} />
              </div>
            </div>

            {/* Transaction List */}
            <TransactionList
              transactions={transactions}
              onAddTransaction={() => handleOpenModal()}
              onEditTransaction={handleOpenModal}
              onDeleteTransaction={handleDeleteTransaction}
            />

            {/* Transaction Modal */}
            {isModalOpen && (
              <TransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
                transaction={editingTransaction}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}