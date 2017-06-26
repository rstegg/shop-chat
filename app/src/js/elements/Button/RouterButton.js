import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const RouterButton = ({to, className, activeClassName, prefix, label}) =>
  <span>
    {prefix} <NavLink to={to}>{label}</NavLink>
  </span>

export default RouterButton
