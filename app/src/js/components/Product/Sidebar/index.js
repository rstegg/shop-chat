import React from 'react'
import { connect } from 'react-redux'

import { Sidebar, Segment, Menu } from 'semantic-ui-react'

import ProductLayoutMenu from './LayoutMenu'
import ProductThemeMenu from './ThemeMenu'

const ProductEmptyMenu = () =>
  <Menu vertical inverted style={{width: '100%', height: '100%'}}></Menu>

const SidebarContent = ({editMode}) => {
  switch(editMode) {
    case 'layout':
      return <ProductLayoutMenu />
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
