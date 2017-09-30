import React, { Component } from 'react'
import { persistStore } from 'redux-persist'

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter as Router } from 'react-router-redux'

import RootLayout from 'layouts/Root'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Signup from 'pages/Signup'

import ProfileRouter from 'navigation/Profile/Router'
import CheckoutRouter from 'navigation/Checkout/Router'
import SettingsRouter from 'navigation/Settings/Router'

import CreateProduct from 'pages/Product/New'

import store, { history } from '../redux/store'

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
    if (!this.state.rehydrated) {
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
              <Route exact path='/products/new' component={CreateProduct} />
              <Route path='/user/:username' component={ProfileRouter} />
              <Route path='/settings' component={SettingsRouter} />
              <Route path='/checkout' component={CheckoutRouter} />
            </Switch>
          </RootLayout>
        </Router>
      </Provider>
    )
  }
}
