import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getRecordDayTimeMap, getHabits } from '../../../store/habits'
import Title from '../../common/Title'
import MapClock from './MapClock'
import moment from 'moment'
import LeftRightArrow from '../../common/Icons/LeftRightArrow'
import militaryToStandard from '../../utils/militaryToStandard'
function DailyClock(props) {
  const habits = useSelector(getHabits)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [selectedDay, setSelectedDay] = useState(
    moment().tz(timeZone).format('YYYY-MM-DD'),
  )

  const [timemap] = useSelector(getRecordDayTimeMap(selectedDay))
  const amClock = {
    '12am': [],
    '1am': [],
    '2am': [],
    '3am': [],
    '4am': [],
    '5am': [],
    '6am': [],
    '7am': [],
    '8am': [],
    '9am': [],
    '10am': [],
    '11am': [],
  }
  const pmClock = {
    '12pm': [],
    '1pm': [],
    '2pm': [],
    '3pm': [],
    '4pm': [],
    '5pm': [],
    '6pm': [],
    '7pm': [],
    '8pm': [],
    '9pm': [],
    '10pm': [],
    '11pm': [],
  }

  const handleAddDay = (amount) => () => {
    setSelectedDay(moment(selectedDay).add(amount, 'days').format('YYYY-MM-DD'))
  }

  timemap.forEach((timeObject) => {
    const useClock = timeObject.id < 12 ? 'am' : 'pm'
    const clockKey = militaryToStandard[timeObject.id]

    if (useClock === 'am') {
      timeObject.records.forEach((record) => {
        const existingIndex = amClock[clockKey].findIndex(
          (existigRecord) => existigRecord._habitId === record._habitId,
        )
        if (existingIndex === -1) amClock[clockKey].push(record)
      })
    } else {
      timeObject.records.forEach((record) => {
        const existingIndex = pmClock[clockKey].findIndex(
          (existigRecord) => existigRecord._habitId === record._habitId,
        )
        if (existingIndex === -1) pmClock[clockKey].push(record)
      })
    }
  })

  return (
    <div className="p-3 flex flex-col border-2 rounded">
      <Title>Daily Clock</Title>
      <div className="flex justify-around">
        <div>
          <button onClick={handleAddDay(-1)}>
            <LeftRightArrow
              direction="left"
              className="w-8 h-8"
              color="rgb(248,250,252)"
            />
          </button>
        </div>
        <div className=" text-2xl">{selectedDay}</div>
        <div>
          <button onClick={handleAddDay(1)}>
            <LeftRightArrow
              direction="right"
              className="w-8 h-8"
              color="rgb(248,250,252)"
            />
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <div className="text-center text-2xl text-bold mb-2">am</div>
          <MapClock clock={amClock} habits={habits} className="w-full" />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="text-center text-2xl text-bold mb-2">pm</div>
          <MapClock clock={pmClock} habits={habits} className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default DailyClock
