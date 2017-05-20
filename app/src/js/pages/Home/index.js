import React from 'react'
import { connect } from 'react-redux'

import LandingPage from './Landing'

const Home = ({user}) =>
  <LandingPage />

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(
  mapStateToProps
)(Home)
