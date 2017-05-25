import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import SettingsForm from './form'

import { onSaveAccountSettings } from 'actions/account'

class Settings extends Component {
   render() {
     const { user } = this.props
     if(!user.isAuthenticated) {
       return <Redirect to='/' />
     }
     return (
      <Card>
        <Card.Content>
          <Card.Header>Account Settings</Card.Header>
          <Card.Description>
            <SettingsForm onSubmit={account => onSaveAccountSettings(account, user)} />
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
  onSaveAccountSettings: (account, user) => dispatch(onSaveAccountSettings(account, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
