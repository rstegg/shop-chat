import React from 'react'

import Header from 'components/Header'
import OverlaySwitch from 'components/Overlay'

import isMobile from 'utils/isMobile'

export default ({children}) =>
  <div className='root'>
    <Header isMobile={isMobile()} />
      {children}
    <OverlaySwitch />
  </div>
