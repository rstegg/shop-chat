import React from 'react'
import { connect } from 'react-redux'
import { pipe, path } from 'ramda'

import { Header, Menu, Button, Icon } from 'semantic-ui-react'

import { closeEditProductTheme, openEditProductThemeColor, } from 'actions/products'

const getPrimaryRGB = path([ 'themes', 'primary' ])
const getSecondaryRGB = path([ 'themes', 'secondary' ])
const getBackgroundRGB = path([ 'themes', 'background' ])
const getSegmentRGB = path([ 'themes', 'segment' ])
const getFontRGB = path([ 'themes', 'font' ])

const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(255,255,255,1)'

const getPrimary = pipe(getPrimaryRGB, toRGBStyle)
const getSecondary = pipe(getSecondaryRGB, toRGBStyle)
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getSegment = pipe(getSegmentRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const ProductThemeMenu = ({ product, openEditProductThemeColor, closeEditProductTheme }) =>
  <Menu icon='labeled' inverted style={{ width: '100%', height: '100%' }}>
    <Header block inverted>Theme</Header>
    <Menu.Item onClick={() => openEditProductThemeColor('primary')}>
      <Icon name='square' size='massive' style={{ color: getPrimary(product) }} />
      Primary color
    </Menu.Item>
    <Menu.Item onClick={() => openEditProductThemeColor('secondary')}>
      <Icon name='square' size='massive' style={{ color: getSecondary(product) }} />
      Secondary color
    </Menu.Item>
    <Menu.Item onClick={() => openEditProductThemeColor('background')}>
      <Icon name='square' size='massive' style={{ color: getBackground(product) }} />
      Background color
    </Menu.Item>
    <Menu.Item onClick={() => openEditProductThemeColor('segment')}>
      <Icon name='square' size='massive' style={{ color: getSegment(product) }} />
      Segment color
    </Menu.Item>
    <Menu.Item onClick={() => openEditProductThemeColor('font')}>
      <Icon name='font' size='massive' style={{ color: getFont(product) }} />
      Font color
    </Menu.Item>
    <Menu.Item onClick={closeEditProductTheme}>
      <Icon name='remove' size='massive' style={{ color: 'red' }} />
      Close
    </Menu.Item>
  </Menu>

const mapStateToProps = ({ products }) =>
({
  product: products.current
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
