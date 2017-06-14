import React from 'react'
import { connect } from 'react-redux'

import { Sidebar, Segment, Menu } from 'semantic-ui-react'

import ProductLayoutMenu from './LayoutMenu'
import ProductOptionMenu from './OptionMenu'
import ProductElementMenu from './ElementMenu'
import ProductMediaMenu from './MediaMenu'
import ProductThemeMenu from './ThemeMenu'

import isMobile from 'utils/isMobile'

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
  <Sidebar.Pushable as={Segment} className='product-sidebar-container'>
    <Sidebar animation='overlay' width='thin' visible={!!product.editMode} className='product-sidebar'>
      <SidebarContent editMode={product.editMode} />
    </Sidebar>
    <Sidebar.Pusher>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>

const mapStateToProps = ({products}) =>
({
  product: products.current
})

export default connect(mapStateToProps)(ProductSidebar)
