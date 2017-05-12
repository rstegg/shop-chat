import React from 'react'
import { connect } from 'react-redux'

import LandingPage from './Landing'
import HomeChatPage from './Chat'

const Home = ({user}) =>
  user.isAuthenticated ?
    <HomeChatPage />
  :
    <LandingPage />

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(
  mapStateToProps
)(Home)
