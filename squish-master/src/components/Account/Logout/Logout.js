import React, { Component } from 'react'
import { withCookies, Cookies } from 'react-cookie'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import '../../Navigation/nav.css'

class Logout extends Component {
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = {
      loggedOut: false,
      email: cookies.get('email')
    }
  }

  

  logout = () => {
    const { cookies } = this.props
    Swal.fire({
      title: 'Are you sure?',
      text: "Squish will always be right here.",
      type: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      closeOnCancel: true,
      closeOnConfirm: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Logging Out!',
          text: 'Check back in anytime.',
          type:'success',
          timer: 1000,
        })
        cookies.remove('email', { path: '/'})
        cookies.remove('code', { path: '/'})
        localStorage.clear();
        this.setState({loggedOut: true})
      }
    })
  }

  render() {
    const { loggedOut } = this.state
    if (loggedOut) {
      return <Redirect to='/'/>
    }
    return(
      <Nav.Link onClick={this.logout}>
        Logout
      </Nav.Link>
    )
  }
}


export default withCookies(Logout)


