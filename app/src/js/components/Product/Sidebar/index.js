import React from 'react'

import { Sidebar, Segment, Menu } from 'semantic-ui-react'

import ProductLayoutMenu from './LayoutMenu'
import ProductOptionMenu from './OptionMenu'
import ProductElementMenu from './ElementMenu'
import ProductMediaMenu from './MediaMenu'
import ProductThemeMenu from './ThemeMenu'

const ProductEmptyMenu = () =>
  <Menu vertical inverted style={{width: '100%', height: '100%'}}></Menu>

const SidebarContent = ({editMode}) => {
  switch(editMode) {
    case 'layout':
      return <ProductLayoutMenu />
    case 'options':
      return <ProductOptionMenu />
    case 'element':
      return <ProductElementMenu />
    case 'media':
      return <ProductMediaMenu />
    case 'theme':
      return <ProductThemeMenu />
    default:
      return <ProductEmptyMenu />
  }
}

const ProductSidebar = ({product, children}) =>
  <div>
    <Sidebar.Pushable as={Segment} style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'}}>
      <Sidebar animation='overlay' width='thin' visible={!!product.editMode}>
        <SidebarContent editMode={product.editMode} />
      </Sidebar>
      <Sidebar.Pusher>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>

export default ProductSidebar
