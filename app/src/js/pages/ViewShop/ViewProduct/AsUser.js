import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Grid, Segment, Header, Popup, Image, Button } from 'semantic-ui-react'
import { path } from 'ramda'

import ProductPaymentMenu from 'components/ProductPaymentMenu'
import SocialMenu from 'components/SocialMenu'

import { openPurchase, closePurchase } from 'actions/orders'

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
  makePurchase,
  addToCart,
  openPurchase,
  closePurchase,
  switchToProductAdmin
}) =>
  <Grid celled='internally' className='product__container'>
    <Grid.Column width={6} stretched>
      <Segment basic>
        <Segment>
          <Image src={product.image || '/images/productholder.png'} className='product--image avatar-image' />
        </Segment>
        <Segment>
          <Header as='h1'>{product.name}</Header>
        </Segment>
        <Segment>
          <Header as='h4'>{product.description || 'No description'}</Header>
        </Segment>
        <Segment>
          <Header as='h4'>${product.price || '0.00'}</Header>
        </Segment>
        <Segment>
          <Button.Group vertical fluid>
            <Popup wide position='top right' on='click'
              trigger={<Button type='button' basic color='green' disabled={!product} style={{justifyContent: 'center'}}>Buy now</Button>}
              open={orders.isOpen}
              onOpen={openPurchase} onClose={closePurchase}>
                <Popup.Header>Buy now</Popup.Header>
                <Popup.Content>
                  <ProductPaymentMenu
                    product={product}
                    onSubmit={values => {
                      makePurchase(product.id, user)
                      closePurchase()
                    }} />
                </Popup.Content>
            </Popup>
            <Button fluid basic color='green' onClick={() => addToCart(product.id)} style={{justifyContent: 'center'}}>Add to cart</Button>
          </Button.Group>
        </Segment>
        {user.id === productUserId(product) ?
          <Segment style={{display: 'flex', justifyContent: 'center'}}>
            <Button basic onClick={switchToProductAdmin}>Edit mode</Button>
          </Segment>
          :
          <Segment>
            <Button.Group vertical fluid>
              <Popup wide position='top right' on='click'
                trigger={<Button type='button' basic color='green' disabled={!product} style={{justifyContent: 'center'}}>Buy now</Button>}
                open={orders.isOpen}
                onOpen={openPurchase} onClose={closePurchase}>
                  <Popup.Header>Buy now</Popup.Header>
                  <Popup.Content>
                    <ProductPaymentMenu
                      product={product}
                      onSubmit={values => {
                        makePurchase(product.id, user)
                        closePurchase()
                      }} />
                  </Popup.Content>
              </Popup>
              <Button fluid basic color='green' onClick={() => addToCart(product.id)} style={{justifyContent: 'center'}}>Add to cart</Button>
            </Button.Group>
          </Segment>
        }
      </Segment>
    </Grid.Column>
    <Grid.Column width={10} stretched>
      <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
      <Segment style={{display: 'flex', justifyContent: 'space-between'}}>
        <NavLink to={`/user/${productUsername(product)}`}>
          <Button basic color='orange' compact>
            more from <Image avatar src={productUserAvatar(product) || '/images/placeholder.png'} /> {productUsername(product)}
          </Button>
        </NavLink>
        <NavLink to={`/shop/${productShopSlug(product)}`}>
          <Button basic color='red' compact>
            more from <Image avatar src={productShopImage(product) || '/images/productholder.png'} /> {productShopName(product)}
          </Button>
        </NavLink>
      </Segment>
    </Grid.Column>
  </Grid>

const mapStateToProps = ({orders}) =>
({
  orders
})

const mapDispatchToProps = dispatch =>
({
  openPurchase: () => dispatch(openPurchase()),
  closePurchase: () => dispatch(closePurchase()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView)
