import React, { Component } from 'react'
import imageOne from '../../assets/login-signup-1.svg'
import imageTwo from '../../assets/login-signup-2.svg'
import imageThree from '../../assets/login-signup-3.svg'

class AccountOverlay extends Component {
  
  toggleSignIn = (event) => {
    const container = document.getElementById("main-container")
    const navHome = document.getElementById("nav-home")
    const navLinks = document.getElementById("nav-links")
    container.classList.remove('right-panel-active')
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg") 
    navLinks.classList.add("purple-bg")
    navLinks.classList.remove("strange")
  }

  toggleSignUp = (event) => {
    const container = document.getElementById("main-container")
    const navHome = document.getElementById("nav-home")
    const navLinks = document.getElementById("nav-links")
    container.classList.add('right-panel-active')
    navHome.classList.remove("white-bg")
    navHome.classList.add("purple-bg")
    navLinks.classList.add("strange")
    navLinks.classList.remove("white-bg")
  }
  render() {
    return(
      <div className="overlay-container">
        <div className="overlay">
  
          <div className="overlay-panel overlay-left">
            <h1 className="account-header">Welcome Back!</h1>
            <p className="login-signup-text">To access Squish please login with your referred account</p>
            <button className="std-button ghost" id="signIn" onClick={this.toggleSignIn}>Sign In</button>
            <div className="white-circle-2"></div>
            <div className="login-signup-image-2">
              <img src={imageTwo} id="login-signup-image-2" alt="floating avatars"/>
            </div>
            <div className="login-signup-image-3">
              <img src={imageThree} id="login-signup-image-3" alt="avatar on bench"/>
            </div>
          </div> 
  
          <div className="overlay-panel overlay-right">
            <h1 className="account-header">Hello, Friend!</h1>
            <p className="login-signup-text">Enter your personal credentials and start your journey with us</p>
            <button className="std-button ghost" id="signUp" onClick={this.toggleSignUp}>Sign Up</button>
            <div className="login-signup-image-1">
              <img src={imageOne} id="login-signup-image-1" alt="computer"/>
            </div>
          </div>
  
      </div>
    </div>
    )
  }
}

export default AccountOverlay;