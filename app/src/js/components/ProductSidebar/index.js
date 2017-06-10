import React from 'react'

import { Sidebar, Segment, Menu } from 'semantic-ui-react'

import ProductLayoutMenu from 'components/ProductLayoutMenu'
import ProductOptionMenu from 'components/ProductOptionMenu'

const ProductEmptyMenu = () =>
  <Menu vertical inverted style={{width: '100%', height: '100%'}}></Menu>

const SidebarContent = ({editMode}) => {
  switch(editMode) {
    case 'layout':
      return <ProductLayoutMenu />
    case 'options':
      return <ProductOptionMenu />
    case 'media':
      return <ProductOptionMenu />
    default:
      return <ProductEmptyMenu />
  }
}

const ProductSidebar = ({editMode, children}) =>
  <div>
    <Sidebar.Pushable as={Segment} style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'}}>
      <Sidebar animation='overlay' width='thin' visible={!!editMode}>
        <SidebarContent editMode={editMode} />
      </Sidebar>
      <Sidebar.Pusher>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>

export default ProductSidebar
