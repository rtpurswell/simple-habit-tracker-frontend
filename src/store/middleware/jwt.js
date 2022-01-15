import {} from '../auth'
import { userLoggedIn, jwtReceived, logUserOut, userLoggedOut } from '../auth'
import { resetHabits } from '../habits'
import jwt_decode from 'jwt-decode'

const jwtMiddleware = ({ dispatch }) => (next) => (action) => {
  if (action.type !== jwtReceived.type && action.type !== logUserOut.type)
    return next(action)
  next(action)
  if (action.type === jwtReceived.type) {
    const user = jwt_decode(action.payload.auth)
    if (user.exp + '000' < Date.now()) {
      localStorage.removeItem('habit_auth_token')
      localStorage.removeItem('habit_refresh_token')
      dispatch(resetHabits())
      dispatch(userLoggedOut())
    } else {
      localStorage.setItem('habit_auth_token', action.payload.auth)
      localStorage.setItem('habit_refresh_token', action.payload.refresh)
      dispatch(userLoggedIn(user))
    }
  } else {
    localStorage.removeItem('habit_auth_token')
    localStorage.removeItem('habit_refresh_token')
    dispatch(resetHabits())
    dispatch(userLoggedOut())
  }
}
export default jwtMiddleware
