import React from 'react'

import Header from 'components/Header'
import OverlaySwitch from './Overlay'

const RootLayout = ({ children }) =>
  <div className='root'>
    <Header />
    <div className='main'>
      {children}
    </div>
    <OverlaySwitch />
  </div>

export default RootLayout
