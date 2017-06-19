import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button, Menu } from 'semantic-ui-react'

import Flydown from './Flydown'

const MobileHeader = props =>
  <Menu fluid fixed='top' className='header__container'>
    <Menu.Item header>
      <NavLink to='/'>Kuwau</NavLink>
    </Menu.Item>
    <Menu.Item position='right'>
      <Button.Group>
        <NavLink to='/login'>
          <Button primary>Login</Button>
        </NavLink>
        <Button.Or />
        <NavLink to='/signup'>
          <Button positive>Sign up</Button>
        </NavLink>
      </Button.Group>
    </Menu.Item>
  </Menu>

export default MobileHeader
