import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const SettingsNav = ({user}) =>
  <div className='settings-nav'>
    <Button.Group vertical>
      <NavLink to={`/settings`}>
        <Button basic content='Account' />
      </NavLink>
      <NavLink to={`/user/${user.username}`}>
        <Button basic content='Profile' />
      </NavLink>
      <NavLink to='/settings/withdrawals'>
        <Button basic content='Withdrawal' />
      </NavLink>
      <NavLink to='/settings/payments'>
        <Button basic content='Payment' />
      </NavLink>
      <NavLink to='/settings/notifications'>
        <Button basic content='Notifications' />
      </NavLink>
      <NavLink to='/settings/privacy'>
        <Button basic content='Privacy' />
      </NavLink>
      <NavLink to='/settings/tools'>
        <Button basic content='Tools' />
      </NavLink>
    </Button.Group>
  </div>

export default SettingsNav
