import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button, Menu } from 'semantic-ui-react'

import ProfileLabel from 'elements/ProfileLabel'

const DesktopHeader = ({user}) =>
  <Menu fluid fixed='top' borderless className='header__container'>
    <Menu.Item header>
      <NavLink to='/'>Kuwau</NavLink>
    </Menu.Item>
    <Menu.Item position='right'>
      {user.isAuthenticated ?
        <Button.Group>
          <ProfileLabel username={user.username} image={user.image} />
        </Button.Group>
        :
        <Button.Group>
          <NavLink to="/login">
            <Button primary>Login</Button>
          </NavLink>
          <Button.Or />
          <NavLink to="/signup">
            <Button positive>Sign up</Button>
          </NavLink>
        </Button.Group>
      }
    </Menu.Item>
  </Menu>

export default DesktopHeader
