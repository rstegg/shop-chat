import React from 'react'

import MenuButton from 'elements/MenuButton'

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
    <div className='menu__container--left'>
      <MenuButton onClick={toGlobe} icon='home' text='home' />
      {user.isAuthenticated && <MenuButton onClick={toShops} icon='book' text='your shops' />}
    </div>
    <div className='menu__container--right'>
      {!user.isAuthenticated && <MenuButton onClick={toLogin} icon='sign in' text='login' />}
      {!user.isAuthenticated && <MenuButton onClick={toSignup} icon='add user' text='sign up' />}
      {user.isAuthenticated && <MenuButton onClick={toPencil} icon='edit' text='start a product' />}
      {user.isAuthenticated && <MenuButton onClick={toSettings} icon='setting' text='settings' />}
      {user.isAuthenticated && <MenuButton onClick={toPower} icon='power' text='logout' />}
    </div>
  </div>
