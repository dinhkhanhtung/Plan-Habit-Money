'use client';

interface Habit {
  id: string;
  name: string;
  emoji: string;
  category: string;
  weeklyProgress: boolean[];
  streak: number;
}

interface HabitCardProps {
  habit: Habit;
  onEdit: () => void;
  onDelete: () => void;
  onToggleDay: (dayIndex: number) => void;
}

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const HabitCard: React.FC<HabitCardProps> = ({ habit, onEdit, onDelete, onToggleDay }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{habit.emoji}</div>
          <p className="text-slate-800 dark:text-slate-200 font-semibold">{habit.name}</p>
        </div>
        <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
          <span className="material-symbols-outlined text-xl">more_vert</span>
        </button>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-1">
          {habit.weeklyProgress.map((completed, index) => (
            <button
              key={index}
              onClick={() => onToggleDay(index)}
              className={`size-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                completed
                  ? 'text-white bg-primary hover:bg-primary/90'
                  : 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700'
              }`}
            >
              {dayLabels[index]}
            </button>
          ))}
        </div>
        <div className={`flex items-center gap-1 font-bold ${
          habit.streak >= 7 ? 'text-orange-500' :
          habit.streak >= 3 ? 'text-yellow-500' : 'text-slate-500'
        }`}>
          <span className="text-lg">🔥</span>
          <span>{habit.streak}</span>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;