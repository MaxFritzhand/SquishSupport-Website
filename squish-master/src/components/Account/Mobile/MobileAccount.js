import React, { Component } from 'react'
import MobileLogin from './MobileLogin'
import MobileRegister from './MobileRegister'
import './MobileAccount.css'

class MobileAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switch: false
    }
  }

  toggleSignUp = e => {
    this.setState({
      switch: true
    })
  }

  toggleSignIn = e => {
    this.setState({
      switch: false
    })
  }

  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")
  }

  render() {
    return(
      <div className="wrapper">
        {this.state.switch ? <MobileRegister onClick={this.toggleSignIn}/> : <MobileLogin onClick={this.toggleSignUp}/> }
      </div>
    )
  }
}


export default MobileAccount;