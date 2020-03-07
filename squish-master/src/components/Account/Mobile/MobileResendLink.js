import React, { useState, useEffect } from 'react'
import { useCookies, withCookies } from 'react-cookie'
import { Container, Row, Col } from 'react-bootstrap' 
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { resendCode } from '../UserFunctions'
import imageOne from '../../../assets/login-signup-1.svg'

function MobileResendLink(props) {
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
    // <div className="mobile-form-container mobile-login-container">
    //   <form className="form-group mobile-account-form" onSubmit={sendResetLink}>
    //     <h1 className="mobile-account-header">Resend Activation Code</h1>
    //     <span>Please enter the email associated with your account.</span>
    //     <input type="email" className="std-input" name="email" value={localStorage.email} placeholder="Email" required/>
    //     <button className="std-button" id="send-reset-link" type="submit">Send Reset Link</button>
    //   </form>
    // </div>
    <Container className="mobile-misc-screens-container">
      <Row className="mobile-misc-screens">
        <Col xs={12}>
          <form className="form-group" onSubmit={sendResetLink}>
            <h1>Resend Activation Code</h1>
            <span>Enter the email associated with your account</span>
            <input type="email" className="std-input" name="email" value={localStorage.email} placeholder="Email" required/>
            <button className="std-button" id="send-reset-link" type="submit">Send Reset Link</button>
          </form>
        </Col>
      </Row>
      <Row className="mobile-misc-screens-bottom">
        <Col xs={12}>
          <h1 className="mobile-misc-screens-bottom-subtext">It's Ok, We Forget Things as Well!</h1>
          <center><p className="mobile-misc-screens-bottom-footer">Enter your email and you'll be sent a code to confirm your identity.</p></center>
        </Col>
      </Row>
    </Container>
  )
}

export default compose(
  withCookies,
  withRouter)(MobileResendLink)