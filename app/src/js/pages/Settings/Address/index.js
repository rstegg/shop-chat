import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import AddressForm from './form'

import { onSaveAddressSettings } from 'actions/address'

class Address extends Component {
   render() {
     const { user, onSaveAddressSettings } = this.props
     if(!user.isAuthenticated) {
       return <Redirect to='/' />
     }
     return (
      <Card>
        <Card.Content>
          <Card.Header>Shipping Address</Card.Header>
          <Card.Description>
            <AddressForm onSubmit={address => onSaveAddressSettings(address, user)} />
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
  onSaveAddressSettings: (account, user) => dispatch(onSaveAddressSettings(account, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address)
