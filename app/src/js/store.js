// Redux helpers
import { applyMiddleware, createStore, compose } from 'redux'
// Persist store to localstorage
import { persistStore, autoRehydrate } from 'redux-persist'
// Redux-Observable middleware (async actions)
import { createEpicMiddleware } from 'redux-observable'
// React-Router (v4)
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// SocketIO
import createSocketIoMiddleware from 'utils/redux-socket-io'
import io from 'socket.io-client'
const socket = io({ path: '/WSS' })
// All actions beginning with 'WS/' will be emitted
const socketIoMiddleware = createSocketIoMiddleware(socket, 'WS/')

// Declare history and wrap history in middleware
export const history = createHistory()
const routingMiddleware = routerMiddleware(history)

// Declare rootEpic and wrap epics in middleware
import rootEpic from './redux/epics'
const epicMiddleware = createEpicMiddleware(rootEpic)

// Declare rootReducer for redux
import rootReducer from './redux/reducers'

// Enable redux dev tools in development
const composeEnhancers = process.env.NODE_ENV !== 'production' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

// Disable react dev tools in production
if (
  process.env.NODE_ENV === 'production' &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {}
}

// Create store for redux with middlewares and redux-persist
const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
      routingMiddleware,
      socketIoMiddleware
    ),
    autoRehydrate()
  )
)

// ReduxPersist config to only cache these reducers
const persistConfig = {
  whitelist: [ 'user' ]
}
persistStore(store, persistConfig)

// Enable reducer hot reloading in development
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./redux/reducers/index', () =>
      store.replaceReducer(require('./redux/reducers/index'))
    )
  }
}

export default store
