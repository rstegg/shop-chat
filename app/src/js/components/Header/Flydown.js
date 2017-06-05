import React from 'react'
import { connect } from 'react-redux'

import { Dropdown, Icon, Header } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const DropItem = ({onClick, icon, text}) =>
  <Header as='h2' name={text} onClick={onClick} className='dropdown--mobile__item' >
    <Icon name={icon} />
    {text}
  </Header>

const Flydown = props =>
  <Dropdown icon='content' basic button className='icon secondary'>
    <DropItem onClick={props.toGlobe} text='home' icon='home' />
    {props.user.isAuthenticated ?
      <Dropdown.Menu className='dropdown--mobile'>
        <DropItem onClick={props.toShops} text='shops' icon='book' />
        <DropItem onClick={props.toPencil} text='start a product' icon='edit' />
        <DropItem onClick={props.toSettings} text='settings' icon='setting' />
        <Dropdown.Divider />
        <DropItem onClick={props.toPower}  icon='power' text='logout' />
      </Dropdown.Menu>
      :
      <Dropdown.Menu className='dropdown--mobile'>
        <DropItem onClick={props.toLogin} icon='sign in' text='login' />
        <DropItem onClick={props.toSignup}  icon='add user' text='sign up' />
      </Dropdown.Menu>
    }
  </Dropdown>

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  toLogin:    () => dispatch(push('/login')),
  toSignup:   () => dispatch(push('/signup')),
  toShops:    () => dispatch(push('/shops')),
  toArticles: () => dispatch(push('/articles')),
  toFeed:     () => dispatch(push('/')),
  toPencil:   () => dispatch(push('/shops/new')),
  toSettings: () => dispatch(push('/settings/account')),
  toPower:    () => dispatch({type: 'LOGOUT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Flydown)
