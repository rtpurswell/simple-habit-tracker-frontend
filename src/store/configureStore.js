import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import api from './middleware/api'
import jwt from './middleware/jwt'

const configureStoreFunction = function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api, jwt),
  })
}
export default configureStoreFunction
