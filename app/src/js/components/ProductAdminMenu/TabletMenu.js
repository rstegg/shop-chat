import React from 'react'

import ProductAdminMenuButton from 'elements/Button/ProductAdminMenuButton'

export default props =>
  <div>
    <div className='product-admin-menu--left'>
      <ProductAdminMenuButton onClick={props.openChangeProductLayout} icon='object group' text='change layout' />
      <ProductAdminMenuButton onClick={props.openAddProductOption} icon='unordered list' text='add options' />
    </div>
    <div className='product-admin-menu--right'>
      <ProductAdminMenuButton onClick={props.openAddProductText} icon='font' text='add description' />
      <ProductAdminMenuButton onClick={props.openAddProductMedia} icon='video play outline' text='add media' />
    </div>
  </div>
