import React from 'react'

import MenuButton from 'elements/Button/MenuButton'

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
    <div className='ui fluid bottom fixed menu menu__container'>
      <MenuButton onClick={toGlobe} icon='home' text='home' />
      {!user.isAuthenticated && <MenuButton onClick={toLogin} icon='sign in' text='login' />}
      {!user.isAuthenticated && <MenuButton onClick={toSignup} icon='add user' text='sign up' />}
      {user.isAuthenticated && <MenuButton onClick={toShops} icon='book' text='your shops' />}
      {user.isAuthenticated && <MenuButton onClick={toPencil} icon='edit' text='start a shop' />}
      {user.isAuthenticated && <MenuButton onClick={toSettings} icon='setting' text='settings' />}
      {user.isAuthenticated && <MenuButton onClick={toPower} icon='power' text='logout' />}
    </div>
  </div>
