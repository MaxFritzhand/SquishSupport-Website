import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkFirstVisit } from '../Account/UserFunctions'

class LandingRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          checkFirstVisit() ?
            <Component {...props} /> :
            <Redirect to='/' />
        )} 
      />
    )
  }
}

export default LandingRoute
