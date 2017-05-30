import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const SettingsNav = () =>
  <div className='settings-nav'>
    <Button.Group vertical>
      <NavLink to='/settings/account'>
        <Button basic content='Account' />
      </NavLink>
      <NavLink to='/settings/wallet'>
        <Button basic content='Payment Options' />
      </NavLink>
      <NavLink to='/settings/address'>
        <Button basic content='Shipping Address' />
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
