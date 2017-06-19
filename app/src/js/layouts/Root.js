import React from 'react'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Header from 'components/Header'
import ProductSidebar from 'components/Product/Sidebar'
import OverlaySwitch from './Overlay'
import MobileMenu from './MobileMenu'

import isMobile from 'utils/isMobile'

const RootLayout = ({children}) =>
  isMobile ?
    <div className='root'>
      <Header />
      <ProductSidebar>
        <div className='main'>
          {children}
        </div>
      </ProductSidebar>
      <MobileMenu />
      <OverlaySwitch />
    </div>
  :
    <div className='root'>
      <Header />
      <div className='main'>
        {children}
      </div>
      <OverlaySwitch />
    </div>

export default DragDropContext(HTML5Backend)(RootLayout)
