import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'elements/Card'
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
        <Card.Title>Shipping Address</Card.Title>
        <Card.Content>
          <AddressForm onSubmit={address => onSaveAddressSettings(address, user)} />
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
