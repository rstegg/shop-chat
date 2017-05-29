import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, Label, List, Button, Header, Segment } from 'semantic-ui-react'
import { length } from 'ramda'

import { productRemoveFromCart } from 'actions/orders'

const ReviewCheckout = ({cart}) =>
  <Card>
    <Card.Content>
      <Card.Header>Checkout Review</Card.Header>
      <Card.Description>
        <Button.Group vertical>
          {length(cart) ? cart.map((product, i) =>
            <Segment key={i}>
              <Label to={`/shop/${product.shop.slug}/product/${product.slug}`} as={NavLink} basic image>
                <img src={product.image || '/images/productholder.png'} alt={product.name} /> {product.name}
              </Label>
              <Label basic color='red' icon='delete' onClick={() => productRemoveFromCart(product)} style={{border: 'none'}}/>
            </Segment>
          ) : <Segment>Empty!</Segment> }
        </Button.Group>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {length(cart) ?
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button basic onClick={() => {}}>Place your order</Button>
        <List>
          {cart.map((product, i) =>
            <List.Item key={i}>{product.name}: ${product.price}</List.Item>
          )}
        </List>
        <Header>Total: ${cart.reduce((acc, product) => parseInt(product.price, 10) + acc, 0)}</Header>
      </div>
      : 'Go Shop!'}
    </Card.Content>
  </Card>

const mapStateToProps = ({user, orders}) =>
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
)(ReviewCheckout)
