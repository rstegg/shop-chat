import React from 'react'

import ShopAdminMenuButton from 'elements/Button/ShopAdminMenuButton'

export default props =>
  <div className='ui menu shop-admin-menu'>
    <ShopAdminMenuButton onClick={props.toGlobe} icon='home' text='home' />
    <ShopAdminMenuButton onClick={props.toShops} icon='book' text='your shops' />
    <ShopAdminMenuButton onClick={props.toPencil} icon='edit' text='start a shop' />
    <ShopAdminMenuButton onClick={props.toSettings} icon='setting' text='settings' />
    <ShopAdminMenuButton onClick={props.toPower} icon='power' text='logout' />
  </div>
