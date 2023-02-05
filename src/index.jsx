import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Auth0Provider } from '@auth0/auth0-react'
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-5e2zuayl.us.auth0.com"
      clientId="q9f0ETkP46pYmjDSPB2EAVW8w3y6bhzU"
      redirectUri={window.location.origin}
      audience="http://localhost:3001"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
