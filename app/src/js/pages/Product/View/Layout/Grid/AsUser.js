import React from 'react'
import { Grid, Segment, Header, Image } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import ProductCartMenu from 'components/Product/CartMenu'
import ProductGridSegment from 'components/Product/Segment/GridSegment'

const getBackgroundRGB = path([ 'themes', 'background' ])
const getFontRGB = path([ 'themes', 'font' ])

const toRGBStyle = rgba => rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : 'rgba(255,255,255,1)'
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const UserView = ({ product }) =>
  <div className='ui segment product-container' style={{ background: getBackground(product) }}>
    <Grid celled='internally'>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          <Segment basic style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ProductGridSegment>
              <Image src={product.image || '/images/productholder.png'} />
            </ProductGridSegment>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          <ProductGridSegment>
            <Header as='h1' style={{ color: getFont(product) }}>{product.name}</Header>
          </ProductGridSegment>
          <ProductGridSegment>
            <Header as='h4' style={{ color: getFont(product) }}>${product.price}</Header>
          </ProductGridSegment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          {!!product.description && <ProductGridSegment>
            <Header as='h4' style={{ color: getFont(product) }}>{product.description || 'No description'}</Header>
          </ProductGridSegment>}
        </Grid.Column>
        <Grid.Column width={8} stretched>
          {/*TODO*/}
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <ProductCartMenu />
  </div>

export default UserView
