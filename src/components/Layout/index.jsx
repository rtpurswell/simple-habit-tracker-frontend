import { useDispatch, useSelector } from 'react-redux'
import Navbar from './Navbar'
import Main from '../Main'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from '../Pages/ForgotPassword'
import ResetPassword from '../Pages/ResetPassword'
import SignUp from '../Pages/SignUp'
import { jwtReceived } from '../../store/auth'
import Title from '../common/Title'

function Layout(props) {
  const loggedIn = useSelector((state) => state.auth.loggedIn)
  const dispatch = useDispatch()
  if (!loggedIn) {
    const authToken = localStorage.getItem('habit_auth_token')
    if (authToken) {
      dispatch(
        jwtReceived({
          auth: localStorage.getItem('habit_auth_token'),
          refresh: localStorage.getItem('habit_refresh_token'),
        }),
      )
    }
  }
  return (
    <div className=" text-slate-50 bg-gray-800 min-h-screen">
      <div className="landscape-message  fixed top-0 left-0 bg-gray-800 h-screen w-screen flex justify-center items-center z-50">
        <Title>Please turn back to protrait view</Title>
      </div>
      <Navbar />

      <main className="">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signUp" element={<SignUp />}></Route>

          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/resetPassword/:_userId/:key"
            element={<ResetPassword />}
          />
        </Routes>
      </main>
      {props.children}
    </div>
  )
}

export default Layout
