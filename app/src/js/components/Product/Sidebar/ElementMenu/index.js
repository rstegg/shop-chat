import React from 'react'
import { connect } from 'react-redux'

import { Header, Menu, Button, Icon } from 'semantic-ui-react'

import { closeAddProductElement, uploadAddProductElement, } from 'actions/products'

const ProductElementMenu = ({ product, user, uploadAddProductElement, closeAddProductElement }) =>
  <Menu icon='labeled' vertical inverted style={{width: '100%', height: '100%'}}>
    <Header block inverted>Elements</Header>
    <Menu.Item onClick={() => uploadAddProductElement('header', product, user)}>
      <Icon name='header' size='massive' />
      Header
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductElement('content', product, user)}>
      <Icon name='content' size='massive' />
      Paragraph
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductElement('list', product, user)}>
      <Icon name='unordered list' size='massive' />
      List
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductElement('table', product, user)}>
      <Icon name='table' size='massive' />
      Table
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductElement('columns', product, user)}>
      <Icon name='columns' size='massive' />
      Columns
    </Menu.Item>
    <Menu.Menu style={{position: 'absolute', width: '100%', bottom: '25px'}}>
      <Menu.Item>
        <Button basic color='teal' onClick={closeAddProductElement} size='huge'>Close</Button>
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
  uploadAddProductElement: (options, product, user) => dispatch(uploadAddProductElement(options, product, user)),
  closeAddProductElement: () => dispatch(closeAddProductElement()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductElementMenu)
