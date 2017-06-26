import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Card from 'elements/Card'
import Message from 'elements/Message'

import { onLoginSubmit, resetLogin } from 'actions/login'

import LoginForm from './form'
import RouterButton from 'elements/Button/RouterButton'

class Login extends Component {
  componentWillMount() {
    const { resetLogin } = this.props
    resetLogin()
  }
  render() {
    const { user, onLoginSubmit } = this.props
    if(user.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <Card>
        <Card.Title>Login</Card.Title>
        <Card.Content>
          <LoginForm onSubmit={onLoginSubmit} />
          {!!user.error && <Message.Error header='Login failed!' content={user.error} />}
        </Card.Content>
        <Card.Footer>
          <Card.Action>
            <RouterButton to='/signup' prefix='Need an account?' label='Sign up' />
          </Card.Action>
        </Card.Footer>
      </Card>
    )
  }
}

const mapStateToProps = ({user}) =>
({
  user,
})

const mapDispatchToProps = dispatch =>
({
  onLoginSubmit: user => dispatch(onLoginSubmit(user)),
  resetLogin: () => dispatch(resetLogin()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
