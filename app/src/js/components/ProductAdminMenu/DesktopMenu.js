import React from 'react'

import AdminMenuButton from 'elements/Button/AdminMenuButton'

export default props =>
  <div className='ui menu product-admin-menu'>
    <AdminMenuButton onClick={props.toGlobe} icon='home' text='home' />
    <AdminMenuButton onClick={props.toShops} icon='book' text='your shops' />
    <AdminMenuButton onClick={props.toPencil} icon='edit' text='start a shop' />
    <AdminMenuButton onClick={props.toSettings} icon='setting' text='settings' />
    <AdminMenuButton onClick={props.toPower} icon='power' text='logout' />
  </div>
