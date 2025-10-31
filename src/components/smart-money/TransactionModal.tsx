'use client'

import { useState, useEffect } from 'react'
import { Transaction } from '@/app/smart-money/page'

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (transaction: Transaction | Omit<Transaction, 'id'>) => void
  transaction?: Transaction | null
}

const categories = [
  { value: 'Income', label: 'Income', type: 'income' },
  { value: 'Groceries', label: 'Groceries', type: 'expense' },
  { value: 'Transport', label: 'Transport', type: 'expense' },
  { value: 'Dining Out', label: 'Dining Out', type: 'expense' },
  { value: 'Entertainment', label: 'Entertainment', type: 'expense' },
  { value: 'Utilities', label: 'Utilities', type: 'expense' },
  { value: 'Healthcare', label: 'Healthcare', type: 'expense' },
  { value: 'Shopping', label: 'Shopping', type: 'expense' },
  { value: 'Other', label: 'Other', type: 'expense' }
]

export default function TransactionModal({
  isOpen,
  onClose,
  onSubmit,
  transaction
}: TransactionModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
    type: 'expense' as 'income' | 'expense'
  })

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        amount: Math.abs(transaction.amount).toString(),
        type: transaction.type
      })
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        amount: '',
        type: 'expense'
      })
    }
  }, [transaction])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount')
      return
    }

    const transactionData = {
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: formData.type === 'expense' ? -amount : amount,
      type: formData.type
    }

    if (transaction) {
      onSubmit({ ...transaction, ...transactionData })
    } else {
      onSubmit(transactionData)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-DEFAULT bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-DEFAULT bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary"
              placeholder="Enter transaction description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                const selectedCategory = categories.find(cat => cat.value === e.target.value)
                setFormData(prev => ({
                  ...prev,
                  category: e.target.value,
                  type: selectedCategory?.type as 'income' | 'expense' || 'expense'
                }))
              }}
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-DEFAULT bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary"
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-1">
              Amount
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-DEFAULT bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border-light dark:border-border-dark rounded-DEFAULT text-text-light-primary dark:text-text-dark-primary hover:bg-background-light dark:hover:bg-background-dark transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-DEFAULT hover:bg-opacity-90 transition-colors"
            >
              {transaction ? 'Update' : 'Add'} Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}