import React from 'react'

import ShopAdminMenuButton from 'elements/Button/ShopAdminMenuButton'

export default
({
  user,
  toLogin,
  toSignup,
  toShops,
  toGlobe,
  toPencil,
  toSettings,
  toPower
}) =>
  <div>
    <div className='shop-admin-menu--left'>
      <ShopAdminMenuButton onClick={toGlobe} icon='home' text='home' />
      {user.isAuthenticated && <ShopAdminMenuButton onClick={toShops} icon='book' text='your shops' />}
    </div>
    <div className='shop-admin-menu--right'>
      {!user.isAuthenticated && <ShopAdminMenuButton onClick={toLogin} icon='sign in' text='login' />}
      {!user.isAuthenticated && <ShopAdminMenuButton onClick={toSignup} icon='add user' text='sign up' />}
      {user.isAuthenticated && <ShopAdminMenuButton onClick={toPencil} icon='edit' text='start a product' />}
      {user.isAuthenticated && <ShopAdminMenuButton onClick={toSettings} icon='setting' text='settings' />}
      {user.isAuthenticated && <ShopAdminMenuButton onClick={toPower} icon='power' text='logout' />}
    </div>
  </div>
