import React from 'react'
import { Route, Switch } from 'react-router'

import CheckoutLayout from 'layouts/Checkout'

import ReviewCheckout from 'pages/Checkout/Review'
import ProcessedCheckout from 'pages/Checkout/Processed'

const CheckoutRouter = () =>
  <CheckoutLayout>
    <Switch>
      <Route exact path='/checkout/review' component={ReviewCheckout} />
      <Route exact path='/checkout/processed' component={ProcessedCheckout} />
    </Switch>
  </CheckoutLayout>

export default CheckoutRouter
