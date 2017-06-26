import React from 'react'

const Menu = ({children}) =>
  <div className='menu'>
    {children}
  </div>

Menu.Label = ({children}) =>
  <div className='menu-label'>
    {children}
  </div>

Menu.Header = ({children}) =>
  <div className='menu-header'>
    {children}
  </div>

Menu.Title = ({children}) =>
  <div className='menu-header-title'>
    {children}
  </div>

export default Menu
