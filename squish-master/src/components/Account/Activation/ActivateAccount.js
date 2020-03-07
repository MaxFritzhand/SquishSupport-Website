import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import MobileActivateAccount from '../Mobile/MobileActivateAccount'
import MediaQuery from 'react-responsive'
import { withCookies } from 'react-cookie'
import imageOne from '../../../assets/login-signup-1.svg'
import { activationLogin, activate, checkActivatedUser } from '../UserFunctions'
import { flaskFinishedOnboarding, flaskFinishedProfile, flaskFinishedSpecialties} from '../CheckUserOnboardingStatus'
import '../account.css'


class ActivateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activationKey: '',
      activated: false,
      invalidCode: null
    }
  }

  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    const navLinks = document.getElementById("nav-links")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
    navLinks.classList.add("purple-bg")
    navLinks.classList.remove("white-bg")

    flaskFinishedOnboarding().then((response) => {
      if (response === 'true') {
        this.props.history.push('/profile')
      } else {
        flaskFinishedSpecialties().then((response => {
          if (response === 'true') {
            this.props.history.push('/onboarding/complete-profile')
          } else {
            checkActivatedUser().then((response => {
              if (response === 'true') {
                this.props.history.push('/onboarding/specialties')
              }
            }))
          }
        }))
      }
    })
  }

  onChange = (e) => {
    this.setState({
      activationKey: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email")
    const key = localStorage.getItem("key")
    const user = {
      email: email,
      code: key
    }

    if (key === this.state.activationKey) {
      activate(user).then(res => {
        if (res.success) {
          activationLogin(user).then(res => {
            if (res.email) {
              this.setState({activated: true})
            }
          })
        }
      })
    } else {
      this.setState({
        invalidCode: "Incorrect Activation Code"
      })
    }
  }

  resendLink = (e) => {
    e.preventDefault()
    localStorage.removeItem('key')
    this.props.history.push('/resend-link')
  }


  render() {
    const { activated, invalidCode } = this.state

    if ( activated ) {
      return <Redirect to='/onboarding/specialties'/> 
    }

    return(

      <div className="wrapper">
        <MediaQuery minDeviceWidth={581}>
          <div className="main-container" id="main-container">

            <div className="form-container sign-in-container">
              <form className="form-group account-form" onSubmit={this.onSubmit}>
                <h1 className="account-header">Activate Account</h1>
                <span>Enter the activation key sent to your email address</span>
                <div id="activation-input-container">
                  <input type="number" className={invalidCode ? "activation-input-error " : "short-std-input"} value={this.state.activationKey} min="1000" max="9999" onChange={this.onChange} placeholder="Code" required/>
                  <center><p id="activation-errors">{invalidCode}</p> </center>
                </div>
                <button className="std-button" type="submit">Submit Code</button>
                <div onClick={this.resendLink}>Resend Code?</div>
              </form>
              <div className="circle"></div>
              <div className="circle-2"></div>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                    <h1 className="account-header">Get ready to complete your Profile!</h1>
                    <p className="login-signup-text">After activation, you will be directed to our onboarding process.</p>

                    <div className="login-signup-image-1">
                      <img src={imageOne} id="login-signup-image-1" alt="computer"/>
                    </div>
                </div>
              </div>
            </div>

          </div>
          </MediaQuery>

          <MediaQuery maxDeviceWidth={580}>
            <MobileActivateAccount />
          </MediaQuery>
      </div>
    )
  }
}

export default withCookies(ActivateAccount);