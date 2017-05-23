import React from 'react'
import { Image, Header } from 'semantic-ui-react'

import ProfileChatPage from 'components/Chat'

import GridLayout from 'components/layouts/Grid'
import Shops from './Shops'

import ProfileLabel from 'elements/ProfileLabel'

//TODO: ProfileLabel inside ViewProfile? Replace with custom url
//TODO: Fill out rest of the page (shops?)

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
    Gutter={<ProfileLabel username={profile.username} image={profile.image} />}
    GutterRight={'something'} />

export default UserView
