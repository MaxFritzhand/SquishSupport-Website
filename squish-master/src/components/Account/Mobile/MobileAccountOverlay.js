import React, { Component } from 'react'
import './mobile.css'

export default class MobileAccountOverlay extends Component {

  toggleSignIn = (event) => {
    const container = document.getElementById("main-mobile-container")
    container.classList.remove('bottom-panel-active')
  }

  toggleSignUp = (event) => {
    const container = document.getElementById("main-mobile-container")
    container.classList.add('bottom-panel-active')
  }

  render() {
    return(
      <div className="mobile-overlay-container">
        <div className="mobile-overlay">

          <div className="mobile-overlay-panel mobile-overlay-top">
          <h1 className="mobile-account-header">Welcome Back!</h1>
          <p className="mobile-login-signup-text">To access Squish please login with your referred account</p>
          <button className="mobile-button ghost" onClick={this.toggleSignIn}>Sign In</button>
          </div>

          <div className="mobile-overlay-panel mobile-overlay-bottom">
            <h1 className="mobile-account-header">Hello, Friend!</h1>
            <p className="mobile-login-signup-text">Enter your personal credentials and start your journey with us</p>
            <button className="mobile-button ghost" onClick={this.toggleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    )
  }
}

  
  