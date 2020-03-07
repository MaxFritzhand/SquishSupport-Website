import React, { Component } from 'react'
import { Container, Row, Col, Card} from 'react-bootstrap'
import TodoBox from '../SupporterNotes/TodoBox'
import { flaskFinishedSpecialties, flaskFinishedProfile } from '../Account/CheckUserOnboardingStatus'
import { checkActivatedUser } from '../Account/UserFunctions'
import Logo from './assets/Squish LOGO svg.svg'
import Calendar from 'react-calendar'
import './sample.css'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: localStorage.name,
      email: localStorage.email,
      experience: localStorage.experience,
      city: localStorage.city,
      userState: localStorage.state,
      university: localStorage.university,
      specialties: localStorage.specialties,
      specialtiesCount: localStorage.specialtiesCount,
      toggle: false,
      date: new Date()
    }
  }

  onChange = date => this.setState({date})

  componentDidMount() {
    const navHome = document.getElementById("nav-home") 
    navHome.classList.remove("purple-bg")
    navHome.classList.add("white-bg")


    checkActivatedUser().then((response) => {
      if (response === 'false') {
        this.props.history.push('/account/activate')
      } else {
        flaskFinishedSpecialties().then((response) => {
          if (response === 'false') {
            this.props.history.push('/onboarding/specialties')
          } else {
            flaskFinishedProfile().then((response) => {
              if (response === 'false') {
                this.props.history.push('/onboarding/complete-profile')
              }
            })
          }
        })
      }
    })
  }


  render() {
    // const {name, email, experience, city, userState, university, specialties, specialtiesCount} = this.state
    const { name } = this.state

    return(
      <div className="profile-page-container">
        {/* SIDEBAR */}
          <div className="vertical-nav bg-white" id="sidebar">
            <div className="py-4 px-3 mt-4 mb-4">
              <div className="media d-flex align-items-center" id="sidebar-top-sec">
                <img src={Logo} alt="Temporary Squish Logo for User Avatar" width="60" className="mr-3 rounded-circle img-thumbnail shadow-sm"/>
                <div className="media-body">
                  <h5 className="m-0">{name}</h5>
                </div>
              </div>
            </div>

        <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Widgets</p>

        <ul className="nav flex-column bg-white mb-0 vertical-nav-items">
          <li className="nav-item">
            <a href="#" className="nav-link text-dark  ">
              <i className="fa fa-calendar mr-2 text-primary fa-fw"></i>
                Schedule
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark  ">
              <i className="fa fa-address-book mr-2 text-primary fa-fw"></i>
                Appointments
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark  ">
              <i className="fa fa-comments-o mr-2 text-primary fa-fw"></i>
                Messages
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark  ">
              <i className="fa fa-usd mr-2 text-primary fa-fw"></i>
                Wallet
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark  ">
              <i className="fa fa-cogs mr-2 text-primary fa-fw"></i>
                Settings
            </a>
          </li>
        </ul>
      </div>

      {/* DASHBOARD */}
        <Container id="dashboard-main" className="p-5">
        {/* First Row */}
          <Row id="dash-sec-1">
            <Col xs={12}>
              <center><div id="welcome-text">Dashboard</div></center>
            </Col>
          </Row>
        {/* Second Row */}
        <Container className="dash-sec" fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={4} className="phone-resize">
              <Card id="appointments-card" >
                <Card.Body>
                  <Row>
                    <Col xs={12} sm={4}>
                      <div className="card-icon">
                        <i className="fas fa-book fa-3x white"></i>
                      </div>
                    </Col>
                    <Col xs={12} sm={8}>
                      <div className="text-right">
                        <div className="card-description" id="appointments-text">Appointments</div>
                        <div className="card-number">0</div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} className="phone-resize">
              <Card id="seekers-card">
                <Card.Body>
                  <Row>
                    <Col xs={12} sm={4}>
                      <div className="card-icon">
                        <i className="fas fa-user fa-3x white"></i>
                      </div>
                    </Col>
                    <Col xs={12} sm={8}>
                      <div className="text-right">
                        <div className="card-description">Seekers</div>
                        <div className="card-number">0</div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} className="phone-resize">
              <Card id="balance-card">
                <Card.Body>
                  <Row>
                    <Col xs={12} sm={4}>
                      <div className="card-icon">
                        <i className="fas fa-dollar-sign fa-3x white"></i>
                      </div>
                    </Col>
                    <Col xs={12} sm={8}>
                      <div className="text-right">
                        <div className="card-description">Balance</div>
                        <div className="card-number">$0.00</div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* THIRD ROW */}
          <Row className="dash-sec">
            <Col xs={12} sm={12} md={12} lg={7} className="phone-resize">
              <div id="dash-schedule">
                <h3 id="schedule-header">Calendar</h3>
                <Calendar onChange={this.onChange} value={this.state.date}/>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={5} className="phone-resize">
              <Card id="modules-card">
                <Card.Header><center>Squish Profile Tracker</center></Card.Header>
                <Card.Body>

                  <Row>
                    <Col xs={12}>
                      <Row>
                        <Col xs={12} className="module-tracker-progress">
                          <div className="module-percentage text-muted">10%</div>
                          <div className="module-type text-muted">Monthly Activity Increase </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                         <div className="mt-2 mb-4">
                            <div className="progress">
                              <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{'width': '10%'}}></div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12}>
                      <Row>
                        <Col xs={12} className="module-tracker-progress">
                          <div className="module-percentage text-muted">90%</div>
                          <div className="module-type text-muted">Approval Rating</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                         <div className="mt-2 mb-4">
                            <div className="progress">
                              <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{'width': '90%'}}></div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12}>
                      <Row>
                        <Col xs={12} className="module-tracker-progress">
                          <div className="module-percentage text-muted">30%</div>
                          <div className="module-type text-muted">Supporter Modules</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                         <div className="mt-2 mb-4">
                            <div className="progress">
                              <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow="31" aria-valuemin="0" aria-valuemax="100" style={{'width': '31%'}}></div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12}>
                      <Row>
                        <Col xs={12} className="module-tracker-progress">
                          <div className="module-percentage text-muted">25%</div>
                          <div className="module-type text-muted">Monthly Balance</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                         <div className="mt-2 mb-2">
                            <div className="progress">
                              <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{'width': '25%'}}></div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* FOURTH ROW */}
          <Row id="dash-sec-4">
            <Col xs={12} className="phone-resize">
              <TodoBox className="todoBox"/>
            </Col>
          </Row>
        </Container>

    </Container>

  </div>
    )
  }
}

export default Profile


  // componentDidMount() {
  //   const navHome = document.getElementById("nav-home")
  //   const navLinks = document.getElementById("nav-links")
  //   navHome.classList.remove("white-bg")
  //   navHome.classList.add("purple-bg")
  //   navLinks.classList.remove("specialties")
  //   navLinks.classList.add("welcome-page")

  //   checkActivatedUser().then((response) => {
  //     if (response === 'false') {
  //       this.props.history.push('/account/activate')
  //     } else {
  //       flaskFinishedSpecialties().then((response) => {
  //         if (response === 'false') {
  //           this.props.history.push('/onboarding/specialties')
  //         } else {
  //           flaskFinishedProfile().then((response) => {
  //             if (response === 'false') {
  //               this.props.history.push('/onboarding/complete-profile')
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // }