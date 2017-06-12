import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Grid, Segment, Header, Image, Button } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import SocialMenu from 'components/SocialMenu'

import { productBuyNow, productAddToCart } from 'actions/orders'

const productUserId = path(['user', 'id'])
const productUsername = path(['user', 'username'])

const productUserAvatar = path(['user', 'image'])

const productShopSlug = path(['shop', 'slug'])
const productShopName = path(['shop', 'name'])
const productShopImage = path(['shop', 'image'])

const getPrimaryRGB = path(['themes', 'primary', 'rgb'])
const getSecondaryRGB = path(['themes', 'secondary', 'rgb'])
const getBackgroundRGB = path(['themes', 'background', 'rgb'])
const getSegmentRGB = path(['themes', 'segment', 'rgb'])
const getFontRGB = path(['themes', 'font', 'rgb'])

const toRGBStyle = rgba => !!rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : `rgba(255,255,255,1)`

const getPrimary = pipe(getPrimaryRGB, toRGBStyle)
const getSecondary = pipe(getSecondaryRGB, toRGBStyle)
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getSegment = pipe(getSegmentRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const UserView = ({
  orders,
  product,
  user,
  switchToProductAdmin,
  productBuyNow,
  productAddToCart,
}) =>
  <div className='product-container' style={{backgroundColor: getBackground(product)}}>
    <Grid celled='internally'>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          <Segment basic>
            <Segment className='avatar-image'>
              <Image src={product.image || '/images/productholder.png'} />
            </Segment>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          <Segment compact style={{backgroundColor: getSegment(product)}}>
            <Header as='h1' style={{color: getFont(product)}}>{product.name}</Header>
          </Segment>
          <Segment compact style={{backgroundColor: getSegment(product)}}>
            <Header as='h4' style={{color: getFont(product)}}>${product.price}</Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          <Segment style={{backgroundColor: getSegment(product)}}>
            <Header as='h4' style={{color: getFont(product)}}>{product.description || 'No description'}</Header>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          {user.id === productUserId(product) ?
            <Segment style={{display: 'flex', justifyContent: 'center'}}>
              <Button basic onClick={switchToProductAdmin}>Edit Product</Button>
            </Segment>
            :
            <Segment>
              <Button.Group vertical fluid>
                <NavLink to='/checkout/review'>
                  <Button type='button' basic color='green' onClick={() => productBuyNow(product)} style={{justifyContent: 'center'}}>Buy now</Button>
                </NavLink>
                <Button fluid basic color='green' onClick={() => productAddToCart(product)} style={{justifyContent: 'center'}}>Add to cart</Button>
              </Button.Group>
            </Segment>
          }
          <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
          <Segment compact  style={{display: 'flex', justifyContent: 'space-between'}}>
            <NavLink to={`/user/${productUsername(product)}`}>
              <Button basic color='orange' compact>
                more from <Image avatar src={productUserAvatar(product) || '/images/placeholder.png'} /> {productUsername(product)}
              </Button>
            </NavLink>
            <NavLink to={`/shop/${productShopSlug(product)}`}>
              <Button basic color='teal' compact>
                more from <Image avatar src={productShopImage(product) || '/images/productholder.png'} /> {productShopName(product)}
              </Button>
            </NavLink>
          </Segment>
        </Grid.Column>

      </Grid.Row>
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
