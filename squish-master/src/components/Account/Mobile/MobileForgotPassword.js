import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { emailConfirmationCode } from '../UserFunctions'


function MobileForgotPassword(props) {
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
    <Container className="mobile-misc-screens-container">
      <Row className="mobile-misc-screens">
        <Col xs={12}>
          <form className="form-group" onSubmit={sendResetLink}>
            <h1>Forgot Password?</h1>
            <span>Enter the email associated with your account</span>
            <input type="email" className={errorState.error ? "input-error" : "std-input"} name="email" onChange={event => setEmailState({email: event.target.value})} value={emailState.email} placeholder="Email" required/>
            <span id="signup-errors">{errorState.error}</span>
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

export default withRouter(MobileForgotPassword)