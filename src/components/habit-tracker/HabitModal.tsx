'use client';

import { useState, useEffect } from 'react';

interface Habit {
  id: string;
  name: string;
  emoji: string;
  category: string;
  weeklyProgress: boolean[];
  streak: number;
}

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: Omit<Habit, 'id'>) => void;
  habit?: Habit | null;
}

const categories = ['Health', 'Work', 'Personal'];
const emojis = ['💧', '📖', '💪', '💰', '🧘', '🏃', '🍎', '📝', '🎵', '🌱'];

const HabitModal: React.FC<HabitModalProps> = ({ isOpen, onClose, onSave, habit }) => {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(emojis[0]);
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setEmoji(habit.emoji);
      setCategory(habit.category);
    } else {
      setName('');
      setEmoji(emojis[0]);
      setCategory(categories[0]);
    }
  }, [habit, isOpen]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        name: name.trim(),
        emoji,
        category,
        weeklyProgress: habit ? habit.weeklyProgress : [false, false, false, false, false, false, false],
        streak: habit ? habit.streak : 0,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          {habit ? 'Edit Habit' : 'Add New Habit'}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter habit name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Emoji
            </label>
            <div className="flex flex-wrap gap-2">
              {emojis.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`text-2xl p-2 rounded-lg border-2 ${
                    emoji === e
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-slate-600 dark:text-slate-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {habit ? 'Update' : 'Add'} Habit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitModal;