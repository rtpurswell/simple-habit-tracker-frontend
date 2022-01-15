import moment from 'moment-timezone'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Modal from 'react-modal/lib/components/Modal'
import RemoveIcon from '../common/Icons/RemoveIcon'
import Title from '../common/Title'
import Button from '../common/Button'
import { removeRecord } from '../../store/habits'
function SingleRecord(props) {
  const { record, color, habit } = props
  const dispatch = useDispatch()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const handleDeleteConfirmClose = () => {
    setDeleteModalOpen(false)
  }
  const handleDeleteConfirmOpen = () => {
    setDeleteModalOpen(true)
  }
  const handleDelete = () => {
    dispatch(removeRecord(record._id))
    setDeleteModalOpen(false)
  }
  return (
    <div
      className="w-full p-3 rounded flex "
      style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
    >
      <div className="flex-grow text-center font-bold">
        {moment(record.completedAt).tz(timeZone).format('LLLL')}
      </div>
      <div className="flex-shrink">
        <button onClick={handleDeleteConfirmOpen}>
          <RemoveIcon color={{ r: 230, g: 10, b: 10 }} className="w-8 h-8" />
        </button>
      </div>
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={handleDeleteConfirmClose}
        contentLabel="Are you sure you want to delete"
        className="absolute m-9 bg-white p-8 rounded"
        style={{}}
      >
        <div className="flex flex-col z-50">
          <Title>Delete Record</Title>
          <br />
          <h3>
            Are you sure you want to delete this record for {habit.name} at{' '}
            {moment(record.completedAt).tz(timeZone).format('LLL')}?
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
            <Button className=" my-2 " color="cancel" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SingleRecord
