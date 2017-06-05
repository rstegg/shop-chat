import React from 'react'
import { Feed } from 'semantic-ui-react'
import { length } from 'ramda'

import ProductListItem from 'elements/ListItem/ProductListItem'

const ProductsList =
({
  products
}) =>
    <Feed>
      {length(products) ? products.map((product, i) =>
        <ProductListItem key={`product-${i}`} product={product} />
      ) :
        <Feed.Event>
          <Feed.Label image='/images/productholder.png' />
          <Feed.Content content='No Products!' />
        </Feed.Event>
      }
    </Feed>

export default ProductsList
