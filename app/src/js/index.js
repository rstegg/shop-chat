import 'bulma/css/bulma.css'
import '../styles/Main.css'
import 'rxjs'
import React from 'react'
import { render } from 'react-dom'

import RootRouter from './router'

window.Stripe.setPublishableKey('pk_test_uOGZjFbtEH0nSxSVNqHmWaEq') //TODO: Config

render(
  <RootRouter />,
  document.querySelector('#root')
)
