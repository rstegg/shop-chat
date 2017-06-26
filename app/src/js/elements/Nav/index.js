import React from 'react'

const Nav = ({children}) =>
  <nav className='nav has-shadow'>
    {children}
  </nav>

Nav.Left = ({children}) =>
  <div className='nav-left'>
    {children}
  </div>

Nav.Center = ({children}) =>
  <div className='nav-center'>
    {children}
  </div>

Nav.Right = ({isOpen, children}) =>
  <div className={`nav-right nav-menu ${isOpen ? 'is-active' : ''}`}>
    {children}
  </div>

Nav.Item = ({children}) =>
  <div className='nav-item'>
    {children}
  </div>

export default Nav
