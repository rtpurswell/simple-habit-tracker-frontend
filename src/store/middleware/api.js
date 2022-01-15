import axios from 'axios'
import { apiCallBegan, apiCallFailed } from '../api'
import { toast } from 'react-toastify'
import config from '../config'
import { userLoggedOut } from '../auth'
import { resetHabits } from '../habits'
const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type && action.type !== apiCallFailed.type)
    return next(action)

  next(action)
  if (action.type === apiCallBegan.type) {
    const {
      url,
      method,
      data,
      onSuccess,
      onSuccessToast,
      onError,
      onStart,
      headers,
    } = action.payload
    if (onStart) dispatch({ type: onStart, payload: action.payload })
    try {
      const response = await axios.request({
        baseURL: config.apiEndPoint,
        url,
        method,
        data,
        headers,
      })

      dispatch({ type: 'apiCallSuccess', payload: response.data })

      dispatch({ type: onSuccess, payload: response.data })
      if (onSuccessToast) toast(onSuccessToast)
    } catch (error) {
      console.log(error)
      let message
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('habit_auth_token')
          localStorage.removeItem('habit_refresh_token')

          dispatch(userLoggedOut())
          dispatch(resetHabits())
        } else {
          message = error.response.data
        }
      } else {
        message = 'Server Unreachable'
      }
      dispatch({ type: apiCallFailed.type, payload: message })
      if (onError) dispatch({ type: onError, payload: error.response.data })
    }
  } else {
    toast.error(action.payload)
  }
}

export default api
