import SlidePage from '../common/SlidePage'
import { useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import Title from '../common/Title'
import { useSelector } from 'react-redux'
import { getHabits } from '../../store/habits'
import HabitSelect from '../common/HabitSelect'
import Button from '../common/Button'
import { useDispatch } from 'react-redux'
import { addRecordPast } from '../../store/habits'
function AddRecord(props) {
  const habits = useSelector(getHabits)
  const dispatch = useDispatch()
  const { isOpen, handleClose, time } = props
  const [value, setValue] = useState(new Date(time))
  const [selectedHabit, setSelectedHabit] = useState(null)

  useEffect(() => {
    setValue(new Date(time))
  }, [time])
  const handleDateChange = (date) => {
    setValue(date)
  }

  useEffect(() => {
    if (habits.length > 0) setSelectedHabit(habits[0]._id)
  }, [habits])

  const handleRecordAdd = () => {
    dispatch(addRecordPast(selectedHabit, value.toISOString()))
    handleClose()
  }
  return (
    <SlidePage in={isOpen}>
      <div className="flex flex-col p-2 flex-grow">
        <div>
          <Title>Add Custom Record</Title>
        </div>

        <div className="flex p-2">
          <div className="font-bold flex items-center">Habit:</div>
          <HabitSelect
            value={selectedHabit}
            onChange={setSelectedHabit}
            habits={habits}
          />
        </div>
        <div className="flex my-3 p-2">
          <div className="font-bold flex items-center">Completed:</div>
          <div className="flex-grow text-black bg-white">
            <DateTimePicker onChange={handleDateChange} value={value} />
          </div>
        </div>
        <div>
          <Button color="confirm" onClick={handleRecordAdd}>
            Add Record
          </Button>
        </div>
        <div className="mt-auto mb-8">
          <Button color="cancel" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </SlidePage>
  )
}

export default AddRecord
