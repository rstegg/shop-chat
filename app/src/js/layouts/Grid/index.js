import React from 'react'

import DesktopGrid from './DesktopGrid'
import MobileGrid from './MobileGrid'

import isMobile from 'utils/isMobile'

export default props =>
  isMobile ?
    <MobileGrid {...props} />
  :
    <DesktopGrid {...props} />
