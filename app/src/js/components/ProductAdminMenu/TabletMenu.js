import React from 'react'

import { Button } from 'semantic-ui-react'

import ProductAdminMenuButton from 'elements/Button/ProductAdminMenuButton'

export default props =>
  <div>
    <div className='product-admin-menu--left'>
      <ProductAdminMenuButton onClick={props.openChangeProductLayout} icon='object group' text='change layout' />
      <ProductAdminMenuButton onClick={props.openAddProductOption} icon='unordered list' text='add options' />
      <ProductAdminMenuButton onClick={props.openEditProductTheme} icon='theme' text='change theme' />
    </div>
    <div className='product-admin-menu--right'>
      <ProductAdminMenuButton onClick={props.openAddProductElement} icon='font' text='add content' />
      <ProductAdminMenuButton onClick={props.openAddProductMedia} icon='video play outline' text='add media' />
      <Button basic positive onClick={props.switchToProductUser} size='huge'>Done</Button>
    </div>
  </div>
