import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, Grid, Segment, Header, Image, Button } from 'semantic-ui-react'
import { pipe, prop, path, length } from 'ramda'

import SocialMenu from 'components/SocialMenu'

import { productBuyNow, productAddToCart } from 'actions/orders'

const productUserId = path(['user', 'id'])
const productUsername = path(['user', 'username'])

const productUserAvatar = path(['user', 'image'])

const productShopSlug = path(['shop', 'slug'])
const productShopName = path(['shop', 'name'])
const productShopImage = path(['shop', 'image'])

const getImage = prop('image')
const getName = prop('name')
const getDesc = prop('description')
const getPrice = prop('price')
const productGallery = prop('gallery')

const productHasGallery = pipe(productGallery, length, Boolean)

const UserView = ({
  orders,
  product,
  user,
  switchToProductAdmin,
  productBuyNow,
  productAddToCart,
}) =>
  <div className='product-container'>
    <Grid celled='internally'>
      <Grid.Column width={10} stretched>
        <Segment basic>
          <Segment className='avatar-image'>
            <Image src={product.image || '/images/productholder.png'} />
          </Segment>
          <Card.Group itemsPerRow={4}>
            { productHasGallery(product) && productGallery(product).map((item, i) =>
              <Card key={`gallery-${i}`} className='gallery-image'>
                <Image src={getImage(item) || '/images/productholder.png'} />
              </Card>
            )}
          </Card.Group>
        </Segment>
      </Grid.Column>
      <Grid.Column width={6} stretched>
        <Segment compact>
          <Header as='h1'>{getName(product)}</Header>
        </Segment>
        <Segment compact>
          <Header as='h4'>{getDesc(product) || 'No description'}</Header>
        </Segment>
        <Segment compact>
          <Header as='h4'>${getPrice(product)}</Header>
        </Segment>
        <Segment compact style={{width: '100%'}}>
          <Button.Group fluid>
            <Button basic color='green' as={NavLink} to='/checkout/review' type='button'  onClick={() => productBuyNow(product)} style={{justifyContent: 'center'}}>Buy now</Button>
            <Button basic color='orange' onClick={() => productAddToCart(product)} style={{justifyContent: 'center'}}>Add to cart</Button>
          </Button.Group>
        </Segment>
        <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
        <Segment compact style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button as={NavLink} to={`/user/${productUsername(product)}`} basic color='orange' compact>
            more from <Image avatar src={productUserAvatar(product) || '/images/placeholder.png'} /> {productUsername(product)}
          </Button>
          <Button as={NavLink} to={`/shop/${productShopSlug(product)}`} basic color='red' compact>
            more from <Image avatar src={productShopImage(product) || '/images/productholder.png'} /> {productShopName(product)}
          </Button>
        </Segment>
        {user.id === productUserId(product) &&
          <Segment compact style={{width: '100%'}}>
            <Button fluid basic color='yellow' onClick={switchToProductAdmin}>Edit Product</Button>
          </Segment>
        }
      </Grid.Column>
    </Grid>
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