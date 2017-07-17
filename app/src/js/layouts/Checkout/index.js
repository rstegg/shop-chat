import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { productRemoveFromCart } from 'actions/orders'

import CheckoutNav from './nav'

const Checkout = ({ user, cart, productRemoveFromCart, children }) =>
  !user.isAuthenticated ?
    <Redirect to='/' />
  :
    <div className='checkout'>
      <CheckoutNav cart={cart} productRemoveFromCart={productRemoveFromCart} />
      {children}
    </div>

const mapStateToProps = ({ user, orders }) =>
({
  user,
  cart: orders.cart
})

const mapDispatchToProps = dispatch =>
({
  productRemoveFromCart: product => dispatch(productRemoveFromCart(product))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
