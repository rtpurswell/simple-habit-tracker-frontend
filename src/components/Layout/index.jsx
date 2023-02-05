import { useDispatch, useSelector } from 'react-redux'
import Navbar from './Navbar'
import Main from '../Main'
import {
  getTokenValid,
  tokenReceived,
  userLoggedOut,
  getErrorCount,
} from '../../store/auth'
import Title from '../common/Title'
import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import Loading from '../common/Loading'
function Layout(props) {
  const dispatch = useDispatch()
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    getAccessTokenSilently,
  } = useAuth0()
  const tokenValid = useSelector(getTokenValid)
  const error401Count = useSelector(getErrorCount)

  useEffect(() => {
    if (error401Count > 2) {
      logout()
      dispatch(userLoggedOut())
    }
  }, [error401Count])
  useEffect(() => {
    if (isAuthenticated && !tokenValid) {
      const getAndStoreAccessToken = async () => {
        try {
          const accessToken = await getAccessTokenSilently()
          dispatch(tokenReceived({ token: accessToken, user: user }))
        } catch (err) {
          logout()
          dispatch(userLoggedOut())
          console.log(err)
        }
      }
      getAndStoreAccessToken()
    }
  }, [tokenValid, isAuthenticated])

  return (
    <div className=" text-slate-50">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Main />
          {props.children}
        </>
      )}
    </div>
  )
}

export default Layout
