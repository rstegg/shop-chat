import React from 'react'
import { Route, Switch } from 'react-router'

import ShopLayout from './index'

import Products from './Products'
import ViewProduct from './ViewProduct'

export default ({match}) => {
  return (
    <ShopLayout match={match}>
      <Switch>
        <Route exact path='/shop/:shopId' component={Products} />
        <Route exact path='/shop/:shopId/product/:productId' component={ViewProduct} />
      </Switch>
    </ShopLayout>
  )
}
