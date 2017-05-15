import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'

import { onSignupSubmit } from 'actions/signup'

import SignupForm from './form'
import RouterButton from 'elements/RouterButton'

const Signup = ({
  user,
  onSignupSubmit
}) =>
  (user.isAuthenticated || user.isRegistered) ?
    <Redirect to='/' />
  :
    <Card>
      <Card.Content>
        <Card.Header>Signup</Card.Header>
        <Card.Description>
          <SignupForm onSubmit={onSignupSubmit} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <RouterButton to="/login" prefix="Have an account?" label="Login" />
      </Card.Content>
    </Card>


const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  onSignupSubmit: user => dispatch(onSignupSubmit(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
