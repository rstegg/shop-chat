import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { length } from 'ramda'

import ProductListItem from 'elements/ListItem/ProductListItem'

const ProductsList =
({
  products
}) =>
    <Card.Group>
      {length(products) ? products.map((product, i) =>
        <ProductListItem key={`product-${i}`} product={product} />
      ) :
        <Card>
          <Image src='/images/productholder.png' />
          <Card.Content>No Products!</Card.Content>
        </Card>
      }
    </Card.Group>

export default ProductsList
