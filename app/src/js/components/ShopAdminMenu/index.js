import React from 'react'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'

import TabletMenu from './TabletMenu'
import DesktopMenu from './DesktopMenu'

import isMobile, { isTablet } from 'utils/isMobile'
//Only renders if this is a tablet or desktop
const BottomNav = props =>
  !isMobile && (
    isTablet ?
      <TabletMenu
        {...props}
      />
    :
      <DesktopMenu
        {...props}
      />
  )

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  toLogin:      () => dispatch(push('/login')),
  toSignup:     () => dispatch(push('/signup')),
  toShops:      () => dispatch(push('/shops')),
  toGlobe:      () => dispatch(push('/')),
  toPencil:     () => dispatch(push('/shops/new')),
  toSettings:   () => dispatch(push('/settings/account')),
  toPower:      () => dispatch({type: 'LOGOUT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
