import React from 'react'

import { Dropdown, Icon, Header } from 'semantic-ui-react'

const DropItem = ({onClick, icon, text}) =>
  <Header as='h2' name={text} onClick={onClick} className='dropdown--mobile__item' >
    <Icon name={icon} />
    {text}
  </Header>

const Flydown = props =>
  <Dropdown icon='content' basic button className='icon secondary'>
    {props.user.isAuthenticated ?
      <Dropdown.Menu className='dropdown--mobile'>
        <DropItem onClick={props.toShops} text='shops' icon='book' />
        <DropItem onClick={props.toSettings} text='settings' icon='setting' />
        <Dropdown.Divider />
        <DropItem onClick={props.logout}  icon='power' text='logout' />
      </Dropdown.Menu>
      :
      <Dropdown.Menu className='dropdown--mobile'>
        <DropItem onClick={props.toLogin} icon='sign in' text='login' />
        <DropItem onClick={props.toSignup}  icon='add user' text='sign up' />
      </Dropdown.Menu>
    }
  </Dropdown>

export default Flydown
