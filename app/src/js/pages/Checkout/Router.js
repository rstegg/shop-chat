import React from 'react'
import { Route, Switch } from 'react-router'

import ReviewCheckout from './Review'
import ProcessedCheckout from './Processed'

import CheckoutLayout from 'components/layouts/Checkout'

export default () =>
  <CheckoutLayout>
    <Switch>
      <Route exact path='/checkout/review' component={ReviewCheckout} />
      <Route exact path='/checkout/processed' component={ProcessedCheckout} />
    </Switch>
  </CheckoutLayout>
