import { useDispatch, useSelector } from 'react-redux'
import Navbar from './Navbar'
import Main from '../Main'
import { Route, Routes } from 'react-router-dom'
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
    <div className=" text-slate-50 bg-gray-800 min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="landscape-message  fixed top-0 left-0 bg-gray-800 h-screen w-screen flex justify-center items-center z-50">
            <Title>Please turn back to protrait view</Title>
          </div>
          <Navbar />

          <main className="">
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
          </main>
          {props.children}
        </React.Fragment>
      )}
    </div>
  )
}

export default Layout
