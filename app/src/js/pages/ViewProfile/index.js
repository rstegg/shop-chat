import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchProfile, refreshProfileEditing } from 'actions/profile'

class ViewProfile extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchProfile(params.id, user)
    this.props.refreshProfileEditing()
  }
  componentWillUpdate(nextProps) {
    const { profile, match: { params }, history, user, isFetching, fetchProfile, refreshProfileEditing } = this.props
    if(nextProps.profile.newUsername) {
      history.replace(`/user/${nextProps.profile.username}`)
      refreshProfileEditing()
    }
    if(profile.username !== params.id && isFetching !== params.id) {
      fetchProfile(params.id, user)
    }
  }
  render() {
    const { user, profile } = this.props
    if(!profile) {
      return <Redirect to='/' />
    }
    if(profile.userId === user.id) {
      return <AdminView user={user} profile={profile} />
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
  fetchProfile: (id, user) => dispatch(fetchProfile(id, user)),
  refreshProfileEditing: () => dispatch(refreshProfileEditing())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile)
