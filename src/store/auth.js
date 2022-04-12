import { createSlice, createAction, createSelector } from '@reduxjs/toolkit'
import { apiCallBegan } from './api'

const initialState = {
  loggedIn: false,
  tokenValid: false,
  user: {},
  error401count: 0,
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
    error401: (auth, action) => {
      auth.error401count = auth.error401count + 1
    },
    userLoggedIn: (auth, action) => {
      auth.user = action.payload
      auth.tokenValid = true
      auth.loggedIn = true
    },
    userLoggedOut: (auth, action) => {
      auth.loggedIn = initialState.loggedIn
      auth.user = initialState.user
      auth.forgotPasswordKey = initialState.forgotPasswordKey
      auth.forgotPasswordSent = initialState.forgotPasswordSent
      auth.tokenValid = false
    },
    tokenInvalid: (auth, action) => {
      auth.tokenValid = false
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
  tokenInvalid,
  error401,
} = slice.actions
export const jwtReceived = createAction('auth/jwtReceived')
export const logUserOut = createAction('auth/logUserOut')

export const tokenReceived = createAction('auth/tokenReceived')

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
export const getErrorCount = createSelector(
  (state) => state.auth.error401count,
  (error401count) => error401count,
)
export const getTokenValid = createSelector(
  (state) => state.auth.tokenValid,
  (tokenValid) => tokenValid,
)
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
