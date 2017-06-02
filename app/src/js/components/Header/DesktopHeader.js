import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button, Menu, Dropdown, Label } from 'semantic-ui-react'

import ShoppingLabel from 'elements/ShoppingLabel'

const ProfileButton = ({username, image}) =>
  <Label basic image>
    <img src={image || '/images/placeholder.png'} alt={username} /> {username}
  </Label>

const DesktopHeader = ({user, logout}) =>
  <Menu fluid fixed='top' borderless className='header__container'>
    <Menu.Item header>
      <NavLink to='/'>Kuwau</NavLink>
    </Menu.Item>
      {user.isAuthenticated ?
        <Menu.Item position='right'>
          <Menu.Menu>
            <ShoppingLabel />
            <Dropdown trigger={<ProfileButton username={user.username} image={user.image} />} icon={null} pointing='top right'>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to={`/user/${user.username}`} text='Profile' />
                <Dropdown.Item as={NavLink} to={`/settings/account`} text='Settings' />
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} text='Sign Out' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu.Item>
        :
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
      }
  </Menu>

export default DesktopHeader
