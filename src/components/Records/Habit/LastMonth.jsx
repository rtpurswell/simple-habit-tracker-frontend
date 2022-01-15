import moment from 'moment-timezone'
import { useSelector } from 'react-redux'
import { getHabitRecordsForLastMonth } from '../../../store/habits'

function LastMonth(props) {
  const { _habitId, color } = props
  const recordMonthArray = useSelector(getHabitRecordsForLastMonth(_habitId))
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  let emptySpaces = 0

  switch (moment().tz(timeZone).format('ddd')) {
    case 'Mon':
      emptySpaces = 6
      break
    case 'Wed':
      emptySpaces = 1

      break
    case 'Thu':
      emptySpaces = 2

      break
    case 'Fri':
      emptySpaces = 3

      break
    case 'Sat':
      emptySpaces = 4

      break
    case 'Sun':
      emptySpaces = 5
      break
  }
  const emptySpaceArray = []
  for (emptySpaces; emptySpaces > 0; emptySpaces--) {
    emptySpaceArray.push({})
  }
  return (
    <div className="flex flex-col">
      <div className={`grid grid-cols-7 p-2 gap-2`}>
        <div className="h-6 text-xs text-center">Sunday</div>
        <div className="h-6 text-xs text-center">Monday</div>

        <div className="h-6 text-xs text-center">Tuesday</div>
        <div className="h-6 text-xs text-center">Wednesday</div>
        <div className="h-6 text-xs text-center">Thursday</div>
        <div className="h-6 text-xs text-center">Friday</div>
        <div className="h-6 text-xs text-center">Saturday</div>
        {emptySpaceArray.map(() => {
          return <div></div>
        })}
        {recordMonthArray.map((day, dayIndex) => {
          return (
            <div
              key={`${_habitId}LastMonth${dayIndex}`}
              className={` h-12 border text-center font-bold ${
                day.amount > 0 ? '' : 'bg-slate-500'
              }`}
              style={
                day.amount > 0
                  ? {
                      backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
                    }
                  : {}
              }
            >
              <span className="text-xs">
                {moment(day.value).format('MM-DD')}
              </span>
              <br />
              {day.amount > 0 ? day.amount : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LastMonth
