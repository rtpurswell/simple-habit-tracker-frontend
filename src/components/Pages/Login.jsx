import Button from '../common/Button'

import { useAuth0 } from '@auth0/auth0-react'

function Login() {
  const { loginWithRedirect } = useAuth0()

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
}

export default Login
