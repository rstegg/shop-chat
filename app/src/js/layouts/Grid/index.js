import React from 'react'

import DesktopGrid from './DesktopGrid'
import MobileGrid from './MobileGrid'

import isMobile from 'utils/isMobile'

const GridLayout = props =>
  isMobile ?
    <MobileGrid {...props} />
  :
    <DesktopGrid {...props} />

export default GridLayout
