import { createSlice, createAction, createSelector } from '@reduxjs/toolkit'
import { apiCallBegan } from './api'

const initialState = {
  loggedIn: false,
  user: {},
  forgotPasswordSent: false,
  forgotPasswordKey: {
    valid: false,
    loading: false,
    complete: false,
  },
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    userLoggedIn: (auth, action) => {
      auth.user = action.payload
      auth.loggedIn = true
    },
    userLoggedOut: (auth, action) => {
      auth.loggedIn = initialState.loggedIn
      auth.user = initialState.user
      auth.forgotPasswordKey = initialState.forgotPasswordKey
      auth.forgotPasswordSent = initialState.forgotPasswordSent
    },
    passwordResetSent: (auth, action) => {
      auth.forgotPasswordSent = true
    },
    passwordResetCanceled: (auth, action) => {
      auth.forgotPasswordSent = false
    },
    passwordResetLoading: (auth, action) => {
      auth.forgotPasswordKey.loading = true
    },
    passwordKeyValidated: (auth, action) => {
      auth.forgotPasswordKey.loading = false
      auth.forgotPasswordKey.valid = true
    },
    passwordKeyRejected: (auth, action) => {
      auth.forgotPasswordKey.loading = false
      auth.forgotPasswordKey.valid = false
    },
    passwordResetFromKey: (auth, action) => {
      auth.forgotPasswordKey.loading = false
      auth.forgotPasswordKey.complete = true
    },
  },
})

export const {
  userLoggedIn,
  userLoggedOut,
  passwordResetSent,
  passwordResetCanceled,
  passwordKeyValidated,
  passwordKeyRejected,
  passwordResetLoading,
  passwordResetFromKey,
} = slice.actions
export const jwtReceived = createAction('auth/jwtReceived')
export const logUserOut = createAction('auth/logUserOut')

export default slice.reducer

//Action Creators
const url = '/auth'
export const loginUser = (email, password) =>
  apiCallBegan({
    url,
    method: 'post',
    data: { email: email, password: password },
    onSuccess: jwtReceived.type,
  })
export const createUser = (user) =>
  apiCallBegan({
    url: '/users',
    method: 'post',
    data: user,
    onSuccess: jwtReceived.type,
  })

export const sendPasswordReset = (email) =>
  apiCallBegan({
    url: '/users/forgotPassword',
    method: 'post',
    data: { email: email },
    onSuccess: passwordResetSent.type,
  })

export const validatePasswordResetKey = (_userId, key) =>
  apiCallBegan({
    url: '/users/forgotPassword/validate',
    method: 'post',
    data: { _userId, key },
    onSuccess: passwordKeyValidated.type,
    onStart: passwordResetLoading.type,
    onError: passwordKeyRejected.type,
  })

export const resetPasswordFromKey = (_userId, key, password) =>
  apiCallBegan({
    url: '/users/forgotPassword',
    method: 'put',
    data: { _userId, key, password },
    onSuccess: passwordResetFromKey.type,
    onStart: passwordResetLoading.type,
  })

//Selectors

export const getLoggedIn = createSelector(
  (state) => state.auth.loggedIn,
  (loggedIn) => loggedIn,
)
export const getCurrentUser = createSelector(
  (state) => state.auth.user,
  (user) => user,
)
export const getForgotPasswordSent = createSelector(
  (state) => state.auth.forgotPasswordSent,
  (forgot) => forgot,
)
