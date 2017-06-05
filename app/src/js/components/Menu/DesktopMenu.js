import React from 'react'

import MenuButton from 'elements/Button/MenuButton'

export default props =>
  <div>
      {props.user.isAuthenticated ?
        <div className='ui fluid bottom fixed menu menu__container'>
          <MenuButton onClick={props.toGlobe} icon='home' text='home' />
          <MenuButton onClick={props.toShops} icon='book' text='your shops' />
          <MenuButton onClick={props.toPencil} icon='edit' text='start a shop' />
          <MenuButton onClick={props.toSettings} icon='setting' text='settings' />
          <MenuButton onClick={props.toPower} icon='power' text='logout' />
        </div>
        :
        <div className='ui fluid bottom fixed menu menu__container'>
          <MenuButton onClick={props.toGlobe} icon='home' text='home' />
          <MenuButton onClick={props.toLogin} icon='sign in' text='login' />
          <MenuButton onClick={props.toSignup} icon='add user' text='sign up' />
        </div>
      }
  </div>
