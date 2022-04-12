import { useState } from 'react'
import EditIcon from '../../common/Icons/EditIcon'
import EditHabit from '../EditHabit'
import RecordButton from './RecordButton'
function Habit(props) {
  const { name, color, _id, preview } = props
  const [editIsOpen, setEditIsOpen] = useState(false)

  const handleEditClose = () => {
    setEditIsOpen(false)
  }
  const handleHabitDelete = () => {}
  return (
    <div
      className="flex w-full border-2 rounded p-2 my-2"
      style={{ borderColor: `#${color}` }}
    >
      <div className="w-1/12">
        <button
          onClick={() => {
            setEditIsOpen(true)
          }}
        >
          <EditIcon
            className="w-full h-full"
            style={{ fill: `rgb(${color.r},${color.g},${color.b})` }}
          />
        </button>
      </div>
      <div className="flex-grow flex items-center pl-2">
        <h3
          style={{ color: `rgb(${color.r},${color.g},${color.b})` }}
          className="font-bold text-2xl "
        >
          {name}
        </h3>
      </div>
      <div className="w-1/3">
        <RecordButton _habitId={_id} color={color} preview={preview} />
      </div>

      {!preview ? (
        <EditHabit
          handleClose={handleEditClose}
          isOpen={editIsOpen}
          _habitId={_id}
          onDelete={handleHabitDelete}
        />
      ) : null}
    </div>
  )
}

export default Habit
