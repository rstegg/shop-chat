import React from 'react'
import { connect } from 'react-redux'

import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const Header = ({user, isMobile}) =>
  isMobile ?
    <MobileHeader user={user} />
  :
    <DesktopHeader user={user} />

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps)(Header)
