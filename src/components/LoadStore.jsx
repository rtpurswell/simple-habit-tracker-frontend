import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadHabits, loadRecords } from '../store/habits'
function LoadStore(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadHabits())
    dispatch(loadRecords())
  }, [dispatch])

  return <React.Fragment>{props.children}</React.Fragment>
}

export default LoadStore
