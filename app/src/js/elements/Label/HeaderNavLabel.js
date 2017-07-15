import React from 'react'

import { NavLink } from 'react-router-dom'
import { Label, Icon } from 'semantic-ui-react'

const HeaderNavLabel = ({ to, icon, text }) =>
  <Label as={NavLink} to={to} basic>
    <Icon name={icon} /> {text}
  </Label>

export default HeaderNavLabel
