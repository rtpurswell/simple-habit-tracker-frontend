import { userLoggedIn, logUserOut, userLoggedOut, tokenReceived } from '../auth'
import { resetHabits } from '../habits'

const jwtMiddleware = ({ dispatch }) => (next) => (action) => {
  if (action.type !== logUserOut.type && action.type !== tokenReceived.type)
    return next(action)
  next(action)

  if (action.type === tokenReceived.type) {
    localStorage.setItem('habit_auth_token', action.payload.token)
    dispatch(userLoggedIn(action.payload.user))
  } else {
    localStorage.removeItem('habit_auth_token')
    dispatch(resetHabits())
    dispatch(userLoggedOut())
  }
}
export default jwtMiddleware
