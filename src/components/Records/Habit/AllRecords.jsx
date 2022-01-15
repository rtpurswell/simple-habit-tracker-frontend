import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getHabitRecords } from '../../../store/habits'
import Button from '../../common/Button'
import SingleRecord from '../SingleRecord'
import Title from '../../common/Title'
import RemoveIcon from '../../common/Icons/RemoveIcon'
import moment from 'moment-timezone'
import LeftRightArrow from '../../common/Icons/LeftRightArrow'
import Calendar from 'react-calendar'

function AllRecords(props) {
  const { habit, handleRecordDelete } = props
  const [isOpen, setIsOpen] = useState(false)
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const records = useSelector(getHabitRecords(habit._id, selectedDay))

  const handleOpenToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleFilterToggle = () => {
    if (filterIsOpen) {
      setSelectedDay(null)
    } else {
      setSelectedDay(moment().format('YYYY-MM-DD'))
    }
    setFilterIsOpen(!filterIsOpen)
  }
  const handleAddDay = (amount) => () => {
    setSelectedDay(moment(selectedDay).add(amount, 'days').format('YYYY-MM-DD'))
  }
  const handleDateChange = (date) => {
    setCalendarOpen(false)
    setSelectedDay(moment(date).format('YYYY-MM-DD'))
  }
  const handleCalendarOpen = () => {
    setCalendarOpen(true)
  }
  return (
    <div>
      {isOpen ? (
        <div className="flex flex-col mb-8">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={handleFilterToggle}
                className={`font-bold text-center w-full  rounded mx-1 ${
                  filterIsOpen
                    ? 'bg-slate-50 text-gray-700'
                    : 'text-slate-50 bg-gray-700'
                }`}
              >
                Filter
              </button>
            </div>

            <div>
              <Title>All Records</Title>
            </div>
            <div className="flex items-center justify-between">
              <Button
                color="cancel"
                className="flex"
                onClick={handleOpenToggle}
              >
                <RemoveIcon
                  className="w-6 h-6"
                  color={{ r: 100, g: 100, b: 100 }}
                />
              </Button>
            </div>
          </div>
          {filterIsOpen ? (
            calendarOpen ? (
              <div className="text-black">
                <Calendar
                  defaultValue={new Date(selectedDay)}
                  onChange={handleDateChange}
                />
              </div>
            ) : (
              <div className="flex justify-around  font-bold text-2xl my-2">
                <div>
                  <button onClick={handleAddDay(-1)}>
                    <LeftRightArrow
                      direction="left"
                      className="w-8 h-8"
                      color="rgb(248,250,252)"
                    />
                  </button>
                </div>
                <div>
                  <button onClick={handleCalendarOpen}>{selectedDay}</button>
                </div>
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
            )
          ) : null}

          <ul className="max-h-56 overflow-y-scroll">
            {records.map((record) => (
              <li key={`habitRecord${record._id}`} className="mb-2">
                <SingleRecord
                  record={record}
                  color={habit.color}
                  onDelete={handleRecordDelete}
                  habit={habit}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Button color="confirm" onClick={handleOpenToggle} className="mb-8">
          Show All Records
        </Button>
      )}
    </div>
  )
}

export default AllRecords
