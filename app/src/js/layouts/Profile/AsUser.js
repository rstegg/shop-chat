import React from 'react'
import { Button, Image, Header } from 'semantic-ui-react'

import ShareMenu from 'components/SocialMenu'
import ProfileChat from 'components/Chat'

import GridLayout from 'layouts/Grid'

const Avatar = ({ image }) =>
  <div className='ui image shop--image avatar-image'>
    <Image src={image || '/images/placeholder.png'} />
  </div>

const UserView = ({
  profile,
  user,
  switchToProfileAdmin,
  children,
}) =>
  <GridLayout
    Image={<Avatar image={profile.image} />}
    Canopy={children}
    ChatBox={<ProfileChat thread={profile} threadType='profile' />}
    Header={<Header as='h1'>{profile.username}</Header>}
    SubHeader={!!profile.bio && <Header as='h4'>{profile.bio}</Header>}
    Gutter={!!profile.website && <Header as='a' target='_blank' href={profile.website}>{profile.website}</Header>}
    GutterRight={
      user.id === profile.userId ?
        <Button basic onClick={switchToProfileAdmin}>Edit Profile</Button>
        :
        <ShareMenu url={`https://kuwau.com/user/${user.username}`} profileId={profile.id} />
    } />

export default UserView
