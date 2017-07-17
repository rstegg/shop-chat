import React from 'react'
import { Route, Switch } from 'react-router'

import ReviewCheckout from './Review'
import ProcessedCheckout from './Processed'

import CheckoutLayout from 'layouts/Checkout'

const CheckoutRouter = () =>
  <CheckoutLayout>
    <Switch>
      <Route exact path='/checkout/review' component={ReviewCheckout} />
      <Route exact path='/checkout/processed' component={ProcessedCheckout} />
    </Switch>
  </CheckoutLayout>

export default CheckoutRouter
