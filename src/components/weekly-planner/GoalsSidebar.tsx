import React from 'react';
import { Goal } from '@/app/weekly-planner/page';

interface GoalsSidebarProps {
  goals: Goal[];
  onUpdateProgress: (goalId: string, newProgress: number) => void;
}

export function GoalsSidebar({ goals, onUpdateProgress }: GoalsSidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0 bg-card-light dark:bg-card-dark border-l border-border-light dark:border-border-dark p-6 hidden xl:block">
      <div className="flex flex-col gap-8">
        {/* Weekly Goals Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-text-light dark:text-text-dark">This Week's Goals</h3>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium text-text-light dark:text-text-dark">{goal.title}</p>
                  <span className="text-xs text-text-muted-light dark:text-text-muted-dark font-medium">{goal.progress}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-primary/20 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) => onUpdateProgress(goal.id, parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Habit Tracker Integration */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-text-light dark:text-text-dark">Today's Habits</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">local_drink</span>
                <p className="text-sm text-text-light dark:text-text-dark">Drink 8 glasses of water</p>
              </div>
              <div className="flex gap-1.5">
                <div className="size-4 bg-primary rounded-full"></div>
                <div className="size-4 bg-primary rounded-full"></div>
                <div className="size-4 bg-primary rounded-full"></div>
                <div className="size-4 bg-border-light dark:bg-border-dark rounded-full"></div>
                <div className="size-4 bg-border-light dark:bg-border-dark rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-500">self_improvement</span>
                <p className="text-sm text-text-light dark:text-text-dark">Meditate for 10 minutes</p>
              </div>
              <div className="flex gap-1.5">
                <div className="size-4 bg-amber-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-500">book_2</span>
                <p className="text-sm text-text-light dark:text-text-dark">Read 1 chapter</p>
              </div>
              <div className="flex gap-1.5">
                <div className="size-4 bg-border-light dark:bg-border-dark rounded-full border border-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}