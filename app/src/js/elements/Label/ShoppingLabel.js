import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Label, Icon } from 'semantic-ui-react'

const ShoppingLabel = ({cart}) =>
  !!cart.length ? (
  <Label as={NavLink} to={`/checkout/review`} basic color='green'>
    <Icon name='shop' /> {cart.length}
  </Label>
  ) : (
  <Label as={NavLink} to={`/checkout/review`} basic>
    <Icon name='shop' />
  </Label>
  )

const mapStateToProps = ({orders}) =>
({
  cart: orders.cart
})
const mapDispatchToProps = dispatch =>
({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingLabel)
