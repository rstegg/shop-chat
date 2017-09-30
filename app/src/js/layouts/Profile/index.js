import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import ProductSidebar from 'components/Sidebar'

import { fetchProfile, refreshProfile, switchToProfileAdmin } from 'actions/profile'

class ViewProfile extends Component {
  componentDidMount() {
    const { match: { params }, user, fetchProfile, refreshProfile, } = this.props
    fetchProfile(params.username, user)
    refreshProfile()
  }
  componentDidUpdate(nextProps) {
    const { profile, match: { params }, history, user, isFetching, fetchProfile, refreshProfile } = this.props
    if (nextProps.profile.newUsername) {
      history.replace(`/user/${nextProps.profile.username}`)
      refreshProfile()
    }
    if (profile.username !== params.username && isFetching !== params.username) {
      fetchProfile(params.username, user)
    }
    if (nextProps.product.isCreated) {
      refreshProfile()
    }
  }
  render() {
    const { profile } = this.props
    if (!profile.username) {
      return <Redirect to='/' />
    }
    let ProfileView
    if (profile.isAdmin) {
      ProfileView = AdminView
    } else {
      ProfileView = UserView
    }
    return <ProfileView {...this.props} />
  }
}

const mapStateToProps = ({ user, profile, products }) =>
({
  user,
  profile,
  product: products.new,
  isFetching: profile.isFetching
})

const mapDispatchToProps = dispatch =>
({
  fetchProfile:         (username, user) => dispatch(fetchProfile(username, user)),
  refreshProfile:       () => dispatch(refreshProfile()),
  switchToProfileAdmin: () => dispatch(switchToProfileAdmin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile)
