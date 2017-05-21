import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import ProfileChatPage from 'components/Chat'
import Dropzone from 'components/Dropzone'

import EditorField from 'elements/EditorField'
import ProfileLabel from 'elements/ProfileLabel'

import { editProfile, uploadAvatar, editProfileField } from 'actions/profile'
import GridLayout from 'components/layouts/Grid'

const Avatar = ({image, uploadAvatar}) =>
  <Dropzone className='ui image editable' onDrop={uploadAvatar}>
    <Image src={image || '/images/productholder.png'} />
  </Dropzone>

const NameField = ({isEditing, user, editProfile, editProfileField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Name'
    name='username'
    onClick={() => editProfileField('username')} onClickOutside={() => editProfileField(null)}
    onSubmit={username => editProfile({...user, username}, user)}>
    <Header as='h1'>{user.username}</Header>
  </EditorField>

const BioField = ({isEditing, user, editProfile, editProfileField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Bio' name='bio'
    onClick={() => editProfileField('bio')} onClickOutside={() => editProfileField(null)}
    onSubmit={bio => editProfile({...user, bio}, user)}>
    <Header as='h4'>{user.bio || 'Add a bio'}</Header>
  </EditorField>

class AdminView extends Component {
  componentWillUnmount() {
    this.props.editProfileField(null)
  }
  render() {
    const {
      editProfile,
      editProfileField,
      uploadAvatar,
      profile,
      user
    } = this.props
    return (
      <GridLayout
        Image={<Avatar image={user.image} uploadAvatar={img => uploadAvatar(img[0], user)} />}
        Canopy={'welcome to your profile'}
        ChatBox={<ProfileChatPage thread={profile} threadType='profile' />}
        Header={<NameField isEditing={profile.focused === 'username'} user={user} editProfile={editProfile} editProfileField={editProfileField} />}
        SubHeader={<BioField isEditing={profile.focused === 'bio'} user={user} editProfile={editProfile} editProfileField={editProfileField} />}
        Gutter={<ProfileLabel username={profile.username} image={profile.image} />}
        GutterRight={'something'} />
    )
  }
}


const ConnectedAdminView = reduxForm({
  form: 'editProfile',
  // validate
})(AdminView)

const mapStateToProps = ({user, profile}) =>
({
  user,
  profile,
  initialValues: user
})

const mapDispatchToProps = dispatch =>
({
  editProfile: (profile, user) => dispatch(editProfile(profile, user)),
  uploadAvatar: (img, user) => dispatch(uploadAvatar(img, user)),
  editProfileField: field => dispatch(editProfileField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
