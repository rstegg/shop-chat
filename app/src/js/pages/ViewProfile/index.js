import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchProfile, refreshProfileEditing, switchToProfileAdmin } from 'actions/profile'

class ViewProfile extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchProfile(params.id, user)
    this.props.refreshProfileEditing()
  }
  componentWillUpdate(nextProps) {
    const { profile, match: { params }, history, user, isFetching, fetchProfile, refreshProfileEditing } = this.props
    if (nextProps.profile.newUsername) {
      history.replace(`/user/${nextProps.profile.username}`)
      refreshProfileEditing()
    }
    if (profile.username !== params.id && isFetching !== params.id) {
      fetchProfile(params.id, user)
    }
  }
  render() {
    const { user, profile, switchToProfileAdmin } = this.props
    if (!profile) {
      return <Redirect to='/' />
    }
    if (profile.isAdmin) {
      return <AdminView user={user} profile={profile} />
    }
    if (user.id === profile.userId) {
      return <UserView user={user} profile={profile} switchToProfileAdmin={switchToProfileAdmin} />
    }
    return <UserView user={user} profile={profile} />
  }
}

const mapStateToProps = ({user, profile}) =>
({
  user,
  profile,
  isFetching: profile.isFetching
})

const mapDispatchToProps = dispatch =>
({
  fetchProfile: (username, user) => dispatch(fetchProfile(username, user)),
  refreshProfileEditing: () => dispatch(refreshProfileEditing()),
  switchToProfileAdmin: () => dispatch(switchToProfileAdmin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile)
