import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: string;
  streak: number;
  createdAt: string;
  updatedAt: string;
  logs: HabitLog[];
}

export interface HabitLog {
  id: string;
  date: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateHabitData {
  name: string;
  description?: string;
  frequency: string;
}

export interface UpdateHabitData {
  name?: string;
  description?: string;
  frequency?: string;
}

export function useHabits() {
  const { data: session } = useSession();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = useCallback(async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/habits');
      if (!response.ok) throw new Error('Failed to fetch habits');

      const data = await response.json();
      setHabits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const createHabit = useCallback(async (habitData: CreateHabitData): Promise<Habit | null> => {
    if (!session?.user?.id) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData),
      });

      if (!response.ok) throw new Error('Failed to create habit');

      const newHabit = await response.json();
      setHabits(prev => [...prev, newHabit]);

      return newHabit;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const updateHabit = useCallback(async (id: string, habitData: UpdateHabitData): Promise<boolean> => {
    if (!session?.user?.id) return false;

    setLoading(true);
    setError(null);

    // Optimistic update
    setHabits(prev => prev.map(habit =>
      habit.id === id ? { ...habit, ...habitData } : habit
    ));

    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        setHabits(prev => prev.map(habit =>
          habit.id === id ? { ...habit, ...habitData } : habit
        ).filter(habit => habit.id !== id));
        throw new Error('Failed to update habit');
      }

      const updatedHabit = await response.json();
      setHabits(prev => prev.map(habit =>
        habit.id === id ? updatedHabit : habit
      ));

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const deleteHabit = useCallback(async (id: string): Promise<boolean> => {
    if (!session?.user?.id) return false;

    setLoading(true);
    setError(null);

    // Optimistic update
    const habitToDelete = habits.find(habit => habit.id === id);
    setHabits(prev => prev.filter(habit => habit.id !== id));

    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // Revert optimistic update on error
        if (habitToDelete) {
          setHabits(prev => [...prev, habitToDelete]);
        }
        throw new Error('Failed to delete habit');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, habits]);

  const logHabit = useCallback(async (habitId: string, date: string, completed: boolean): Promise<boolean> => {
    if (!session?.user?.id) return false;

    setLoading(true);
    setError(null);

    // Optimistic update
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const existingLogIndex = habit.logs.findIndex(log => log.date === date);
        if (existingLogIndex >= 0) {
          // Update existing log
          const updatedLogs = [...habit.logs];
          updatedLogs[existingLogIndex] = { ...updatedLogs[existingLogIndex], completed };
          return { ...habit, logs: updatedLogs };
        } else {
          // Add new log
          const newLog = {
            id: `temp-${Date.now()}`,
            date,
            completed,
            createdAt: new Date().toISOString(),
          };
          return { ...habit, logs: [...habit.logs, newLog] };
        }
      }
      return habit;
    }));

    try {
      const response = await fetch(`/api/habits/${habitId}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, completed }),
      });

      if (!response.ok) throw new Error('Failed to log habit');

      const log = await response.json();

      // Update with real data
      setHabits(prev => prev.map(habit => {
        if (habit.id === habitId) {
          const updatedLogs = habit.logs.map(l => l.id.startsWith('temp-') && l.date === date ? log : l);
          return { ...habit, logs: updatedLogs };
        }
        return habit;
      }));

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Revert optimistic update
      fetchHabits();
      return false;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, fetchHabits]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchHabits();
    }
  }, [session?.user?.id, fetchHabits]);

  return {
    habits,
    loading,
    error,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    logHabit,
  };
}