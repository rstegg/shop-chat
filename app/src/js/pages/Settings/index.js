import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

import SettingsNav from './nav'
import SettingsForm from './form'

import { onAccountSettingsSave } from 'actions/account'

const Settings = ({user}) =>
  !user.isAuthenticated ?
    <Redirect to='/' />
  :
  <div className='settings'>
    <SettingsNav user={user} />
    <Card>
      <Card.Content>
        <Card.Header>Account Settings</Card.Header>
        <Card.Description>
          <SettingsForm onSubmit={account => onAccountSettingsSave(account, user)} />
        </Card.Description>
      </Card.Content>
    </Card>
  </div>

const mapStateToProps = ({user, profile}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  onAccountSettingsSave: (account, user) => dispatch(onAccountSettingsSave(account, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
