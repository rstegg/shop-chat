import React from 'react'

import Menu from 'components/Menu'
import Header from 'components/Header'
import OverlaySwitch from './Overlay'

import isMobile, { isTablet } from 'utils/isMobile'

export default ({children}) =>
  <div className='root'>
    <Header isMobile={isMobile()} />
      <div className='main'>
        {children}
      </div>
    <Menu isMobile={isMobile()} isTablet={isTablet()} />
    <OverlaySwitch />
  </div>
