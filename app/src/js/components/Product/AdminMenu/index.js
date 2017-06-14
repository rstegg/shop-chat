import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'

import ProductAdminMenuButton from 'elements/Button/ProductAdminMenuButton'

import { openChangeProductLayout, openAddProductOption, openAddProductElement, openAddProductMedia, openEditProductTheme, switchToProductUser } from 'actions/products'

import isMobile, { isTablet } from 'utils/isMobile'
//Only renders if this is a tablet or desktop
const BottomNav = ({PublicField, ...props}) =>
  !isMobile && (
    <div className='ui menu product-admin-menu'>
      {!!PublicField && PublicField}
      <ProductAdminMenuButton onClick={props.openChangeProductLayout} icon='object group' text='change layout' />
      <ProductAdminMenuButton onClick={props.openEditProductTheme} icon='theme' text='change theme' />
      <Button basic positive onClick={props.switchToProductUser} size='huge' style={{position: 'absolute', right: '25px'}}>Done</Button>
    </div>
  )

const mapStateToProps = ({user}) =>
({
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
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
