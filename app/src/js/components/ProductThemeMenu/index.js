import React from 'react'
import { connect } from 'react-redux'

import { Header, Menu, Button, Icon } from 'semantic-ui-react'

import { closeEditProductTheme, uploadEditProductTheme, } from 'actions/products'

const ProductThemeMenu = ({ product, user, uploadEditProductTheme, closeEditProductTheme }) =>
  <Menu icon='labeled' vertical inverted style={{width: '100%', height: '100%'}}>
    <Header block inverted>Theme</Header>
    <Menu.Item onClick={() => uploadEditProductTheme('primary', product, user)}>
      <Icon name='square' size='massive' />
      Primary color
    </Menu.Item>
    <Menu.Item onClick={() => uploadEditProductTheme('secondary', product, user)}>
      <Icon name='square' size='massive' />
      Secondary color
    </Menu.Item>
    <Menu.Item onClick={() => uploadEditProductTheme('background', product, user)}>
      <Icon name='square' size='massive' />
      Background color
    </Menu.Item>
    <Menu.Item onClick={() => uploadEditProductTheme('segment', product, user)}>
      <Icon name='square' size='massive' />
      Segment color
    </Menu.Item>
    <Menu.Item onClick={() => uploadEditProductTheme('font', product, user)}>
      <Icon name='font' size='massive' />
      Font color
    </Menu.Item>
    <Menu.Menu style={{position: 'absolute', width: '100%', bottom: '25px'}}>
      <Menu.Item>
        <Button basic color='teal' onClick={closeEditProductTheme} size='huge'>Close</Button>
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
  uploadEditProductTheme: (options, product, user) => dispatch(uploadEditProductTheme(options, product, user)),
  closeEditProductTheme: () => dispatch(closeEditProductTheme()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductThemeMenu)
