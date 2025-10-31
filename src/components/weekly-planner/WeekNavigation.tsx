import React from 'react';

interface WeekNavigationProps {
  currentWeekStart: Date;
  onWeekChange: (date: Date) => void;
}

export function WeekNavigation({ currentWeekStart, onWeekChange }: WeekNavigationProps) {
  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    onWeekChange(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    onWeekChange(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    onWeekChange(monday);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full sm:w-auto">
      <div className="flex gap-2 p-1 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg">
        <button
          onClick={handlePreviousWeek}
          className="p-2 rounded-md hover:bg-primary/10 text-text-muted-light dark:text-text-muted-dark"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={handleNextWeek}
          className="p-2 rounded-md hover:bg-primary/10 text-text-muted-light dark:text-text-muted-dark"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <button
        onClick={handleToday}
        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-text-light gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 w-full sm:w-auto"
      >
        <span className="material-symbols-outlined text-xl">today</span>
        <span className="truncate">Today</span>
      </button>
    </div>
  );
}