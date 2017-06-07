import React from 'react'

import ProductAdminMenuButton from 'elements/Button/ProductAdminMenuButton'

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
    <div className='product-admin-menu--left'>
      <ProductAdminMenuButton onClick={toGlobe} icon='home' text='home' />
      {user.isAuthenticated && <ProductAdminMenuButton onClick={toShops} icon='book' text='your shops' />}
    </div>
    <div className='product-admin-menu--right'>
      {!user.isAuthenticated && <ProductAdminMenuButton onClick={toLogin} icon='sign in' text='login' />}
      {!user.isAuthenticated && <ProductAdminMenuButton onClick={toSignup} icon='add user' text='sign up' />}
      {user.isAuthenticated && <ProductAdminMenuButton onClick={toPencil} icon='edit' text='start a product' />}
      {user.isAuthenticated && <ProductAdminMenuButton onClick={toSettings} icon='setting' text='settings' />}
      {user.isAuthenticated && <ProductAdminMenuButton onClick={toPower} icon='power' text='logout' />}
    </div>
  </div>
