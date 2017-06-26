import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Card from 'elements/Card'

import SettingsForm from './form'

import { onSaveAccountSettings } from 'actions/account'

class Settings extends Component {
   render() {
     const { user, onSaveAccountSettings } = this.props
     if(!user.isAuthenticated) {
       return <Redirect to='/' />
     }
     return (
      <Card>
        <Card.Title>Account Settings</Card.Title>
        <Card.Content>
          <SettingsForm onSubmit={account => onSaveAccountSettings(account, user)} />
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
  onSaveAccountSettings: (account, user) => dispatch(onSaveAccountSettings(account, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
