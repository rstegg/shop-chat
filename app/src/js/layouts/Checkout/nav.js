import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Button, Label, Segment } from 'semantic-ui-react'
import { length } from 'ramda'

const CheckoutCart = ({ cart, productRemoveFromCart }) =>
  <div className='checkout-nav'>
    <Card style={{ maxWidth: '250px' }}>
      <Card.Header style={{ textAlign: 'center', margin: '5px' }}>Cart</Card.Header>
      <Card.Content>
        <Button.Group vertical>
          {length(cart) ? cart.map((product, i) =>
            <Segment key={i}>
              <Label to={`/user/${product.username}/product/${product.slug}`} as={NavLink} basic image>
                <img src={product.image || '/images/productholder.png'} alt={product.name} /> {product.name}
              </Label>
              <Label basic color='red' icon='delete' onClick={() => productRemoveFromCart(product)} style={{ border: 'none' }}/>
            </Segment>
          ) : <Segment>Empty!</Segment> }
        </Button.Group>
      </Card.Content>
    </Card>
  </div>

export default CheckoutCart
