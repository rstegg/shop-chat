import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

//TODO: Account Settings

class ViewProfile extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchProfile(params.id, user)
    this.props.refreshProfileEditing()
  }
  componentWillUpdate(nextProps) {
    const { profile, match: { params }, history, user, fetchable, fetchProfile, refreshProfileEditing } = this.props
    if(nextProps.profile.newUsername) {
      history.replace(`/user/${nextProps.profile.username}`)
      refreshProfileEditing()
    }
    if(profile.username !== params.id && fetchable) {
      fetchProfile(params.id, user)
    }
  }
  render() {
    const { user, profile } = this.props
  }
}

const mapStateToProps = ({user, profile}) =>
({
  user,
  profile,
  fetchable: profile.fetchable
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
