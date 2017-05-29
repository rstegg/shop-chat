import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import ShippingForm from './form'

import { onSaveShippingSettings } from 'actions/shipping'

class Shipping extends Component {
   render() {
     const { user, onSaveShippingSettings } = this.props
     if(!user.isAuthenticated) {
       return <Redirect to='/' />
     }
     return (
      <Card>
        <Card.Content>
          <Card.Header>Shipping Address</Card.Header>
          <Card.Description>
            <ShippingForm onSubmit={shipping => onSaveShippingSettings(shipping, user)} />
          </Card.Description>
        </Card.Content>
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
  onSaveShippingSettings: (account, user) => dispatch(onSaveShippingSettings(account, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shipping)
