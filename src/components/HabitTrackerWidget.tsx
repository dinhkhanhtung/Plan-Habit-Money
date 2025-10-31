export default function HabitTrackerWidget() {
  const habits = [
    { name: 'Đọc sách', progress: 85 },
    { name: 'Tập thể dục', progress: 60 },
    { name: 'Uống nước', progress: 100 },
    { name: 'Thiền', progress: 40 },
  ]

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-900/40 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-none border border-transparent dark:border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tiến độ Thói quen</h3>
        <span className="material-symbols-outlined text-primary">check_circle</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">Great job! Keep up the momentum this week.</p>
      <div className="flex flex-col gap-4">
        {habits.map((habit, index) => (
          <div key={index} className="flex items-center gap-4">
            <p className="w-28 truncate text-gray-800 dark:text-gray-200">{habit.name}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${habit.progress}%` }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{habit.progress}%</p>
          </div>
        ))}
      </div>
      <button className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-gray-900 text-sm font-medium leading-normal">
        Mở Trình theo dõi
      </button>
    </div>
  )
}