import Button from '../common/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import SlidePage from '../common/SlidePage'
import Title from '../common/Title'
import { addHabit } from '../../store/habits'
import * as Yup from 'yup'
import _pick from 'lodash/pick'
import TextInput from '../common/TextInput'
import ColorPicker from '../common/ColorPicker'

function AddHabit(props) {
  const { isOpen, handleClose } = props
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: '',
    color: { r: 244, g: 67, b: 54 },
  })
  const schema = Yup.object({
    name: Yup.string().min(2).max(35).required(),
    color: Yup.object({
      r: Yup.number().min(0).max(255),
      g: Yup.number().min(0).max(255),
      b: Yup.number().min(0).max(255),
    }),
  })

  const handleColorChange = (color) => {
    setValues({ name: values.name, color: _pick(color.rgb, ['r', 'g', 'b']) })
  }

  const validate = (isSubmit) => {
    schema
      .validate(values)
      .then((value) => {
        if (isSubmit) {
          dispatch(addHabit(value))
          setValues({
            name: '',
            color: { r: 244, g: 67, b: 54 },
          })
          handleClose()
        }
      })
      .catch((error) => {
        toast.error(error.errors[0])
        return false
      })
  }
  const handleNameChange = (e) => {
    setValues({ name: e.target.value, color: values.color })
  }
  const handleNameBlur = () => {
    validate(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    validate(true)
  }
  return (
    <SlidePage in={isOpen}>
      <div className="flex flex-grow flex-col p-3 justify-center">
        <div>
          <Title>Add Habit</Title>
        </div>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="Habit Name"
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            value={values.name}
            className="text-gray-900 mb-3"
          />

          <div>
            <ColorPicker color={values.color} onChange={handleColorChange} />
          </div>

          <input
            type="submit"
            value="Add Habit"
            className="border-b-4 text-center py-2 px-4 rounded w-full font-bold text-white bg-orange-400 border-orange-800 my-5 cursor-pointer"
          />
        </form>

        <div className="mt-auto mb-8">
          <Button color="cancel" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </SlidePage>
  )
}

export default AddHabit
