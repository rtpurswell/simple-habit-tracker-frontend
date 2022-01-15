import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getForgotPasswordSent,
  passwordResetCanceled,
  sendPasswordReset,
} from '../../store/auth'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import BoxContainer from '../common/BoxContainer'
import Title from '../common/Title'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const sent = useSelector(getForgotPasswordSent)
  const dispatch = useDispatch()

  const [delay, setDelay] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (delay !== 0) setDelay(delay - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [delay])

  const handleSendPasswordReset = () => {
    dispatch(sendPasswordReset(email))
    setDelay(30)
  }
  const resendOption = (
    <React.Fragment>
      <Title className="text-3xl my-4">Reset Password</Title>
      <p>
        An email has been sent to {email} with instructiions on resetting your
        password
      </p>
      <div className=" self-center w-full flex justify-center my-3">
        <Button
          color="confirm"
          onClick={handleSendPasswordReset}
          disabled={delay > 0}
        >
          Resend Email {delay > 0 && `(${delay})`}
        </Button>
        <Button
          color="cancel"
          onClick={() => dispatch(passwordResetCanceled())}
        >
          Cancel
        </Button>
      </div>
    </React.Fragment>
  )

  const forgot = (
    <React.Fragment>
      <h1 className="text-3xl my-4 self-center">Find account</h1>
      <p className="self-center">
        Please enter your email to search for your account
      </p>

      <TextInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="Email Address"
        className="my-2 "
      />
      <Button
        color="confirm"
        onClick={handleSendPasswordReset}
        className="mb-2"
      >
        Send Reset Email
      </Button>
    </React.Fragment>
  )
  return <BoxContainer>{sent ? resendOption : forgot}</BoxContainer>
}

export default ForgotPassword
