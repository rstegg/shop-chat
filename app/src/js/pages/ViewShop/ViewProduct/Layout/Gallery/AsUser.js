import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Card, Divider, Grid, Segment, Header, Image, Button } from 'semantic-ui-react'
import { pipe, prop, path, length } from 'ramda'

import SocialMenu from 'components/SocialMenu'
import PurchaseButtons from 'components/Product/Cart/PurchaseButtons'

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
  switchToProductAdmin
}) =>
  <div className='product-container'>
    <Grid celled='internally' style={{backgroundColor: getBackground(product)}}>
      <Grid.Column width={6} stretched>
        <Segment basic>
          <Segment className='avatar-image' style={{backgroundColor: getSegment(product), borderColor: getSegment(product), boxShadow: getSegmentAlpha(product)}}>
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
        <Segment compact style={{backgroundColor: getSegment(product), borderColor: getSegment(product), boxShadow: getSegmentAlpha(product)}}>
          <Header as='h1' style={{color: getFont(product)}}>{getName(product)}</Header>
        </Segment>
        <Segment compact style={{backgroundColor: getSegment(product), borderColor: getSegment(product), boxShadow: getSegmentAlpha(product)}}>
          <Header as='h4' style={{color: getFont(product)}}>{getDesc(product) || 'No description'}</Header>
        </Segment>
        <Segment compact style={{backgroundColor: getSegment(product), borderColor: getSegment(product), boxShadow: getSegmentAlpha(product)}}>
          <Header as='h4' style={{color: getFont(product)}}>${getPrice(product)}</Header>
        </Segment>
      </Grid.Column>
      <Grid.Column width={4} stretched>
        <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
        <PurchaseButtons />
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

export default connect(
  mapStateToProps
)(UserView)
