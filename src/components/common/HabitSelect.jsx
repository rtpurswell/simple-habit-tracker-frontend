import { useState } from 'react'

function HabitSelect(props) {
  //options is an array of objects with the following signature {value, color , name }
  const { habits, value, onChange } = props
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = (optionValue) => () => {
    if (!menuOpen) return setMenuOpen(true)
    onChange(optionValue)
    setMenuOpen(false)
  }
  return (
    <div
      className={`flex flex-col px-3 max-h-60 flex-grow ${
        menuOpen && 'overflow-y-scroll'
      }`}
    >
      {habits.map((habit) => {
        return (
          <div
            style={{
              backgroundColor: `rgb(${habit.color.r},${habit.color.g},${habit.color.b})`,
            }}
            className={`p-3 w-full rounded my-1 ${
              habit._id !== value ? (!menuOpen ? 'hidden' : '') : ''
            }`}
            onClick={handleClick(habit._id)}
          >
            {habit.name}
          </div>
        )
      })}
    </div>
  )
}

export default HabitSelect
