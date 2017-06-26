import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Card from 'elements/Card'
import Message from 'elements/Message'

import { onSignupSubmit, resetSignup } from 'actions/signup'

import SignupForm from './form'
import RouterButton from 'elements/Button/RouterButton'

class Signup extends Component {
  componentWillMount() {
    const { resetSignup } = this.props
    resetSignup()
  }
  render() {
    const { user, onSignupSubmit } = this.props
    if(user.isAuthenticated || user.isRegistered) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <Card>
        <Card.Title>Signup</Card.Title>
        <Card.Content>
          <SignupForm onSubmit={onSignupSubmit} />
          {!!user.error && <Message.Error header='Signup failed!' content={user.error} />}
        </Card.Content>
        <Card.Footer>
          <Card.Action>
            <RouterButton to='/login' prefix='Have an account?' label='Login' />
          </Card.Action>
        </Card.Footer>
      </Card>
    )
  }
}


const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  onSignupSubmit: user => dispatch(onSignupSubmit(user)),
  resetSignup: () => dispatch(resetSignup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
