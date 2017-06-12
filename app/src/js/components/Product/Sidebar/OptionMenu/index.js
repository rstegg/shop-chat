import React from 'react'
import { connect } from 'react-redux'

import { Header, Menu, Button, Icon } from 'semantic-ui-react'

import { closeAddProductOption, uploadAddProductOption, } from 'actions/products'

const ProductOptionMenu = ({ product, user, uploadAddProductOption, closeAddProductOption }) =>
  <Menu icon='labeled' vertical inverted style={{width: '100%', height: '100%'}}>
    <Header block inverted>Buyer Options</Header>
    <Menu.Item onClick={() => uploadAddProductOption('checkbox', product, user)}>
      <Icon name='checkmark box' size='massive' />
      Checkbox
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductOption('toggle', product, user)}>
      <Icon name='toggle on' size='massive' />
      Toggle
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductOption('radio', product, user)}>
      <Icon name='selected radio' size='massive' />
      Radio
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductOption('dropdown', product, user)}>
      <Icon name='toggle down' size='massive' />
      Dropdown
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductOption('type', product, user)}>
      <Icon name='block layout' size='massive' />
      Type
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductOption('color', product, user)}>
      <Icon name='grid layout' size='massive' />
      Color
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductOption('bundle', product, user)}>
      <Icon name='list layout' size='massive' />
      Bundle
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductOption('coupon', product, user)}>
      <Icon name='tag' size='massive' />
      Coupon
    </Menu.Item>
    <Menu.Menu style={{position: 'absolute', width: '100%', bottom: '25px'}}>
      <Menu.Item>
        <Button basic color='teal' onClick={closeAddProductOption} size='huge'>Close</Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>

const mapStateToProps = ({products, user}) =>
({
  product: products.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  uploadAddProductOption: (options, product, user) => dispatch(uploadAddProductOption(options, product, user)),
  closeAddProductOption: () => dispatch(closeAddProductOption()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductOptionMenu)
