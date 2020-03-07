import React, { useState, useEffect } from 'react'
import MobileForgotPassword from '../Mobile/MobileForgotPassword'
import MediaQuery from 'react-responsive'
import { useCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import { emailConfirmationCode } from '../UserFunctions'
import imageOne from '../../../assets/login-signup-1.svg'

function ForgotPassword(props) {
  const [emailState, setEmailState] = useState({email: null})
  // const [code, setCode] = useState('')
  const [cookies, setCookie] = useCookies(['code'])
  const [errorState, setError] = useState({error: null})



  useEffect(() => {
    const navHome = document.getElementById("nav-home")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
  })

  const sendResetLink = (e) => {
    e.preventDefault();
    const confirmationCode = Math.floor(1000 + Math.random() * 9000)
    setCookie('code', confirmationCode, { path: '/'})
    const path = 'https://www.squishsupport.com/codeconfirmation'
    const email = emailState.email
    const user = {email, confirmationCode, path }
    setCookie('email', email, { path: '/'})
    emailConfirmationCode(user).then(response => {
      if (response === "Message Sent") {
        props.history.push('/codeconfirmation')
      } else {
        setError({error: response})
      }
    })
  }  



  return(
  

    <div className="wrapper">
      <MediaQuery minDeviceWidth={581}>
        <div className="main-container" id="main-container">

          <div className="form-container sign-in-container">
            <form className="form-group account-form" onSubmit={sendResetLink}>
              <h1 className="account-header">Forgot Password?</h1>
              <span>Enter the email address associated with your account</span>
              <input type="email" className={errorState.error ? "input-error" : "std-input"} name="email" onChange={event => setEmailState({email: event.target.value})} value={emailState.email} placeholder="Email" required/>
              <span id="signup-errors">{errorState.error}</span>
              <button className="std-button" id="send-reset-link" type="submit">Send Reset Link</button>
            </form>
            <div className="circle"></div>
            <div className="circle-2"></div>
          </div>


          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                  <h1 className="account-header">It's OK, We Forget Things As Well!</h1>
                  <p className="login-signup-text">Enter your email and you'll be sent a code to confirm your identity shortly.</p>

                  <div className="login-signup-image-1">
                    <img src={imageOne} id="login-signup-image-1" alt="computer"/>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={580}>
              <MobileForgotPassword />
        </MediaQuery>
    </div>
  )
}

export default withRouter(ForgotPassword)