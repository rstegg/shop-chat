import React from 'react'

import ProductAdminMenuButton from 'elements/Button/ProductAdminMenuButton'

export default props =>
  <div className='ui menu product-admin-menu'>
    <ProductAdminMenuButton onClick={props.toGlobe} icon='home' text='home' />
    <ProductAdminMenuButton onClick={props.toShops} icon='book' text='your shops' />
    <ProductAdminMenuButton onClick={props.toPencil} icon='edit' text='start a shop' />
    <ProductAdminMenuButton onClick={props.toSettings} icon='setting' text='settings' />
    <ProductAdminMenuButton onClick={props.toPower} icon='power' text='logout' />
  </div>
