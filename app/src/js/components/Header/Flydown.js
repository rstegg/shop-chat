import React from 'react'
import { NavLink } from 'react-router-dom'

import { Icon, Header, Button, Menu, Dropdown, Label } from 'semantic-ui-react'

const DropItem = ({onClick, icon, text}) =>
  <Header as='h2' name={text} onClick={onClick} className='dropdown--mobile__item' >
    <Icon name={icon} />
    {text}
  </Header>

const Flydown = props =>
  <div>
    {props.user.isAuthenticated ?
      <Dropdown icon='content' basic button className='icon secondary'>
      <Dropdown.Menu>
        <DropItem onClick={props.toShops} text='shops' icon='book' />
        <DropItem onClick={props.toSettings} text='settings' icon='setting' />
        <Dropdown.Divider />
        <DropItem onClick={props.logout}  icon='power' text='logout' />
      </Dropdown.Menu>
      </Dropdown>
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
  </div>



export default Flydown
