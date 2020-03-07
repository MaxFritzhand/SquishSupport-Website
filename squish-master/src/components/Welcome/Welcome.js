import React, {Component} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { flaskFinishedSpecialties} from '../Account/CheckUserOnboardingStatus'
import { withRouter } from 'react-router-dom'
import { checkActivatedUser } from '../Account/UserFunctions'
import SquishImage from '../../assets/SquishImage.svg'
import { Link } from 'react-router-dom'
import '../../App.css'
import './welcome.css'


class Welcome extends Component {
  componentDidMount() {
    const navHome = document.getElementById("nav-home")
    const navLinks = document.getElementById("nav-links")
    navHome.classList.add("purple-bg")
    navHome.classList.remove("white-bg")
    navLinks.classList.remove("purple-bg")
    navLinks.classList.add("welcome-page")
    checkActivatedUser().then((response) => {
      if (response === 'false') {
        this.props.history.push('/account/activate')
      } else {
        flaskFinishedSpecialties().then((response) => {
          if (response === 'false') {
            this.props.history.push('/onboarding/specialties')
          }
        })
      }
    })
  }

  render() {

    return(
      <div className="wrapper seek-or-support-bg">

        <center>
        <Container className="seek-support-container">
          <Row className="choice-row">
            <Col id="continue-column" >
              <div id="continue-text">Provide Support</div>
              <div>Now that you've completed your profile, you're ready to become a full fledged Squisher! Utilize your past experience to connect with individuals enduring similar issues. Click 'Squish' below to access your dashboard.</div>
              <Link to="/profile"> 
                <button className="choice-button">Squish</button>
              </Link>
            </Col>
            <Col id="image-column">   
              <img src={SquishImage} id="squish-image" alt="Squish Logo"/>
            </Col>
          </Row>
              <div id="welcome-circle-1"></div>
              <div id="welcome-circle-2"></div>
        </Container>
        </center>

      </div>
    )
  }
}

export default withRouter(Welcome)

