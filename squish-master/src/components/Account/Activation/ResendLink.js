import React, { useState, useEffect } from 'react'
import MobileResendLink from '../Mobile/MobileResendLink'
import { useCookies, withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { resendCode } from '../UserFunctions'
import MediaQuery from 'react-responsive'
import imageOne from '../../../assets/login-signup-1.svg'

function ResendLink(props) {
  const [emailState, setEmailState] = useState({email: null})
  const [code, setCode] = useState('')
  const [cookies, setCookie] = useCookies(['code'])



  useEffect(() => {
    const navHome = document.getElementById("nav-home")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
  })

  const sendResetLink = (e) => {
    e.preventDefault();
    const activationCode = Math.floor(1000 + Math.random() * 9000)
    setCookie('code', activationCode, { path: '/'})
    const path = 'https://www.squishsupport.com/account/activate'
    const email = localStorage.email
    localStorage.setItem('key', activationCode)
    const user = {email, activationCode, path }
    setCookie('email', email, { path: '/'})
    resendCode(user).then(response => {
      if (response === "Message Sent") {
        props.history.push('/account/activate')
      }
    })
  }

  


  return(

    <div className="wrapper">
       <MediaQuery minDeviceWidth={581}>
        <div className="main-container" id="main-container">

          <div className="form-container sign-in-container">
            <form className="form-group account-form" onSubmit={sendResetLink}>
              <h1 className="account-header">Resend Activation Code</h1>
              <span>Please enter the email associated with your account.</span>
              <input type="email" className="std-input" name="email" value={localStorage.email} placeholder="Email" required/>
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
          <MobileResendLink />
        </MediaQuery>
    </div>
  )
}

export default compose(
  withCookies,
  withRouter)(ResendLink)