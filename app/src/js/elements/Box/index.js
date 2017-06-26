import React from 'react'

const Box = ({children}) =>
  <div className='card'>
    {children}
  </div>

Box.Content = ({children}) =>
  <div className='card-content'>
    {children}
  </div>

Box.Header = ({children}) =>
  <div className='card-header'>
    {children}
  </div>

Box.Title = ({children}) =>
  <div className='card-header-title'>
    {children}
  </div>

export default Box
