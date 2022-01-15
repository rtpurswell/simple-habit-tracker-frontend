import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getHabits,
  loadHabits,
  getLoading,
  getError,
  resetLastFetch,
} from '../../../store/habits'
import Title from '../../common/Title'
import Habit from './Habit'
import PlusIcon from '../../common/Icons/PlusIcon'
import AddHabit from '../AddHabit'
import Loading from '../../common/Loading'
import Button from '../../common/Button'
function HabitList() {
  const [addHabitOpen, setAddHabbitOpen] = useState(false)
  const dispatch = useDispatch()

  const habits = useSelector(getHabits)

  const isLoading = useSelector(getLoading)
  const isError = useSelector(getError)

  const handleAddHabitToggle = () => {
    setAddHabbitOpen(!addHabitOpen)
  }
  let content
  if (isLoading) {
    content = <Loading />
  } else if (isError) {
    content = (
      <div>
        Loading Habits Failed.{' '}
        <Button
          color="confirm"
          onClick={() => {
            dispatch(resetLastFetch())
            dispatch(loadHabits())
          }}
        >
          Retry
        </Button>
      </div>
    )
  } else {
    content = (
      <div className="flex flex-col w-full p-1">
        <div className="flex ">
          <div className="flex w-1/2 justify-start">
            <Title>My Habits</Title>
          </div>
          <div className="flex w-1/2 justify-end">
            <span className="self-center">
              <button
                onClick={() => {
                  if (!addHabitOpen) handleAddHabitToggle()
                }}
              >
                <PlusIcon
                  className="h-7 w-7"
                  color={{ r: 34, g: 197, b: 94 }}
                />
              </button>
            </span>
          </div>
        </div>

        {habits.map((habit) => (
          <Habit
            key={habit._id}
            name={habit.name}
            color={habit.color}
            _id={habit._id}
          />
        ))}
      </div>
    )
  }

  return (
    <React.Fragment>
      <AddHabit isOpen={addHabitOpen} handleClose={handleAddHabitToggle} />

      {content}
    </React.Fragment>
  )
}

export default HabitList
