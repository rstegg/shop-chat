import React from 'react'
import { Feed } from 'semantic-ui-react'

import ProductItem from 'elements/ProductItem'

const ProductsList =
({
  products
}) =>
    <Feed>
      {!!products.length ? products.map((product, i) =>
        <ProductItem key={`product-${i}`} product={product} />
      ) :
        <Feed.Event>
          <Feed.Label image='/images/productholder.png' />
          <Feed.Content content='No Products!' />
        </Feed.Event>
      }
    </Feed>

export default ProductsList
