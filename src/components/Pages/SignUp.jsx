import BoxContainer from '../common/BoxContainer'
import TextInput from '../common/TextInput'
import Button from '../common/Button'
import Title from '../common/Title'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../store/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const loggedIn = useSelector((state) => state.auth.loggedIn)
  const navigate = useNavigate()
  useEffect(() => {
    if (loggedIn) navigate('/')
  })
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (password === confirmPassword) {
      dispatch(
        createUser({
          name,
          email,
          password,
        }),
      )
    } else {
      toast.error('Passwords do not match')
    }
  }
  return (
    <BoxContainer>
      <Title className="text-3xl self-center my-3">Sign Up</Title>

      <div className="flex flex-col">
        <TextInput
          type="text"
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          placeholder="Name"
          className="my-1"
        />
        <TextInput
          type="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
          placeholder="Email Address"
          className="my-1"
        />
        <TextInput
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
          placeholder="Password"
          className="my-1"
        />
        <TextInput
          type="password"
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          value={confirmPassword}
          placeholder="Confirm Password"
          className="my-1"
        />
        <Button color="primary" onClick={handleSubmit} className="my-1 mb-3">
          Sign Up
        </Button>
      </div>
    </BoxContainer>
  )
}

export default SignUp
