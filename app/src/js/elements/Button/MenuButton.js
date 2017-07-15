import React from 'react'

import { Popup, Button } from 'semantic-ui-react'

const MenuButton = ({ onClick, icon, text }) =>
  <Popup
    position='top center'
    trigger={<Button basic circular onClick={onClick} icon={icon} size='massive' className='menu--button' />}
    content={text} />

export default MenuButton
