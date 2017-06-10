import React from 'react'

import { Button } from 'semantic-ui-react'

import ProductAdminMenuButton from 'elements/Button/ProductAdminMenuButton'

export default ({PublicField, ...props}) =>
  <div className='ui menu product-admin-menu'>
    {!!PublicField && PublicField}
    <ProductAdminMenuButton onClick={props.openChangeProductLayout} icon='object group' text='change layout' />
    <ProductAdminMenuButton onClick={props.openAddProductOption} icon='unordered list' text='add options' />
    <ProductAdminMenuButton onClick={props.openAddProductElement} icon='font' text='add content' />
    <ProductAdminMenuButton onClick={props.openAddProductMedia} icon='video play outline' text='add media' />
    <ProductAdminMenuButton onClick={props.openEditProductTheme} icon='theme' text='change theme' />
    <Button basic positive onClick={props.switchToProductUser} size='huge' style={{position: 'absolute', right: '25px'}}>Done</Button>
  </div>
