'use client';

import React, { useState, useEffect } from 'react';
import { Task } from '@/app/weekly-planner/page';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
  onDelete: (taskId: string) => void;
  task: Task | null;
  dayIndex?: number;
}

const colorOptions = [
  { value: 'primary', label: 'Blue', class: 'bg-primary' },
  { value: 'amber', label: 'Amber', class: 'bg-amber-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'gray', label: 'Gray', class: 'bg-gray-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'blue', label: 'Light Blue', class: 'bg-blue-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500' },
];

export function TaskModal({ isOpen, onClose, onSave, onDelete, task, dayIndex }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('primary');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStartTime(task.startTime);
      setEndTime(task.endTime || '');
      setColor(task.color);
    } else {
      setTitle('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      setColor('primary');
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) return;

    const taskData: Omit<Task, 'id'> = {
      title: title.trim(),
      description: description.trim() || undefined,
      startTime,
      endTime: endTime || undefined,
      dayIndex: task?.dayIndex ?? dayIndex ?? 0,
      color,
    };

    onSave(taskData);
  };

  const handleDelete = () => {
    if (task) {
      onDelete(task.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card-light dark:bg-card-dark rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
            {task ? 'Edit Task' : 'Add New Task'}
          </h3>
          <button
            onClick={onClose}
            className="text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="Task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
                End Time (optional)
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Color
            </label>
            <div className="flex gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className={`w-8 h-8 rounded-full ${option.class} border-2 ${
                    color === option.value ? 'border-primary' : 'border-transparent'
                  } hover:scale-110 transition-transform`}
                  title={option.label}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {task && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Delete
            </button>
          )}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-muted-light dark:text-text-muted-dark hover:bg-border-light dark:hover:bg-border-dark rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="px-4 py-2 bg-primary text-text-light rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {task ? 'Update' : 'Add'} Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}