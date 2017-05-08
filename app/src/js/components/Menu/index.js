import React from 'react'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'

import TabletMenu from './TabletMenu'
import DesktopMenu from './DesktopMenu'

//Only renders if this is a tablet or desktop
const BottomNav =
({
  isMobile,
  isTablet,
  ...props
}) =>
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


const mapDispatchToProps = dispatch =>
({
  toLogin:      () => dispatch(push('/login')),
  toSignup:     () => dispatch(push('/signup')),
  toShops:      () => dispatch(push('/shops')),
  toArticles:   () => dispatch(push('/articles')),
  toProducts:   () => dispatch(push('/products')),
  toGlobe:      () => dispatch(push('/')),
  toFeed:       () => dispatch(push('/feed')),
  toPencil:     () => dispatch(push('/products/new')),
  toSettings:   username => dispatch(push(`/user/${username}`)),
  toPower:      () => dispatch({type: 'LOGOUT'})
})

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
