import React from 'react'
import { Button, Image, Header } from 'semantic-ui-react'

import ShareMenu from 'components/SocialMenu'
import ProfileChat from 'components/Chat'

import GridLayout from 'components/layouts/Grid'
import Shops from './Shops'

const Avatar = ({image}) =>
  <div className='ui image shop--image avatar-image'>
    <Image src={image || '/images/productholder.png'} />
  </div>

const UserView = ({
  profile,
  user,
  switchToProfileAdmin,
}) =>
  <GridLayout
    Image={<Avatar image={profile.image} />}
    Canopy={<Shops />}
    ChatBox={<ProfileChat thread={profile} threadType='profile' />}
    Header={<Header as='h1'>{profile.username}</Header>}
    SubHeader={!!profile.bio && <Header as='h4'>{profile.bio}</Header>}
    Gutter={!!profile.website && <Header as='a'>{profile.website}</Header>}
    GutterRight={
      user.id === profile.userId ?
        <Button basic onClick={switchToProfileAdmin}>Switch to Admin</Button>
        :
        <ShareMenu url={`https://kuwau.com/user/${user.username}`} shopId={profile.id} />
    } />

export default UserView
