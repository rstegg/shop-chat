import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Grid, Segment, Header, Image, Button } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import SocialMenu from 'components/SocialMenu'
import PurchaseButtons from 'components/Product/Cart/PurchaseButtons'
import ProductGridSegment from 'components/Product/Segment/GridSegment'

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

const hasAlpha = rgba => !!rgba && rgba.a === 0 ? 'none' : '0 1px 2px 0 rgba(34,36,38,.15)'

const getPrimary = pipe(getPrimaryRGB, toRGBStyle)
const getSecondary = pipe(getSecondaryRGB, toRGBStyle)
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getSegment = pipe(getSegmentRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const getSegmentAlpha = pipe(getSegmentRGB, hasAlpha)

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
            <ProductGridSegment>
              <Image src={product.image || '/images/productholder.png'} />
            </ProductGridSegment>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          <ProductGridSegment>
            <Header as='h1' style={{color: getFont(product)}}>{product.name}</Header>
          </ProductGridSegment>
          <ProductGridSegment>
            <Header as='h4' style={{color: getFont(product)}}>${product.price}</Header>
          </ProductGridSegment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          <ProductGridSegment>
            <Header as='h4' style={{color: getFont(product)}}>{product.description || 'No description'}</Header>
          </ProductGridSegment>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          {/*TODO*/}
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Segment compact style={{position: 'absolute', right: '0', top: '0'}}>
      <Grid.Column width={4} stretched>
        <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
        <PurchaseButtons />
        {user.id === productUserId(product) &&
          <Segment compact style={{width: '100%'}}>
            <Button fluid basic color='yellow' onClick={switchToProductAdmin}>Edit Product</Button>
          </Segment>
        }
      </Grid.Column>
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
