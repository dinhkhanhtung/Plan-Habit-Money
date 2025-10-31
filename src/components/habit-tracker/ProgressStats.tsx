'use client';

interface ProgressStatsProps {
  completionRate: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ completionRate }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
      <div className="flex flex-col items-stretch justify-start rounded-lg xl:flex-row xl:items-center">
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-2 py-4 xl:pr-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
            Weekly Progress
          </p>
          <p className="text-slate-800 dark:text-slate-200 text-2xl font-bold leading-tight tracking-[-0.015em]">
            {completionRate}% Completion Rate
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
            {completionRate >= 85 ? "You're on a roll! Keep up the great work this week." :
             completionRate >= 70 ? "Good progress! Keep pushing forward." :
             "Every small step counts. Stay consistent!"}
          </p>
        </div>
        <div className="w-full xl:w-2/3 h-40 bg-center bg-no-repeat bg-contain">
          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{completionRate}%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Weekly Goal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;