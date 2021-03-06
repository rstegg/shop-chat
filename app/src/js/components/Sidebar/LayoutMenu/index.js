import React from 'react'
import { connect } from 'react-redux'

import { Header, Menu, Button, Icon } from 'semantic-ui-react'

import { closeChangeProductLayout, uploadEditProductLayout, } from 'actions/products'

const ProductLayoutMenu = ({ product, user, uploadEditProductLayout, closeChangeProductLayout }) =>
  <Menu icon='labeled' inverted style={{ width: '100%', height: '100%' }}>
    <Header block inverted>Layouts</Header>
    <Menu.Item active={product.layout === 'grid'} onClick={() => product.layout === 'grid' ? closeChangeProductLayout() : uploadEditProductLayout('grid', product, user)}>
      <Icon name='block layout' size='massive' />
      Grid
    </Menu.Item>
    <Menu.Item active={product.layout === 'image'} onClick={() => product.layout === 'image' ? closeChangeProductLayout() : uploadEditProductLayout('image', product, user)}>
      <Icon name='image' size='massive' />
      Image
    </Menu.Item>
    <Menu.Item active={product.layout === 'gallery'} onClick={() => product.layout === 'gallery' ? closeChangeProductLayout() : uploadEditProductLayout('gallery', product, user)}>
      <Icon name='indent' size='massive' />
      Gallery
    </Menu.Item>
    <Menu.Item onClick={closeChangeProductLayout}>
      <Icon name='remove' size='massive' style={{ color: 'red' }} />
      Close
    </Menu.Item>
  </Menu>

const mapStateToProps = ({ products, user }) =>
({
  product: products.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  uploadEditProductLayout: (layout, product, user) => dispatch(uploadEditProductLayout(layout, product, user)),
  closeChangeProductLayout: () => dispatch(closeChangeProductLayout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductLayoutMenu)
