'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  daysRemaining: number;
  className?: string;
}

export default function CountdownTimer({ daysRemaining, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: daysRemaining,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysRemaining);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [daysRemaining]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="material-symbols-outlined text-amber-500 dark:text-amber-400 text-lg">
        schedule
      </span>
      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m remaining
        </span>
      </div>
    </div>
  );
}