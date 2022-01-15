import { useSelector } from 'react-redux'
import Login from './Pages/Login'
import HabitList from './Habits/HabitList'
import React from 'react'

import LoadStore from './LoadStore'

import RecordViewSelector from './Records/RecordViewSelector'
function Main() {
  const loggedIn = useSelector((state) => state.auth.loggedIn)

  const content = (
    <LoadStore>
      <RecordViewSelector />
      <HabitList />
    </LoadStore>
  )
  return <div>{loggedIn ? content : <Login />}</div>
}

export default Main
