import React from 'react'
import { connect } from 'react-redux'
import { Image, Grid, Button, Input } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import Dropzone from '../../components/Dropzone'
import TextAreaField from '../../elements/AreaField'
import EditorField from '../../elements/EditorField'

import { editProfile, uploadAvatar, editProfileField } from '../../redux/actions/profile'

const Avatar = ({image, uploadAvatar}) =>
  <Dropzone className='ui image editable' onDrop={uploadAvatar}>
    <Image src={image || '/images/postholder.png'} />
  </Dropzone>

const AdminView = ({
  editProfile,
  editProfileField,
  uploadAvatar,
  image,
  profile,
  user
}) =>
  <Grid celled className='main-container'>
    <Grid.Row>
      <Grid.Column width={3}>
        <Avatar image={user.image} uploadAvatar={img => uploadAvatar(img[0], user)} />
      </Grid.Column>
      <Grid.Column width={10}>
        <EditorField
          fieldComponent={TextAreaField}
          isEditing={profile.focused === 'bio'}
          placeholder='Bio' name='bio'
          onClick={() => editProfileField('bio')} onSubmit={v => editProfile({...user, bio: v}, user)}>
          <Input value={user.bio || 'Add a bio'} readOnly />
        </EditorField>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <EditorField
          isEditing={profile.focused === 'username'}
          placeholder='Name' name='username'
          onClick={() => editProfileField('username')} onSubmit={v => editProfile({...user, username: v}, user)}>
          <Input value={user.username} readOnly />
        </EditorField>
        <Button onClick={() => {}} basic color='red'>Close account</Button>
      </Grid.Column>
      <Grid.Column width={10}>
        sumtang
      </Grid.Column>
      <Grid.Column width={3}>
        something
      </Grid.Column>
    </Grid.Row>
  </Grid>


const ConnectedAdminView = reduxForm({
  form: 'editProfile',
  // validate
})(AdminView)

const mapStateToProps = ({user, profile}) =>
({
  user,
  profile,
  image: user.image,
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
