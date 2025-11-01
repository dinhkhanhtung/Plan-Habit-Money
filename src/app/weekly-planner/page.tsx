'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { CalendarGrid } from '@/components/weekly-planner/CalendarGrid';
import { TaskCard } from '@/components/weekly-planner/TaskCard';
import { TaskModal } from '@/components/weekly-planner/TaskModal';
import { GoalsSidebar } from '@/components/weekly-planner/GoalsSidebar';
import { WeekNavigation } from '@/components/weekly-planner/WeekNavigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';

export interface Task {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  dayIndex: number;
  color: string;
  completed?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  progress: number;
}

export default function WeeklyPlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design Sync',
      description: 'Project Phoenix alignment.',
      startTime: '10:00',
      endTime: '11:00',
      dayIndex: 0,
      color: 'primary',
    },
    {
      id: '2',
      title: 'Kick-off',
      description: 'Finalize all assets for launch.',
      startTime: '14:00',
      endTime: '15:00',
      dayIndex: 0,
      color: 'amber',
    },
    {
      id: '3',
      title: 'Finalize Q4 report',
      startTime: '09:00',
      dayIndex: 1,
      color: 'gray',
      completed: true,
    },
    {
      id: '4',
      title: 'Dentist',
      startTime: '11:00',
      endTime: '12:00',
      dayIndex: 2,
      color: 'green',
    },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Launch Project Phoenix', progress: 75 },
    { id: '2', title: 'Finalize Q4 Budget', progress: 20 },
    { id: '3', title: 'Onboard New Designer', progress: 100 },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newDayIndex = parseInt(over.id as string);

    if (isNaN(newDayIndex)) return;

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, dayIndex: newDayIndex } : task
      )
    );
  };

  const handleAddTask = (dayIndex: number) => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'>) => {
    if (selectedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTask.id ? { ...task, ...taskData } : task
        )
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleToggleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleUpdateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === goalId ? { ...goal, progress: newProgress } : goal
      )
    );
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header title="Weekly Planner" />
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">My Week</p>
                <WeekNavigation
                  currentWeekStart={currentWeekStart}
                  onWeekChange={setCurrentWeekStart}
                />
              </div>
              <h2 className="text-text-light dark:text-text-dark tracking-light text-2xl font-bold leading-tight mb-6">
                {currentWeekStart.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })} - {new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h2>

              <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <CalendarGrid
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onEditTask={handleEditTask}
                  onToggleTaskCompletion={handleToggleTaskCompletion}
                />
                <DragOverlay>
                  {activeTask ? (
                    <TaskCard
                      task={activeTask}
                      onEdit={() => {}}
                      onToggleCompletion={() => {}}
                      isDragging
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        </main>

        <GoalsSidebar
          goals={goals}
          onUpdateProgress={handleUpdateGoalProgress}
        />

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          task={selectedTask}
          dayIndex={selectedTask?.dayIndex}
        />
      </div>
    </ProtectedRoute>
  );
}
