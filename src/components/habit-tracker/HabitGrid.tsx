'use client';

import HabitCard from './HabitCard';

interface Habit {
  id: string;
  name: string;
  emoji: string;
  category: string;
  weeklyProgress: boolean[];
  streak: number;
}

interface HabitGridProps {
  habits: Habit[];
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (habitId: string) => void;
  onToggleDay: (habitId: string, dayIndex: number) => void;
}

const HabitGrid: React.FC<HabitGridProps> = ({ habits, onEditHabit, onDeleteHabit, onToggleDay }) => {
  return (
    <div>
      <h2 className="text-slate-800 dark:text-slate-200 text-2xl font-bold leading-tight tracking-[-0.015em] px-1 pb-3 pt-8">
        Today's Habits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onEdit={() => onEditHabit(habit)}
            onDelete={() => onDeleteHabit(habit.id)}
            onToggleDay={(dayIndex) => onToggleDay(habit.id, dayIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitGrid;