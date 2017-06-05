import React from 'react'

import Header from 'components/Header'
import OverlaySwitch from './Overlay'

import isMobile from 'utils/isMobile'

export default ({children}) =>
  <div className='root'>
    <Header isMobile={isMobile()} />
      <div className='main'>
        {children}
      </div>
    <OverlaySwitch />
  </div>
