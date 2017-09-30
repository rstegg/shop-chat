import React from 'react'
import { Route, Switch } from 'react-router'

import ProfileLayout from 'layouts/Profile'

import ProductList from 'pages/Product/List'
import ViewProduct from 'pages/Product/View'

const ViewShopRouter = ({ match }) =>
  <ProfileLayout match={match}>
    <Switch>
      <Route exact path='/user/:username' component={ProductList} />
      <Route exact path='/user/:username/product/:productId' component={ViewProduct} />
    </Switch>
  </ProfileLayout>

export default ViewShopRouter
