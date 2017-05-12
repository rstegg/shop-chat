import React from 'react'
import { connect } from 'react-redux'

import { Dropdown, Icon, Header } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const DropItem = ({onClick, icon, text}) =>
  <Header as='h2' name={text} onClick={onClick} className='dropdown--mobile__item' >
    <Icon name={icon} />
    {text}
  </Header>

const Flydown = ({
  user,
  toLogin,
  toSignup,
  toProducts,
  toShops,
  toGlobe,
  toPencil,
  toSettings,
  toPower
}) =>
  <Dropdown icon='content' basic button className='icon secondary'>
    <Dropdown.Menu className='dropdown--mobile'>
      {!user.isAuthenticated && <DropItem onClick={toLogin} icon='sign in' text='login' />}
      {!user.isAuthenticated && <DropItem onClick={toSignup}  icon='add user' text='sign up' />}
      <DropItem onClick={toGlobe} text='public product' icon='globe' />
      {user.isAuthenticated && <DropItem onClick={toProducts} text='products' icon='sticky note' />}
      {user.isAuthenticated && <DropItem onClick={toShops} text='shops' icon='book' />}
      {user.isAuthenticated && <DropItem onClick={toPencil} text='start a product' icon='edit' />}
      {user.isAuthenticated && <DropItem onClick={() => user.username && toSettings(user.username)} text='profile' icon='setting' />}
      {user.isAuthenticated && <Dropdown.Divider />}
      {user.isAuthenticated && <DropItem onClick={toPower}  icon='power' text='logout' />}
    </Dropdown.Menu>
  </Dropdown>

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  toLogin:    () => dispatch(push('/login')),
  toSignup:   () => dispatch(push('/signup')),
  toProducts:    () => dispatch(push('/products')),
  toShops:    () => dispatch(push('/shops')),
  toArticles: () => dispatch(push('/articles')),
  toFeed:     () => dispatch(push('/')),
  toPencil:   () => dispatch(push('/products/new')),
  toSettings: username => dispatch(push(`/user/${username}`)),
  toPower:    () => dispatch({type: 'LOGOUT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Flydown)
