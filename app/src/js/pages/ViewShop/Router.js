import React from 'react'
import { Route, Switch } from 'react-router'

import ShopLayout from './index'

import Products from './Products'
import CreateProduct from './CreateProduct'
import ViewProduct from './ViewProduct'

export default ({match}) =>
  <ShopLayout match={match}>
    <Switch>
      <Route exact path='/shop/:shopId' component={Products} />
      <Route exact path='/shop/:shopId/products/new' component={CreateProduct} />
      <Route exact path='/shop/:shopId/product/:productId' component={ViewProduct} />
    </Switch>
  </ShopLayout>
