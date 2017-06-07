import React, { Component } from 'react'
import { persistStore } from 'redux-persist'

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter as Router } from 'react-router-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CheckoutRouter from './pages/Checkout/Router'
import SettingsRouter from './pages/Settings/Router'
import ShopRouter from './pages/ViewShop/Router'

import Shops from './pages/Shops'
import CreateShop from './pages/CreateShop'

import ViewProfile from './pages/ViewProfile'

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
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route path='/settings' component={SettingsRouter} />
              <Route path='/checkout' component={CheckoutRouter} />
              <Route exact path='/shops' component={Shops} />
              <Route exact path='/shops/new' component={CreateShop} />
              <Route path='/shop/:shopId' component={ShopRouter} />
              <Route exact path='/user/:id' component={ViewProfile} />
            </Switch>
          </RootLayout>
        </Router>
      </Provider>
    )
  }
}
