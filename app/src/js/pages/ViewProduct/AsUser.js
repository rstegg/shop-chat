import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, Popup, Image, Button, Grid, Divider, Rail } from 'semantic-ui-react'
import { path } from 'ramda'

import ProductChatPage from 'components/Chat'
import ProductPaymentMenu from 'components/ProductPaymentMenu'
import SocialMenu from 'components/SocialMenu'

import { openPurchase, closePurchase } from 'actions/orders'

const productUsername = path(['user', 'username'])

const productUserAvatar = path(['user', 'image'])

const productShopSlug = path(['shop', 'slug'])
const productShopName = path(['shop', 'name'])
const productShopImage = path(['shop', 'image'])

const renderType = (price_type, price) =>
  price_type === 'fixed' ? `Price: $${price}` : 'Offer'

const UserView = ({
  orders,
  product,
  user,
  makePurchase,
  addToCart,
  openPurchase,
  closePurchase
}) =>
  <Grid>
      <Grid.Column>
        <Grid.Row>
          <Card>
            <Image src={product.image || '/images/productholder.png'} className='product--image' />
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
              <Card.Meta>{renderType(product.price_type, product.price)}</Card.Meta>
              <Card.Description>{product.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
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
              <Divider />
              <div className='ui two buttons'>
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
              </div>
            </Card.Content>
          </Card>
          <Rail attached position='right'>
            <ProductChatPage thread={product} threadType='product' />
          </Rail>
        </Grid.Row>
        <Grid.Row>
          <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
        </Grid.Row>
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
