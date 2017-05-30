import React from 'react'
import { Route, Switch } from 'react-router'

import SettingsLayout from 'components/layouts/Settings'

import AccountSettings from './Account'
import WalletSettings from './Wallet'
import ShippingSettings from './Shipping'

export default () =>
  <SettingsLayout>
    <Switch>
      <Route exact path='/settings/account' component={AccountSettings} />
      <Route exact path='/settings/wallet' component={WalletSettings} />
      <Route exact path='/settings/shipping' component={ShippingSettings} />
    </Switch>
  </SettingsLayout>
