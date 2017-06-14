import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import ProductAdminMenuButton from 'elements/Button/ProductAdminMenuButton'

import PublicField from './PublicField'

import {
  openChangeProductLayout,
  openAddProductOption,
  openAddProductElement,
  openAddProductMedia,
  openEditProductTheme,
  switchToProductUser,
  editProduct
} from 'actions/products'

const MobileProductAdminMenu = props =>
  !!props.product.isAdmin &&
  <div className='ui menu product-admin-menu'>
    <PublicField style={{position: 'absolute', left: '10px', bottom: '15px'}}/>
    <div style={{position: 'relative', bottom: '25px'}}>
      <ProductAdminMenuButton onClick={props.openChangeProductLayout} icon='object group' text='change layout' />
      <ProductAdminMenuButton onClick={props.openAddProductOption} icon='unordered list' text='add options' />
      <ProductAdminMenuButton onClick={props.openAddProductElement} icon='font' text='add content' />
      <ProductAdminMenuButton onClick={props.openAddProductMedia} icon='video play outline' text='add media' />
      <ProductAdminMenuButton onClick={props.openEditProductTheme} icon='theme' text='change theme' />
    </div>
    <Button basic positive onClick={props.switchToProductUser} style={{position: 'absolute', right: '10px', bottom: '10px'}}>Done</Button>
  </div>

const mapStateToProps = ({products, user}) =>
({
  product: products.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  openChangeProductLayout:  () => dispatch(openChangeProductLayout()),
  openAddProductOption:     () => dispatch(openAddProductOption()),
  openAddProductElement:    () => dispatch(openAddProductElement()),
  openAddProductMedia:      () => dispatch(openAddProductMedia()),
  openEditProductTheme:     () => dispatch(openEditProductTheme()),
  switchToProductUser:      () => dispatch(switchToProductUser()),
  editProduct: (product, user) => dispatch(editProduct(product, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileProductAdminMenu)
