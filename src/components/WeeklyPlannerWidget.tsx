export default function WeeklyPlannerWidget() {
  const tasks = [
    { icon: 'groups', title: 'Team Sync Meeting', time: '10:00 AM' },
    { icon: 'code', title: 'Develop Dashboard UI', time: '1:00 PM' },
    { icon: 'design_services', title: 'Review Design Mockups', time: '4:30 PM' },
  ]

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-900/40 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-none border border-transparent dark:border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Lịch Tuần Này</h3>
        <span className="material-symbols-outlined text-primary">calendar_today</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">You have 3 tasks for today.</p>
      <div className="flex flex-col gap-3">
        {tasks.map((task, index) => (
          <div key={index} className={`flex items-center gap-4 ${index < tasks.length - 1 ? 'border-b border-gray-200/60 dark:border-white/10 pb-3' : ''}`}>
            <div className="text-gray-700 dark:text-gray-300 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 shrink-0 size-10">
              <span className="material-symbols-outlined text-xl">{task.icon}</span>
            </div>
            <p className="text-gray-800 dark:text-gray-200 text-base font-normal leading-normal flex-1 truncate">{task.title}</p>
            <div className="shrink-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">{task.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-gray-900 text-sm font-medium leading-normal">
        Xem Lịch Tuần
      </button>
    </div>
  )
}