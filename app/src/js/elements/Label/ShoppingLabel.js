import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Label, Icon } from 'semantic-ui-react'

import isMobile from 'utils/isMobile'

const ShoppingLabel = ({ cart }) =>
  cart.length ?
    <Label as={NavLink} to='/checkout/review' basic color='green'>
      <Icon name='shop' /> {cart.length} {!isMobile && 'cart'}
    </Label>
  :
    <Label as={NavLink} to='/checkout/review' basic>
      <Icon name='shop' /> {!isMobile && 'cart'}
    </Label>

const mapStateToProps = ({ orders }) =>
({
  cart: orders.cart
})

export default connect(
  mapStateToProps
)(ShoppingLabel)
