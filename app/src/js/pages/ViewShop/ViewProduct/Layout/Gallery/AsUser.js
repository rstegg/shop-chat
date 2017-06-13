import React from 'react'
import { Card, Grid, Segment, Header, Image } from 'semantic-ui-react'
import { pipe, prop, path, length } from 'ramda'

import ProductCartMenu from 'components/Product/Cart/Menu'
import ProductGallerySegment from 'components/Product/Segment/GallerySegment'

const getImage = prop('image')
const getName = prop('name')
const getDesc = prop('description')
const getPrice = prop('price')
const productGallery = prop('gallery')

const productHasGallery = pipe(productGallery, length, Boolean)

const getPrimaryRGB = path(['themes', 'primary', 'rgb'])
const getSecondaryRGB = path(['themes', 'secondary', 'rgb'])
const getBackgroundRGB = path(['themes', 'background', 'rgb'])
const getFontRGB = path(['themes', 'font', 'rgb'])

const toRGBStyle = rgba => !!rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : `rgba(255,255,255,1)`

const getPrimary = pipe(getPrimaryRGB, toRGBStyle)
const getSecondary = pipe(getSecondaryRGB, toRGBStyle)
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const UserView = ({
  product,
  user
}) =>
  <div className='product-container'>
    <Grid celled='internally' style={{backgroundColor: getBackground(product)}}>
      <Grid.Column width={8} stretched>
        <Segment basic style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ProductGallerySegment>
            <Image src={product.image || '/images/productholder.png'} />
          </ProductGallerySegment>
          <Card.Group itemsPerRow={4}>
            { productHasGallery(product) && productGallery(product).map((item, i) =>
              <Card key={`gallery-${i}`} className='gallery-image'>
                <Image src={getImage(item) || '/images/productholder.png'} />
              </Card>
            )}
          </Card.Group>
        </Segment>
      </Grid.Column>
      <Grid.Column width={8} stretched>
        <ProductGallerySegment>
          <Header as='h1' style={{color: getFont(product)}}>{getName(product)}</Header>
        </ProductGallerySegment>
        <ProductGallerySegment>
          <Header as='h4' style={{color: getFont(product)}}>${getPrice(product)}</Header>
        </ProductGallerySegment>
        {getDesc(product) && <ProductGallerySegment>
          <Header as='h4' style={{color: getFont(product)}}>{getDesc(product) || 'No description'}</Header>
        </ProductGallerySegment>}
      </Grid.Column>
    </Grid>
    <ProductCartMenu />
  </div>

export default UserView
