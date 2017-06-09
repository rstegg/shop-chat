import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Sidebar, Header, Segment, Menu, Button, Icon } from 'semantic-ui-react'

import { closeChangeProductLayout, uploadEditProductLayout, } from 'actions/products'

class ProductLayoutMenu extends Component {
  render() {
    const { product, user, uploadEditProductLayout, closeChangeProductLayout, children } = this.props
    return (
      <div>
        <Sidebar.Pushable as={Segment} style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'}}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={product.editMode === 'layout'} icon='labeled' vertical inverted>
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
              <Menu.Menu style={{position: 'absolute', width: '100%', bottom: '25px'}}>
                <Menu.Item>
                  <Button basic color='teal' onClick={closeChangeProductLayout} size='huge'>Close</Button>
                </Menu.Item>
              </Menu.Menu>
          </Sidebar>
          <Sidebar.Pusher>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

const mapStateToProps = ({products, user}) =>
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
