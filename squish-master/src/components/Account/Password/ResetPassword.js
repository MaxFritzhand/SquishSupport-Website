import React, { Component } from 'react'
import MobileResetPassword from '../Mobile/MobileResetPassword'
import MediaQuery from 'react-responsive'
import { withCookies } from 'react-cookie'
import { withRouter} from 'react-router-dom'
import { changePassword, getUser } from '../UserFunctions'
import { compose } from 'recompose'
import imageOne from '../../../assets/login-signup-1.svg'

class ResetPassword extends Component {
  constructor(props) {
    super(props) 
    const { cookies } = props
    this.state = {
      email: cookies.get('email'),
      password: null,
      passwordMatch: null,
      noMatch: null
    }
  } 

  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changePassword = (e) => {
    e.preventDefault();
    const { password, passwordMatch, email } = this.state
    const user = {password, email }
    if ( password === passwordMatch ) {
      changePassword(user).then(res => {
        if (res.token) {
          getUser().then(() => {
            this.props.history.push('/profile')
          })
        }
      })
    } else {
      this.setState({
        noMatch: "Passwords do not match!"
      })
    }
  }

  render() {
    const { password, passwordMatch, noMatch} = this.state
    return(

      <div className="wrapper">
        <MediaQuery minDeviceWidth={581}>
          <div className="main-container" id="main-container">

            <div className="form-container sign-in-container">
              <form className="form-group account-form" onSubmit={this.changePassword}>
                <h1 className="account-header">Confirmed!</h1>
                <span id="new-password-text">Please enter a new password and submit to confirm</span>
                <input type="password" name="password" className="password-std-input" value={password} onChange={this.onChange} pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}" title="Must contain at least one number, one uppercase letter, and at least 8 ore more characters" placeholder="Password" />
                <input type="password" name="passwordMatch" className={noMatch ? 'password-input-error' : 'password-std-input'} value={passwordMatch} onChange={this.onChange} pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{6,}" title="Must contain at least one number, one uppercase letter, and at least 8 ore more characters" placeholder="Confirm Password" />
                <center><span id="signup-errors">{noMatch}</span></center>
                <button className="std-button" id="submit-new-password" type="submit">Set New Password</button>
              </form>
              <div className="circle"></div>
              <div className="circle-2"></div>
            </div>


            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                    <h1 className="account-header">Almost There!</h1>
                    <p className="login-signup-text">Enter a new password and you'll be back on Squish in no time!</p>
      

                    <div className="login-signup-image-1">
                      <img src={imageOne} id="login-signup-image-1" alt="computer"/>
                    </div>
                </div>
              </div>
            </div>

          </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={580}>
            <MobileResetPassword />
        </MediaQuery>
      </div>
    )
  }
}

export default compose(
  withCookies,
  withRouter)(ResetPassword)
