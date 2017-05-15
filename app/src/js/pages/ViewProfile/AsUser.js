import React from 'react'
import { Image, Header } from 'semantic-ui-react'

import ProfileChatPage from 'components/Chat'

import GridLayout from 'components/layouts/Grid'
import ProfileLabel from 'elements/ProfileLabel'

const UserView = ({
  profile,
  user
}) =>
  <GridLayout
    Image={<Image src={profile.image || '/images/productholder.png'} className='profile--image' />}
    Canopy={<Header as='h4'>{'user activity'}</Header>}
    ChatBox={<ProfileChatPage room={profile} roomType='profile' />}
    Header={<Header as='h1'>{profile.username}</Header>}
    SubHeader={<Header as='h4'>{profile.bio}</Header>}
    Gutter={<ProfileLabel username={profile.username} image={profile.image} />}
    GutterRight={'something'} />

export default UserView
