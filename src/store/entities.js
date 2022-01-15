import { combineReducers } from 'redux'
import habitReducer from './habits'

export default combineReducers({
  habits: habitReducer,
})
