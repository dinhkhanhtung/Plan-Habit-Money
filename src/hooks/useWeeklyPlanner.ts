import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export interface WeeklyPlannerTask {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  date: string;
  time?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  completed?: boolean;
}

export function useWeeklyPlanner() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<WeeklyPlannerTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async (startDate?: string, endDate?: string) => {
    if (!session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/weekly-planner?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const createTask = useCallback(async (taskData: CreateTaskData): Promise<WeeklyPlannerTask | null> => {
    if (!session?.user?.id) return null;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/weekly-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error('Failed to create task');

      const newTask = await response.json();
      setTasks(prev => [...prev, newTask]);

      // Optimistic update
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const updateTask = useCallback(async (id: string, taskData: UpdateTaskData): Promise<boolean> => {
    if (!session?.user?.id) return false;

    setLoading(true);
    setError(null);

    // Optimistic update
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...taskData } : task
    ));

    try {
      const response = await fetch(`/api/weekly-planner/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        setTasks(prev => prev.map(task =>
          task.id === id ? { ...task, ...taskData } : task
        ).filter(task => task.id !== id));
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(prev => prev.map(task =>
        task.id === id ? updatedTask : task
      ));

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    if (!session?.user?.id) return false;

    setLoading(true);
    setError(null);

    // Optimistic update
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));

    try {
      const response = await fetch(`/api/weekly-planner/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // Revert optimistic update on error
        if (taskToDelete) {
          setTasks(prev => [...prev, taskToDelete]);
        }
        throw new Error('Failed to delete task');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, tasks]);

  const toggleTaskCompletion = useCallback(async (id: string): Promise<boolean> => {
    const task = tasks.find(t => t.id === id);
    if (!task) return false;

    return updateTask(id, { completed: !task.completed });
  }, [tasks, updateTask]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchTasks();
    }
  }, [session?.user?.id, fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
}