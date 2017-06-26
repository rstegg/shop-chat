import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

import { Button, Menu, Dropdown, Label } from 'semantic-ui-react'

import Nav from 'elements/Nav'

import ShoppingLabel from 'elements/Label/ShoppingLabel'
import HeaderNavLabel from 'elements/Label/HeaderNavLabel'

const Header = ({user, nav, toggleMobileHeader, logout, location}) =>
  <Nav>
    <Nav.Left>
      <Nav.Item>
        <NavLink to='/'>
          Kuwau
        </NavLink>
      </Nav.Item>
    </Nav.Left>
    <span className='nav-toggle' onClick={() => toggleMobileHeader()}>
      <span></span>
      <span></span>
      <span></span>
    </span>
      {user.isAuthenticated ?
        <Nav.Right isOpen={nav.isOpen}>
          <Nav.Item>
            <NavLink to='/shops'>
              Shops
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to='/shops/new'>
              Create Shop
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to='/settings/account'>
              Settings
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to='/checkout/review'>
              Cart
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <button className='button' onClick={() => logout()}>
              Logout
            </button>
          </Nav.Item>
        </Nav.Right>
        :
        <Nav.Right isOpen={nav.isOpen}>
          <Nav.Item>
            <NavLink to='/login'>
              <button className='button is-info'>Login</button>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to='/signup'>
              <div className='button is-primary'>Sign up</div>
            </NavLink>
          </Nav.Item>
        </Nav.Right>
      }
  </Nav>

const mapStateToProps = ({user, nav}) =>
({
  user,
  nav
})

const mapDispatchToProps = dispatch =>
({
  logout:       () => dispatch({type: 'LOGOUT'}),
  toggleMobileHeader: () => dispatch({type: 'TOGGLE_MOBILE_HEADER'})
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
