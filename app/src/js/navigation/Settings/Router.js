import React from 'react'
import { Route, Switch } from 'react-router'

import SettingsLayout from 'layouts/Settings'

import AccountSettings from 'pages/Settings/Account'
import AddressSettings from 'pages/Settings/Address'
import WalletSettings from 'pages/Settings/Wallet'
import WithdrawSettings from 'pages/Settings/Withdraw'

const SettingsRouter = () =>
  <SettingsLayout>
    <Switch>
      <Route exact path='/settings/account' component={AccountSettings} />
      <Route exact path='/settings/address' component={AddressSettings} />
      <Route exact path='/settings/wallet' component={WalletSettings} />
      <Route exact path='/settings/withdraw' component={WithdrawSettings} />
    </Switch>
  </SettingsLayout>

export default SettingsRouter
