import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Label } from 'semantic-ui-react'

import { onSignupSubmit } from '../../redux/actions/signup'

import SignupForm from './form'
import RouterButton from '../../elements/RouterButton'



const Signup = ({
  user,
  product,
  onSignupSubmit
}) =>
  user.isAuthenticated ?
    <Redirect to='/products' from='/signup' />
  : user.isRegistered ?
    <Redirect to='/' from='/signup' />
  :
    
      <Card>
        <Card.Content>
          <Card.Header>Signup</Card.Header>
          <Card.Description>
            {product.name && <Label ribbon>Signup to share your product!</Label>}
            <SignupForm onSubmit={onSignupSubmit} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RouterButton to="/login" from="/signup" prefix="Have an account?" label="Login" />
        </Card.Content>
      </Card>
    

const mapStateToProps = ({user, products}) =>
({
  user,
  product: products.free
})

const mapDispatchToProps = dispatch =>
({
  onSignupSubmit: user => dispatch(onSignupSubmit(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
