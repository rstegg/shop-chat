import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { push } from 'react-router-redux'


import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const Header = props =>
  props.isMobile ?
    <MobileHeader {...props} />
  :
    <DesktopHeader {...props} />

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  toLogin:      () => dispatch(push('/login')),
  toSignup:     () => dispatch(push('/signup')),
  toHome:       () => dispatch(push('/')),
  toShops:      () => dispatch(push('/shops')),
  toSettings:   () => dispatch(push('/settings/account')),
  logout:       () => dispatch({type: 'LOGOUT'})
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
