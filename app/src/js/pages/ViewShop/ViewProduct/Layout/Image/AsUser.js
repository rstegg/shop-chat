import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Grid, Segment, Header, Image, Button, List } from 'semantic-ui-react'
import { path } from 'ramda'

import SocialMenu from 'components/SocialMenu'

import { productBuyNow, productAddToCart } from 'actions/orders'

const productUserId = path(['user', 'id'])
const productUsername = path(['user', 'username'])

const productUserAvatar = path(['user', 'image'])

const productShopSlug = path(['shop', 'slug'])
const productShopName = path(['shop', 'name'])
const productShopImage = path(['shop', 'image'])

const UserView = ({
  orders,
  product,
  user,
  switchToProductAdmin,
  productBuyNow,
  productAddToCart,
}) =>
  <div className='product-container'>
    <Image src={product.image || '/images/productholder.png'} className='product--image avatar-image product-image-underlay' />
    <Segment basic style={{display: 'flex', width: '100%', pointerEvents: 'none', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <Segment style={{pointerEvents: 'auto'}}>
        <Header as='h1'>{product.name}</Header>
      </Segment>
      <Segment style={{pointerEvents: 'auto'}}>
        <Header as='h4'>{product.description || 'No description'}</Header>
      </Segment>
      <Segment style={{pointerEvents: 'auto'}}>
        <Header as='h4'>${product.price}</Header>
      </Segment>
      <Segment style={{pointerEvents: 'auto'}}>
          {user.id === productUserId(product) ?
            <Button type='button' basic onClick={() => switchToProductAdmin()} style={{justifyContent: 'center'}}>Edit Product</Button>
            :
          <Button.Group vertical fluid>
            <NavLink to='/checkout/review'>
              <Button type='button' basic color='green' onClick={() => productBuyNow(product)} style={{justifyContent: 'center'}}>Buy now</Button>
            </NavLink>
            <Button fluid basic color='green' onClick={() => productAddToCart(product)} style={{justifyContent: 'center'}}>Add to cart</Button>
          </Button.Group>
          }
      </Segment>
    </Segment>
  </div>

const mapStateToProps = ({orders}) =>
({
  orders
})

const mapDispatchToProps = dispatch =>
({
  productBuyNow: product => dispatch(productBuyNow(product)),
  productAddToCart: product => dispatch(productAddToCart(product)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView)
