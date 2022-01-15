import { useSelector } from 'react-redux'
import { getHabitRecordsForLastYear } from '../../../store/habits'

import Title from '../../common/Title'
import { useState } from 'react'
import CollapseIcon from '../../common/Icons/CollapseIcon'
import ExpandIcon from '../../common/Icons/ExpandIcon'
function LastYear(props) {
  const { _habitId, color } = props
  const [isOpen, setIsOpen] = useState(true)
  const recordYearArray = useSelector(getHabitRecordsForLastYear(_habitId))

  const handleOpenToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-2">
        <Title>Last 365 Days</Title>
        <div className="ml-auto flex items-center">
          <button onClick={handleOpenToggle}>
            {isOpen ? (
              <CollapseIcon className="w-8 h-8" />
            ) : (
              <ExpandIcon className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>
      {isOpen ? (
        <div className={`flex flex-wrap p-2 `}>
          {recordYearArray.map((day, dayIndex) => {
            return (
              <div
                key={`${_habitId}LastYear${dayIndex}`}
                className={`oneHundreth h-3 border m-0.5 text-center font-bold ${
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
                {day.amount > 0 ? day.amount : null}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default LastYear
