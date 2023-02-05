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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 lg:grid-cols-3">
        <RecordViewSelector />
        <HabitList />
      </div>
    </LoadStore>
  )
  return <main>{loggedIn ? content : <Login />}</main>
}

export default Main
