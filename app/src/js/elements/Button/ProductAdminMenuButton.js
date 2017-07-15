import React from 'react'

import { Popup, Button } from 'semantic-ui-react'

const ProductAdminMenuButton = ({ onClick, icon, text }) =>
  <Popup
    position='top center'
    trigger={<Button basic onClick={onClick} icon={icon} size='massive' className='menu--button' />}
    content={text} />

export default ProductAdminMenuButton
