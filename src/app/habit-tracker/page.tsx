'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProgressStats from '@/components/habit-tracker/ProgressStats';
import CategoryFilter from '@/components/habit-tracker/CategoryFilter';
import HabitGrid from '@/components/habit-tracker/HabitGrid';
import HabitModal from '@/components/habit-tracker/HabitModal';

interface Habit {
  id: string;
  name: string;
  emoji: string;
  category: string;
  weeklyProgress: boolean[];
  streak: number;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Drink 8 glasses of water',
      emoji: '💧',
      category: 'Health',
      weeklyProgress: [false, true, false, true, true, false, false],
      streak: 14,
    },
    {
      id: '2',
      name: 'Read for 15 minutes',
      emoji: '📖',
      category: 'Personal',
      weeklyProgress: [true, true, true, true, true, true, true],
      streak: 21,
    },
    {
      id: '3',
      name: 'Morning workout',
      emoji: '💪',
      category: 'Health',
      weeklyProgress: [true, false, true, false, true, false, true],
      streak: 3,
    },
    {
      id: '4',
      name: 'No spend day',
      emoji: '💰',
      category: 'Personal',
      weeklyProgress: [true, false, false, true, false, false, false],
      streak: 8,
    },
    {
      id: '5',
      name: 'Meditate for 10 minutes',
      emoji: '🧘',
      category: 'Health',
      weeklyProgress: [true, true, true, true, true, true, false],
      streak: 6,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const filteredHabits = selectedCategory === 'All'
    ? habits
    : habits.filter(habit => habit.category === selectedCategory);

  const handleAddHabit = () => {
    setEditingHabit(null);
    setIsModalOpen(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleSaveHabit = (habitData: Omit<Habit, 'id'>) => {
    if (editingHabit) {
      setHabits(habits.map(h => h.id === editingHabit.id ? { ...habitData, id: editingHabit.id } : h));
    } else {
      const newHabit: Habit = {
        ...habitData,
        id: Date.now().toString(),
      };
      setHabits([...habits, newHabit]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  const handleToggleDay = (habitId: string, dayIndex: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newProgress = [...habit.weeklyProgress];
        newProgress[dayIndex] = !newProgress[dayIndex];
        // Recalculate streak (simplified)
        const streak = newProgress.filter(day => day).length;
        return { ...habit, weeklyProgress: newProgress, streak };
      }
      return habit;
    }));
  };

  const completionRate = Math.round((habits.reduce((acc, habit) => acc + habit.weeklyProgress.filter(day => day).length, 0) / (habits.length * 7)) * 100);

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Habit Tracker" />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-5 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-6">
                <div className="flex flex-wrap justify-between gap-4 py-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-slate-800 dark:text-slate-200 text-4xl font-black leading-tight tracking-[-0.033em]">
                  My Habits
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Track your progress and build positive routines.
                </p>
              </div>
              <button
                onClick={handleAddHabit}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
                <span className="truncate">Add New Habit</span>
              </button>
              </div>
            </div>

            <ProgressStats completionRate={completionRate} />

            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <HabitGrid
              habits={filteredHabits}
              onEditHabit={handleEditHabit}
              onDeleteHabit={handleDeleteHabit}
              onToggleDay={handleToggleDay}
            />

            <HabitModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveHabit}
              habit={editingHabit}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HabitTracker;