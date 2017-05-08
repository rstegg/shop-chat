import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchProfile, refreshProfileEditing } from '../../redux/actions/profile'

class ViewProfile extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchProfile(params.id, user)
    this.props.refreshProfileEditing()
  }
  componentWillUpdate(nextProps) {
    const { profile } = nextProps
    if(profile.newUsername) {
      this.props.history.replace(`/user/${profile.username}`)
      this.props.refreshProfileEditing()
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
  profile
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
