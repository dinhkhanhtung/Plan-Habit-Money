import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '@/app/weekly-planner/page';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onToggleCompletion: () => void;
  isDragging?: boolean;
}

const colorClasses = {
  primary: 'bg-primary/10 border-primary',
  amber: 'bg-amber-500/10 border-amber-500',
  green: 'bg-green-500/10 border-green-500',
  gray: 'bg-gray-500/10 border-gray-500',
  purple: 'bg-purple-500/10 border-purple-500',
  blue: 'bg-blue-500/10 border-blue-500',
  red: 'bg-red-500/10 border-red-500',
};

export function TaskCard({ task, onEdit, onToggleCompletion, isDragging }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isCurrentlyDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const colorClass = colorClasses[task.color as keyof typeof colorClasses] || colorClasses.primary;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        p-3 rounded-lg border-l-4 ${colorClass}
        ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}
        ${isDragging || isCurrentlyDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab hover:shadow-md transition-shadow'}
        group relative
      `}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={onToggleCompletion}
              className="w-4 h-4 rounded border-border-light dark:border-border-dark text-primary focus:ring-primary"
            />
            <p className="text-sm font-medium truncate">
              {task.startTime && `${task.startTime} - `}{task.title}
            </p>
          </div>
          {task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 dark:text-gray-500 hover:text-primary rounded transition-opacity"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
        </button>
      </div>
    </div>
  );
}
