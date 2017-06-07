import React from 'react'

import AdminMenuButton from 'elements/Button/AdminMenuButton'

export default props =>
  <div className='admin-menu'>
      {props.user.isAuthenticated ?
        <div className='ui fluid bottom fixed menu menu__container'>
          <AdminMenuButton onClick={props.toGlobe} icon='home' text='home' />
          <AdminMenuButton onClick={props.toShops} icon='book' text='your shops' />
          <AdminMenuButton onClick={props.toPencil} icon='edit' text='start a shop' />
          <AdminMenuButton onClick={props.toSettings} icon='setting' text='settings' />
          <AdminMenuButton onClick={props.toPower} icon='power' text='logout' />
        </div>
        :
        <div className='ui fluid bottom fixed menu menu__container'>
          <AdminMenuButton onClick={props.toGlobe} icon='home' text='home' />
          <AdminMenuButton onClick={props.toLogin} icon='sign in' text='login' />
          <AdminMenuButton onClick={props.toSignup} icon='add user' text='sign up' />
        </div>
      }
  </div>
