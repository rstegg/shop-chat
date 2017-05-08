import 'semantic-ui-css/semantic.min.css'
import '../styles/Main.css'
import 'rxjs'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter as Router } from 'react-router-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Products from './pages/Products'

import CreateProduct from './pages/CreateProduct'
import ViewProduct from './pages/ViewProduct'
import EditProduct from './pages/EditProduct'

import Shops from './pages/Shops'
import CreateShop from './pages/CreateShop'
import ViewShop from './pages/ViewShop'

import ViewProfile from './pages/ViewProfile'

import store, { history } from './store'

import RootLayout from './components/layouts/Root'

render(
  <Provider store={store}>
    <Router history={history}>
        <RootLayout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/new' component={CreateProduct} />
            <Route exact path='/products/edit/:id' component={EditProduct} />
            <Route exact path='/product/:id' component={ViewProduct} />
            <Route exact path='/shops' component={Shops} />
            <Route exact path='/pages/new' component={CreateShop} />
            <Route exact path='/shop/:id' component={ViewShop} />
            <Route exact path='/user/:id' component={ViewProfile} />
          </Switch>
        </RootLayout>
    </Router>
  </Provider>,
  document.querySelector('#root')
)
