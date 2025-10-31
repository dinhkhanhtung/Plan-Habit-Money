import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { Task } from '@/app/weekly-planner/page';

interface CalendarGridProps {
  tasks: Task[];
  onAddTask: (dayIndex: number) => void;
  onEditTask: (task: Task) => void;
  onToggleTaskCompletion: (taskId: string) => void;
}

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const TIME_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const hour = Math.floor(i / 2) + 6; // Starting from 6 AM
  const isHalfHour = i % 2 === 1;
  return `${hour.toString().padStart(2, '0')}:${isHalfHour ? '30' : '00'}`;
});

function DayColumn({
  dayIndex,
  dayName,
  tasks,
  onAddTask,
  onEditTask,
  onToggleTaskCompletion
}: {
  dayIndex: number;
  dayName: string;
  tasks: Task[];
  onAddTask: (dayIndex: number) => void;
  onEditTask: (task: Task) => void;
  onToggleTaskCompletion: (taskId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: dayIndex.toString(),
  });

  const dayTasks = tasks.filter(task => task.dayIndex === dayIndex);

  return (
    <div
      ref={setNodeRef}
      className={`border-b border-r border-border-light dark:border-border-dark min-h-[600px] flex flex-col ${
        isOver ? 'bg-primary/5' : ''
      }`}
    >
      <div className="p-2 sm:p-3 flex justify-between items-center border-b border-border-light dark:border-border-dark">
        <p className="text-xs sm:text-sm font-medium truncate">{dayName} {new Date().getDate() + dayIndex}</p>
        <button
          onClick={() => onAddTask(dayIndex)}
          className="p-1 text-text-muted-light dark:text-text-muted-dark hover:text-primary rounded-full hover:bg-primary/10"
        >
          <span className="material-symbols-outlined text-sm sm:text-lg">add</span>
        </button>
      </div>
      <div className="flex-1 p-3 space-y-2">
        {dayTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEditTask(task)}
            onToggleCompletion={() => onToggleTaskCompletion(task.id)}
          />
        ))}
        {dayTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-border-light dark:border-border-dark rounded-lg p-4 opacity-60">
            <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">relax</span>
            <p className="text-sm font-medium mt-2 text-text-muted-light dark:text-text-muted-dark">
              No plans yet. Enjoy your day!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function CalendarGrid({ tasks, onAddTask, onEditTask, onToggleTaskCompletion }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 border-t border-l border-border-light dark:border-border-dark rounded-lg overflow-hidden bg-card-light dark:bg-card-dark">
      {DAYS.map((day, index) => (
        <DayColumn
          key={day}
          dayIndex={index}
          dayName={day}
          tasks={tasks}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          onToggleTaskCompletion={onToggleTaskCompletion}
        />
      ))}
    </div>
  );
}