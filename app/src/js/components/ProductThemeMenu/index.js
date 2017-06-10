import React from 'react'
import { connect } from 'react-redux'

import { Header, Menu, Button, Icon } from 'semantic-ui-react'

import { closeEditProductTheme, openEditProductThemeColor, } from 'actions/products'

const ProductThemeMenu = ({ product, user, openEditProductThemeColor, closeEditProductTheme }) =>
  <Menu icon='labeled' vertical inverted style={{width: '100%', height: '100%'}}>
    <Header block inverted>Theme</Header>
    <Menu.Item onClick={() => openEditProductThemeColor('primary')}>
      <Icon name='square' size='massive' />
      Primary color
    </Menu.Item>
    <Menu.Item onClick={() => openEditProductThemeColor('secondary')}>
      <Icon name='square' size='massive' />
      Secondary color
    </Menu.Item>
    <Menu.Item onClick={() => openEditProductThemeColor('background')}>
      <Icon name='square' size='massive' />
      Background color
    </Menu.Item>
    <Menu.Item onClick={() => openEditProductThemeColor('segment')}>
      <Icon name='square' size='massive' />
      Segment color
    </Menu.Item>
    <Menu.Item onClick={() => openEditProductThemeColor('font')}>
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
  openEditProductThemeColor: theme => dispatch(openEditProductThemeColor(theme)),
  closeEditProductTheme: () => dispatch(closeEditProductTheme()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductThemeMenu)
