import React from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { Card, Label } from 'semantic-ui-react'

import SettingsNav from './nav'

//TODO: Account Settings

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

        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <NavLink to={`/user/${user.username}`}>
            <Label basic>Profile Settings</Label>
          </NavLink>
          <NavLink to={`/settings`}>
            <Label basic>Account Settings</Label>
          </NavLink>
        </div>
      </Card.Content>
    </Card>
  </div>

const mapStateToProps = ({user, profile}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
