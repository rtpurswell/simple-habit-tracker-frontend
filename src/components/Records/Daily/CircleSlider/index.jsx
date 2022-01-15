import MapCircleSlide from './MapCircleSlide'
import { useSelector } from 'react-redux'
import { getRecordDayTimeMap, getHabits } from '../../../../store/habits'
import Title from '../../../common/Title'
import LeftRightArrow from '../../../common/Icons/LeftRightArrow'
import moment from 'moment-timezone'
import React, { useState } from 'react'

function CircleSlider() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [selectedDay, setSelectedDay] = useState(
    moment().tz(timeZone).format('YYYY-MM-DD'),
  )
  const [timemap, includedRecords] = useSelector(
    getRecordDayTimeMap(selectedDay),
  )

  const habits = useSelector(getHabits)
  const handleAddDay = (amount) => () => {
    setSelectedDay(
      moment(selectedDay).add(amount, 'days').tz(timeZone).format('YYYY-MM-DD'),
    )
  }

  return (
    <div>
      <div className="p-3 flex flex-col ">
        <Title>Daily Habits </Title>
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
      </div>
      <MapCircleSlide
        timemap={timemap}
        habits={habits}
        includedRecords={includedRecords}
        selectedDay={selectedDay}
      />
    </div>
  )
}

export default CircleSlider
