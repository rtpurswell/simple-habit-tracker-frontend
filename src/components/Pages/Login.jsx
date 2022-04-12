import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../../store/auth'
import Button from '../common/Button'
import BoxContainer from '../common/BoxContainer'
import Title from '../common/Title'
import { useAuth0 } from '@auth0/auth0-react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginWithRedirect } = useAuth0()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    dispatch(loginUser(email, password))
  }
  return (
    <div>
      <Button
        onClick={() => {
          loginWithRedirect()
        }}
      >
        Login
      </Button>
    </div>
  )
  return (
    <BoxContainer>
      <Title>Log In</Title>
      <div
        className="flex flex-col justify-center items-center"
        onClick={undefined}
      >
        <input
          className="rounded h-8  text-black font-bold w-full my-2 p-2 "
          type="email"
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <input
          className="rounded h-8  text-black font-bold  w-full my-2 p-2 "
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <Button color="primary" onClick={handleSubmit}>
          Log In
        </Button>
      </div>
      <Link to="/forgotPassword" className="self-center  text-orange-600">
        Forgot Password?
      </Link>

      <span className="self-center font-bold text-2xl my-3 ">OR</span>
      <Link to="/signUp">
        <Button color="confirm" className="mb-3">
          Create An Account
        </Button>
      </Link>
    </BoxContainer>
  )
}

export default Login
