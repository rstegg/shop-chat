import React from 'react'
import { Image, Header } from 'semantic-ui-react'

import ProfileChatPage from 'components/Chat'

import GridLayout from 'components/layouts/Grid'
import Shops from './Shops'

const UserView = ({
  profile,
  user
}) =>
  <GridLayout
    Image={<Image src={profile.image || '/images/productholder.png'} className='profile--image' />}
    Canopy={<Shops />}
    ChatBox={<ProfileChatPage thread={profile} threadType='profile' />}
    Header={<Header as='h1'>{profile.username}</Header>}
    SubHeader={!!profile.bio && <Header as='h4'>{profile.bio}</Header>}
    Gutter={!!profile.website && <Header as='a'>{profile.website}</Header>}
    GutterRight={'something'} />

export default UserView
