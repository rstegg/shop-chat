import React, { Component } from 'react'
import { persistStore } from 'redux-persist'

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter as Router } from 'react-router-redux'

import MainRouter from './pages/Main/Router'
import CheckoutRouter from './pages/Checkout/Router'
import SettingsRouter from './pages/Settings/Router'
import ShopRouter from './pages/Shop/Router'
import ProductRouter from './pages/Product/Router'
import ProfileRouter from './pages/Profile/Router'

import store, { history } from './store'

import RootLayout from 'layouts/Root'

export default class AppRouter extends Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
    return (
      <Provider store={store}>
        <Router history={history}>
            <RootLayout>
              <Switch>
                <Route path='/checkout' component={CheckoutRouter} />
                <Route path='/settings' component={SettingsRouter} />
                <Route path='/shop/:shopId/product' component={ProductRouter} />
                <Route path='/shop' component={ShopRouter} />
                <Route path='/user' component={ProfileRouter} />
                <Route path='/' component={MainRouter} />
              </Switch>
            </RootLayout>
        </Router>
      </Provider>
    )
  }
}
