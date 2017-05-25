import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import AccountSettings from './Account'
import WalletSettings from './Wallet'

import SettingsLayout from 'components/layouts/Settings'

export default () =>
  <SettingsLayout>
    <Switch>
      <Route exact path='/settings' component={AccountSettings} />
      <Route exact path='/settings/wallet' component={WalletSettings} />
    </Switch>
  </SettingsLayout>
