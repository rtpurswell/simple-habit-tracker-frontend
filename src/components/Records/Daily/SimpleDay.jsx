import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { getHabits, getRecordsByHabit } from '../../../store/habits'

import moment from 'moment-timezone'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import SlidePage from '../../common/SlidePage'
import Title from '../../common/Title'
import SingleRowIcon from '../../common/Icons/SingleRowIcon'
import TwoRowIcon from '../../common/Icons/TwoRowIcon'
import EditHabit from '../../Habits/EditHabit'
import LeftRightArrow from '../../common/Icons/LeftRightArrow'

function SimpleDay() {
  const [startDay, setStartDay] = useState(moment().format('YYYY-MM-DD'))
  const [endDay, setEndDay] = useState(null)
  const [viewColumns, setViewColumns] = useState(2)
  const [calendarOpen, setCalendarOpen] = useState(null)
  const [allowEmpty, setAllowEmpty] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState(null)

  const records = useSelector(getRecordsByHabit(startDay, endDay))
  const habits = useSelector(getHabits)

  const handleViewToggle = (rows) => () => {
    if (rows === 2) setViewColumns(2)
    else {
      setViewColumns(1)
    }
  }
  const handleDateChange = (whichCalendar) => (date) => {
    setCalendarOpen(null)
    if (whichCalendar === 'start')
      setStartDay(moment(date).format('YYYY-MM-DD'))
    else setEndDay(moment(date).format('YYYY-MM-DD'))
  }
  const handleMultiDayToggle = (isMulti) => () => {
    if (!isMulti) {
      setEndDay(null)
    } else {
      setEndDay(moment(startDay).add(1, 'days').format('YYYY-MM-DD'))
    }
  }
  const handleCalendarToggle = (whichCalendar) => () => {
    if (calendarOpen) setCalendarOpen(null)
    else setCalendarOpen(whichCalendar)
  }
  const handleAllowEmptyToggle = () => {
    setAllowEmpty(!allowEmpty)
  }
  const handleEditToggle = () => {
    setEditOpen(!editOpen)
  }
  const handleAddDay = (amount) => () => {
    setStartDay(moment(startDay).add(amount, 'days').format('YYYY-MM-DD'))
  }
  const handleHabitDelete = () => {
    setSelectedHabit(null)
  }
  return (
    <div className="">
      <div className="flex justify-between p-2">
        <div className="flex">
          <button onClick={handleViewToggle(2)} disabled={viewColumns === 2}>
            <TwoRowIcon
              className="w-8 h-8 mx-1"
              bgColor={viewColumns === 2 ? 'rgb(248,250,252)' : 'rgb(75,85,99)'}
              barColor={
                viewColumns === 2 ? 'rgb(75,85,99)' : 'rgb(248,250,252)'
              }
            />
          </button>

          <button onClick={handleViewToggle(1)} disabled={viewColumns === 1}>
            <SingleRowIcon
              className="w-8 h-8"
              bgColor={viewColumns === 1 ? 'rgb(248,250,252)' : 'rgb(75,85,99)'}
              barColor={
                viewColumns === 1 ? 'rgb(75,85,99)' : 'rgb(248,250,252)'
              }
            />
          </button>
        </div>
        <Title>Habit Count</Title>
        <div className="items-center flex">
          <button
            onClick={handleAllowEmptyToggle}
            className={`font-bold text-center w-full  rounded mx-1 p-1 ${
              !allowEmpty
                ? 'text-slate-50 bg-gray-700'
                : 'bg-slate-50 text-gray-700'
            }`}
          >
            Show Empty
          </button>
        </div>
      </div>
      <div className="flex justify-around font-bold text-2xl my-2">
        <div>
          {!endDay && (
            <button onClick={handleAddDay(-1)}>
              <LeftRightArrow
                direction="left"
                className="w-8 h-8"
                color="rgb(248,250,252)"
              />
            </button>
          )}
        </div>
        <div>
          <button onClick={handleCalendarToggle('start')}>{startDay}</button>
        </div>

        {endDay && (
          <React.Fragment>
            <div>TO</div>
            <button onClick={handleCalendarToggle('end')}>{endDay}</button>
          </React.Fragment>
        )}
        <div>
          {!endDay && (
            <button onClick={handleAddDay(1)}>
              <LeftRightArrow
                direction="right"
                className="w-8 h-8"
                color="rgb(248,250,252)"
              />
            </button>
          )}
        </div>
      </div>
      <div className="flex p-2 my-2">
        <div className="w-1/2 flex justify-center">
          <button
            onClick={handleMultiDayToggle(false)}
            className={`font-bold text-center w-full  rounded mx-1 ${
              endDay ? 'text-slate-50 bg-gray-700' : 'bg-slate-50 text-gray-700'
            }`}
            disabled={endDay ? false : true}
          >
            Single Day
          </button>
        </div>
        <div className="w-1/2 flex justify-center">
          <button
            onClick={handleMultiDayToggle(true)}
            className={`font-bold text-center w-full  rounded mx-1 ${
              endDay ? 'bg-slate-50 text-gray-700' : 'text-slate-50 bg-gray-700'
            }`}
            disabled={!endDay ? false : true}
          >
            MultiDay
          </button>
        </div>
        <SlidePage direction="inBottom" in={calendarOpen === 'start'}>
          <div
            className={`text-black p-3 pr-6 ${
              calendarOpen && calendarOpen === 'start' ? '' : 'hidden'
            }`}
          >
            <div className="text-white text-center">
              <Title>Start Day</Title>
            </div>
            <Calendar
              onChange={handleDateChange('start')}
              defaultValue={new Date(startDay)}
            />
          </div>
        </SlidePage>
        <SlidePage direction="inBottom" in={calendarOpen === 'end'}>
          <div className={`text-black p-3 pr-6 `}>
            <div className="text-white text-center">
              <Title>End Day</Title>
            </div>
            <Calendar
              onChange={handleDateChange('end')}
              defaultValue={new Date(endDay)}
            />
          </div>
        </SlidePage>
      </div>

      <hr />
      <div className="flex flex-wrap justify-evenly p-2">
        {habits.map((habit) => {
          let recordBadge = (
            <button
              onClick={() => {
                setSelectedHabit(habit)
                handleEditToggle()
              }}
              key={habit._id}
              className={`flex p-2 font-bold justify-between rounded my-1 ${
                viewColumns === 2 ? 'w-2/5' : 'w-full'
              }`}
              style={{
                backgroundColor: `rgb(${habit.color.r},${habit.color.g},${habit.color.b})`,
              }}
            >
              <div>{habit.name}</div>
              <div> {records[habit._id] ? records[habit._id].length : '0'}</div>
            </button>
          )
          if (!allowEmpty && !records[habit._id]) recordBadge = null
          return recordBadge
        })}
      </div>
      {selectedHabit && (
        <EditHabit
          handleClose={handleEditToggle}
          _habitId={selectedHabit._id}
          isOpen={editOpen}
          onDelete={handleHabitDelete}
        />
      )}
    </div>
  )
}

export default SimpleDay
