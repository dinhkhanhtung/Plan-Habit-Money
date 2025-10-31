import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export interface FinancialTransaction {
  id: string;
  amount: number; // in cents
  description?: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionData {
  amount: number;
  description?: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export interface UpdateTransactionData {
  amount?: number;
  description?: string;
  category?: string;
  type?: 'income' | 'expense';
  date?: string;
}

export function useTransactions() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async (startDate?: string, endDate?: string, type?: 'income' | 'expense') => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (type) params.append('type', type);

      const response = await fetch(`/api/transactions?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch transactions');

      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const createTransaction = useCallback(async (transactionData: CreateTransactionData): Promise<FinancialTransaction | null> => {
    if (!session?.user?.id) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) throw new Error('Failed to create transaction');

      const newTransaction = await response.json();
      setTransactions(prev => [newTransaction, ...prev]);

      return newTransaction;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const updateTransaction = useCallback(async (id: string, transactionData: UpdateTransactionData): Promise<boolean> => {
    if (!session?.user?.id) return false;

    setLoading(true);
    setError(null);

    // Optimistic update
    setTransactions(prev => prev.map(transaction =>
      transaction.id === id ? { ...transaction, ...transactionData } : transaction
    ));

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        setTransactions(prev => prev.map(transaction =>
          transaction.id === id ? { ...transaction, ...transactionData } : transaction
        ).filter(transaction => transaction.id !== id));
        throw new Error('Failed to update transaction');
      }

      const updatedTransaction = await response.json();
      setTransactions(prev => prev.map(transaction =>
        transaction.id === id ? updatedTransaction : transaction
      ));

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const deleteTransaction = useCallback(async (id: string): Promise<boolean> => {
    if (!session?.user?.id) return false;

    setLoading(true);
    setError(null);

    // Optimistic update
    const transactionToDelete = transactions.find(transaction => transaction.id === id);
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // Revert optimistic update on error
        if (transactionToDelete) {
          setTransactions(prev => [transactionToDelete, ...prev]);
        }
        throw new Error('Failed to delete transaction');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, transactions]);

  const getTotalIncome = useCallback(() => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const getTotalExpenses = useCallback(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const getBalance = useCallback(() => {
    return getTotalIncome() - getTotalExpenses();
  }, [getTotalIncome, getTotalExpenses]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchTransactions();
    }
  }, [session?.user?.id, fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTotalIncome,
    getTotalExpenses,
    getBalance,
  };
}