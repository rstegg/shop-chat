import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

import { Button, Menu, Dropdown, Label } from 'semantic-ui-react'

import ShoppingLabel from 'elements/Label/ShoppingLabel'
import HeaderNavLabel from 'elements/Label/HeaderNavLabel'

import isMobile from 'utils/isMobile'

const ProfileButton = ({ username, image }) =>
  <Label as={NavLink} to='#' basic image>
    <img src={image || '/images/placeholder.png'} alt={username} /> {username}
  </Label>

const MobileProfileButton = ({ image }) =>
  <Label basic image>
    <img src={image || '/images/placeholder.png'} alt={image || 'profile'} />
  </Label>


const Header = ({ user, logout, location }) =>
  <Menu fluid fixed='top' borderless className='header__container'>
    <Menu.Item header>
      <NavLink to='/'>Kuwau</NavLink>
    </Menu.Item>
      {user.isAuthenticated ?
        <Menu.Item position='right'>
          <Menu.Menu>
            <HeaderNavLabel to='/' icon='home' text={!isMobile && 'home'} />
            <HeaderNavLabel to='/shops' icon='book' text={!isMobile && 'your shops'} />
            <HeaderNavLabel to='/shops/new' icon='edit' text={!isMobile && 'start a shop'} />
            <Dropdown trigger={isMobile ? <MobileProfileButton image={user.image} /> : <ProfileButton username={user.username} image={user.image} />} icon={null} pointing='top right'>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to={`/user/${user.username}`} text='Profile' active={location.pathname === `/user/${user.username}`} />
                <Dropdown.Item as={NavLink} to='/settings/account' text='Settings' active={location.pathname.startsWith('/settings/')} />
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} text='Sign Out' />
              </Dropdown.Menu>
            </Dropdown>
            <ShoppingLabel />
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

const mapStateToProps = ({ user }) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  logout:       () => dispatch({ type: 'LOGOUT' })
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
