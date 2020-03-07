import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getSession } from '../Account/UserFunctions'

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          getSession() ?
            <Component {...props} /> :
            <Redirect to='/account' />
        )} 
      />
    )
  }
}

export default ProtectedRoute
