import React from 'react'
import { connect } from 'react-redux'

import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const Header = ({user, logout, isMobile}) =>
  isMobile ?
    <MobileHeader user={user} />
  :
    <DesktopHeader user={user} logout={logout} />

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  logout: () => dispatch({type: 'LOGOUT'})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
