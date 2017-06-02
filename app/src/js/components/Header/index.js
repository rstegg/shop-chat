import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const Header = ({user, logout, isMobile, location}) =>
  isMobile ?
    <MobileHeader user={user} />
  :
    <DesktopHeader user={user} logout={logout} location={location} />

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  logout: () => dispatch({type: 'LOGOUT'})
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
