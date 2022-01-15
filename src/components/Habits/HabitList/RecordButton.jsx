import { useState, useRef } from 'react'
import {
  getPreviousRecord,
  addRecordNow,
  removeRecord,
} from '../../../store/habits'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import Title from '../../common/Title'
import Button from '../../common/Button'
function RecordButton(props) {
  const { color, _habitId, preview } = props
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const addLocation = useRef(null)
  const removeLocation = useRef(null)

  const dispatch = useDispatch()
  const previousRecord = useSelector(getPreviousRecord(_habitId))

  const defaultSytles = { borderColor: `rgb(${color.r},${color.g},${color.b})` }
  const [addStyles, setAddStyles] = useState({ backgroundColor: undefined })
  const [removeStyles, setRemoveStyles] = useState({
    backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
  })
  const handleDeleteConfirmClose = () => {
    setModalIsOpen(false)
  }
  const handleDeleteConfirmOpen = () => {
    setModalIsOpen(true)
  }
  const handleRecordDelete = () => {
    setModalIsOpen(false)
    const offset =
      addLocation.current.offsetLeft - removeLocation.current.offsetLeft
    setRemoveStyles({
      backgroundColor: undefined,
      transform: `translateX(${offset}px)`,
      transition: 'all 0.5s ease',
    })
    dispatch(removeRecord(previousRecord))
    setTimeout(() => {
      setRemoveStyles({
        backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
      })
    }, 480)
  }

  const handleAddButton = () => {
    const offset =
      addLocation.current.offsetLeft - removeLocation.current.offsetLeft
    setAddStyles({
      backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
      transform: `translateX(-${offset}px)`,
      transition: 'all 0.5s ease',
    })
    if (previousRecord) {
      setRemoveStyles({
        backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
        transform: `translateX(-${offset}px)`,
        transition: 'all 0.5s ease',
      })
    }
    dispatch(addRecordNow(_habitId))
    setTimeout(() => {
      setAddStyles({
        backgroundColor: undefined,
      })
      setRemoveStyles({
        backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
      })
    }, 485)
  }
  return (
    <div className="flex flex-grow overflow-hidden" style={{ translate: '' }}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleDeleteConfirmClose}
        contentLabel="Are you sure you want to delete"
        className="absolute m-9 bg-white p-8 rounded"
        style={{}}
      >
        <div className="flex flex-col z-50">
          <Title>Delete Record</Title>
          <br />
          <h3>Are you sure you want to delete this record?</h3>
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
              onClick={handleRecordDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <div className="w-1/2 flex justify-end">
        <div className="w-8 h-8 flex" ref={removeLocation}>
          {!preview && previousRecord && (
            <button onClick={handleDeleteConfirmOpen}>
              <div
                className={`rounded-full w-8 h-8 border-4`}
                style={{ ...defaultSytles, ...removeStyles }}
              ></div>
            </button>
          )}
        </div>
      </div>
      <div className=" flex-grow justify-end flex">
        <div className="flex w-8 h-8" ref={addLocation}>
          <button onClick={preview ? undefined : handleAddButton}>
            <div
              className={`rounded-full w-8 h-8 border-4 `}
              style={{ ...defaultSytles, ...addStyles }}
            ></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecordButton
