import React from 'react'
import { NavLink } from 'react-router-dom'

const SettingsNav = () =>
  <div className='settings-nav'>
    <aside className='menu'>
      <ul className='menu-list'>
        <NavLink to='/settings/account'>
          Account
        </NavLink>
        <NavLink to='/settings/wallet'>
          Payment Options
        </NavLink>
        <NavLink to='/settings/withdraw'>
          Withdraw Options
        </NavLink>
        <NavLink to='/settings/address'>
          Shipping Address
        </NavLink>
        <NavLink to='/settings/notifications'>
          Notifications
        </NavLink>
        <NavLink to='/settings/privacy'>
          Privacy
        </NavLink>
        <NavLink to='/settings/tools'>
          Tools
        </NavLink>
      </ul>

    </aside>
  </div>

export default SettingsNav
