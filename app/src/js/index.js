import 'semantic-ui-css/semantic.min.css'
import '../styles/Main.css'
import 'rxjs'
import React from 'react'
import { render } from 'react-dom'

import RootRouter from './router'

render(
  <RootRouter />,
  document.querySelector('#root')
)
