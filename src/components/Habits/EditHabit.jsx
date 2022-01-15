import { useDispatch, useSelector } from 'react-redux'
import {
  getHabitRecords,
  updateHabit,
  removeHabit,
  getHabitById,
  getStreaks,
  getBasicStats,
} from '../../store/habits'
import SlidePage from '../common/SlidePage'
import ColorPicker from '../common/ColorPicker'
import Button from '../common/Button'
import EditIcon from '../common/Icons/EditIcon'
import React, { useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import Title from '../common/Title'
import * as Yup from 'yup'
import _pick from 'lodash/pick'
import Modal from 'react-modal'
import SingleRecord from '../Records/SingleRecord'
import AllRecords from '../Records/Habit/AllRecords'
import LastYear from '../Records/Habit/LastYear'
import SmallButton from '../common/SmallButton'
import TextInput from '../common/TextInput'
import StreaksAndStats from '../Records/Habit/StreaksAndStats'
import { toast } from 'react-toastify'
import LastMonth from '../Records/Habit/LastMonth'
function EditHabit(props) {
  const {
    handleClose,
    isOpen,
    _habitId,
    onDelete,
    defaultRecord = null,
  } = props

  const nodeRef = useRef(null)
  const [editOpen, setEditOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const dispatch = useDispatch()
  const habit = useSelector(getHabitById(_habitId))
  const records = useSelector(getHabitRecords(_habitId))
  const streaks = useSelector(getStreaks(_habitId))
  const stats = useSelector(getBasicStats(_habitId))
  const [values, setValues] = useState({
    name: habit.name,
    color: _pick(habit.color, ['r', 'g', 'b']),
  })

  useEffect(() => {
    if (defaultRecord) setSelectedRecord(defaultRecord)
  }, [defaultRecord])

  const handleColorChange = (color) => {
    setValues({ name: values.name, color: _pick(color.rgb, ['r', 'g', 'b']) })
  }
  const schema = Yup.object({
    name: Yup.string().min(2).max(35).required(),
    color: Yup.object({
      r: Yup.number().min(0).max(255),
      g: Yup.number().min(0).max(255),
      b: Yup.number().min(0).max(255),
    }),
  })
  const validate = (isSubmit) => {
    schema
      .validate(values)
      .then((value) => {
        if (isSubmit) {
          dispatch(
            updateHabit({
              _id: habit._id,
              name: values.name,
              color: values.color,
            }),
          )

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

  const handleDeleteConfirmClose = () => {
    setModalIsOpen(false)
  }
  const handleDeleteConfirmOpen = () => {
    setModalIsOpen(true)
  }
  const handleHabitDelete = () => {
    onDelete()
    dispatch(removeHabit(habit))
    handleDeleteConfirmClose()
    handleClose()
  }
  const handleRecordDelete = () => {}
  const renderSelectedRecord = (_recordId) => {
    const recordIndex = records.findIndex((record) => record._id === _recordId)
    if (recordIndex !== -1)
      return (
        <div className="flex flex-col mb-8">
          <Title>Selected Record</Title>
          <div>
            <SingleRecord
              color={habit.color}
              onDelete={handleRecordDelete}
              record={records[recordIndex]}
              habit={habit}
            />
          </div>
        </div>
      )
    return null
  }

  return (
    <SlidePage in={isOpen}>
      <div
        className="flex justify-center items-center text-3xl mb-3 p-5"
        style={{
          backgroundColor: `rgb(${habit.color.r},${habit.color.g},${habit.color.b})`,
        }}
      >
        <div className="flex-grow"> {habit.name}</div>
        {editOpen ? null : (
          <div className="w-1/12 flex items-center">
            <button
              className={`flex items-center text-xl  rounded p-2 px-2 ${
                editOpen ? 'bg-red-500' : 'bg-gray-700'
              }`}
              onClick={() => setEditOpen(!editOpen)}
            >
              <EditIcon color="rgb(248,250,252)" className="w-full h-full" />
            </button>
          </div>
        )}
      </div>

      <CSSTransition
        in={editOpen}
        timeout={500}
        classNames="slidePageLeft"
        mountOnEnter={true}
        unmountOnExit={true}
        nodeRef={nodeRef}
      >
        <div className="flex flex-col bg-gray-500 p-2" ref={nodeRef}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <Title>Edit Habit</Title>
              <div className="ml-auto">
                <button
                  className={`flex items-center text-xl  rounded p-2 px-4 ${
                    editOpen ? 'bg-red-500' : 'bg-gray-700'
                  }`}
                  onClick={() => setEditOpen(!editOpen)}
                >
                  <EditIcon color="rgb(248,250,252)" className="w-5 h-5" />
                  <div>Close Edit</div>
                </button>
              </div>
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

              <ColorPicker color={values.color} onChange={handleColorChange} />

              <input
                type="submit"
                value="Update Habit"
                className="border-b-4 text-center py-2 px-4 rounded w-full font-bold text-white bg-orange-400 border-orange-800 my-5 cursor-pointer"
              />
            </form>
            <div className="flex justify-end mt-3">
              <div className="w-1/5">
                <SmallButton color="cancel" onClick={handleDeleteConfirmOpen}>
                  Delete
                </SmallButton>
              </div>
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleDeleteConfirmClose}
              contentLabel="Are you sure you want to delete"
              className="absolute m-9 bg-white p-8 rounded"
              style={{}}
            >
              <div className="flex flex-col z-50">
                <Title>Delete Habit</Title>
                <br />
                <h3>
                  Are you sure you want to delete this habit AND all of its
                  records?
                </h3>
                <br />
                <p className="font-bold mb-5">THIS CAN NOT BE UNDONE</p>
                <div className="flex flex-col justify-between">
                  <Button
                    className=" my-2 "
                    color="confirm"
                    onClick={handleDeleteConfirmClose}
                  >
                    GO BACK
                  </Button>
                  <span className=" my-2 text-center font-bold">OR</span>
                  <Button
                    className=" my-2 "
                    color="cancel"
                    onClick={handleHabitDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </CSSTransition>
      <LastYear _habitId={habit._id} color={habit.color} />
      <LastMonth _habitId={habit._id} color={habit.color} />
      <StreaksAndStats streaks={streaks} stats={stats} />
      <div className="pr-6 pl-3 flex flex-col flex-grow ">
        <div className="flex flex-col mt-auto">
          {selectedRecord && renderSelectedRecord(selectedRecord)}

          <AllRecords habit={habit} />
        </div>
      </div>
      <div className=" mb-8">
        <Button color="cancel" onClick={handleClose}>
          Close
        </Button>
      </div>
    </SlidePage>
  )
}

export default EditHabit
