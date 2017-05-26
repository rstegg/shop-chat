import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import SettingsNav from './nav'

const Settings = ({user, children}) =>
  !user.isAuthenticated ?
    <Redirect to='/' />
  :
  <div className='settings'>
    <SettingsNav user={user} />
    {children}
  </div>

const mapStateToProps = ({user, profile}) =>
({
  user
})

export default connect(mapStateToProps)(Settings)
