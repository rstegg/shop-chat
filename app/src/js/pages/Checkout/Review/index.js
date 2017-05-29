import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, List, Button, Header, Segment } from 'semantic-ui-react'
import { length } from 'ramda'

import { productRemoveFromCart } from 'actions/orders'

const ReviewCheckout = ({cart, user, address}) =>
  <Card>
    <Card.Content>
      <Card.Header>Checkout Review</Card.Header>
      <Card.Description>
        <Segment>
          <Header>Shipping Address</Header>
          <List>
            <List.Item>{address.name}</List.Item>
            <List.Item>{address.line1}</List.Item>
            <List.Item>{address.line2}</List.Item>
            <List.Item>{address.city}, {address.region} {address.zip}</List.Item>
            <List.Item>{address.country}</List.Item>
          </List>
          <NavLink to='/settings/shipping'>
            <Button basic>Change</Button>
          </NavLink>
        </Segment>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {length(cart) ?
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Header>Review items and shipping</Header>
        <List>
          {cart.map((product, i) =>
            <List.Item key={i}>{product.name}: ${product.price}</List.Item>
          )}
        </List>
        TODO: SHIPPING LOL
        <Header>Total: ${cart.reduce((acc, product) => parseFloat(product.price, 10) + acc, 0)}</Header>
        <Button basic onClick={() => {}}>Place your order</Button>
      </div>
      : 'Go Shop!'}
    </Card.Content>
  </Card>

const mapStateToProps = ({user, orders}) =>
({
  user,
  address: user.address,
  cart: orders.cart
})

const mapDispatchToProps = dispatch =>
({
  productRemoveFromCart: product => dispatch(productRemoveFromCart(product))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewCheckout)
