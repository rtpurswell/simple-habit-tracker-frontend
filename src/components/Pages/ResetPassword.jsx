import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  resetPasswordFromKey,
  validatePasswordResetKey,
} from '../../store/auth'
import Button from '../common/Button'
import Title from '../common/Title'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  const params = useParams()
  useEffect(() => {
    dispatch(validatePasswordResetKey(params._userId, params.key))
  }, [params.key, params._userId, dispatch])

  const complete = useSelector((state) => state.auth.forgotPasswordKey.complete)
  const loading = useSelector((state) => state.auth.forgotPasswordKey.loading)
  const valid = useSelector((state) => state.auth.forgotPasswordKey.valid)

  const handleSubmit = (e) => {
    if (password === confirmPassword) {
      dispatch(resetPasswordFromKey(params._userId, params.key, password))
    } else {
      toast('Passwords do not match')
    }
  }
  let content
  if (loading) content = 'Loading...'
  else if (complete)
    content = (
      <React.Fragment>
        <Title className="text-3xl my-4 ">Password Reset!</Title>

        <p>
          Password reset successful. You may now login with your new password
        </p>
        <Link
          to="/"
          className="rounded bg-green-600 my-2 p-1 mr-1 self-center w-2/3"
        >
          Go To Login
        </Link>
      </React.Fragment>
    )
  else if (!valid) content = 'Invalid Key'
  else if (valid)
    content = (
      <React.Fragment>
        <Title className="text-3xl my-4 self-center">Reset Password</Title>
        <input
          type="password"
          value={password}
          className="my-1 p-1 text-black font-bold w-2/3 self-center"
          placeholder="New Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          className="my-1 p-1 text-black font-bold w-2/3 self-center"
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <Button color="confirm" onClick={handleSubmit}>
          Reset Password
        </Button>
      </React.Fragment>
    )

  return (
    <div className="flex w-full  border-2 border-zinc-300 rounded flex-col px-10 sm:w-1/2 md:w-1/2 lg:w-1/3">
      {content}
    </div>
  )
}

export default ResetPassword
