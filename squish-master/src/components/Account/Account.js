import React, { Component } from 'react'
import Login from './Login/Login'
import Register from './Register/Register'
import AccountOverlay from './AccountOverlay'
// import MobileLogin from './Mobile/MobileLogin'
// import MobileRegister from './Mobile/MobileRegister'
import MobileAccount from './Mobile/MobileAccount'
// import MobileAccountOverlay from './Mobile/MobileAccountOverlay'
import MediaQuery from 'react-responsive'
import './account.css'

class Account extends Component {

  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
  }

  render() {
    return(
      <div className="wrapper">
        <MediaQuery minDeviceWidth={581}>
          <div className="main-container" id="main-container">
            <Login />
            <Register />
            <AccountOverlay />
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={580}>
          {/* <div className="main-mobile-container" id="main-mobile-container"> */}
          <div>
            <MobileAccount />
            {/* <MobileLogin/>
            <MobileRegister/> */}
            {/* <MobileAccountOverlay /> */}
          </div>
        </MediaQuery>
      </div>
    )
  }
}


export default Account;