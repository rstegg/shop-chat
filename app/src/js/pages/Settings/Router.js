import React from 'react'
import { Route, Switch } from 'react-router'

import SettingsLayout from 'components/layouts/Settings'

import AccountSettings from './Account'
import AddressSettings from './Address'
import WalletSettings from './Wallet'

export default () =>
  <SettingsLayout>
    <Switch>
      <Route exact path='/settings/account' component={AccountSettings} />
      <Route exact path='/settings/address' component={AddressSettings} />
      <Route exact path='/settings/wallet' component={WalletSettings} />
    </Switch>
  </SettingsLayout>
