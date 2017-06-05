import React from 'react'
import { NavLink } from 'react-router-dom'

import { Button, Menu } from 'semantic-ui-react'

import Flydown from './Flydown'

const MobileHeader = props =>
  <Menu fluid fixed='top' className='header__container'>
    <Menu.Item header as={NavLink} to='/'>Kuwau</Menu.Item>
    <Menu.Item position='right'>
      <Button.Group toggle>
        <Flydown {...props} />
      </Button.Group>
    </Menu.Item>
  </Menu>

export default MobileHeader
