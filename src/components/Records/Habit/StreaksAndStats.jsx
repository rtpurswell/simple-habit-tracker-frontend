function StreaksAndStats(props) {
  const { streaks, stats } = props

  return (
    <div className="w-full grid grid-cols-2 gap-2 p-2">
      <div className="text-center font-bold border rounded h-12 flex items-center justify-center">
        Current Streak: {streaks.currentStreak}
      </div>
      <div className="text-center font-bold border rounded h-12 flex items-center justify-center">
        Longest Streak: {streaks.longestStreak}
      </div>
      <div className="text-center font-bold border rounded h-12 flex items-center justify-center col-span-2">
        {stats.lastWeekCount} In The Last Week <br />
        {stats.lastWeekAvg}/Day
      </div>

      <div className="text-center font-bold border rounded h-12 flex items-center justify-center col-span-2">
        {stats.lastMonthCount} In The Last Month
        <br />
        {stats.lastMonthAvg}/Day
      </div>

      <div className="text-center font-bold border rounded h-12 flex items-center justify-center col-span-2">
        {stats.lastYearCount} In The Last year <br />
        {stats.lastYearAvg}/Day
      </div>
    </div>
  )
}

export default StreaksAndStats
