import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const ProfileLabel = ({ username, image }) =>
  <Label to={`/user/${username}`} as={NavLink} basic image>
    <img src={image || '/images/placeholder.png'} alt={username} /> {username}
  </Label>

export default ProfileLabel
