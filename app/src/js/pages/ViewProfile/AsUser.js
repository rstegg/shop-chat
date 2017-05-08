import React from 'react'
import { Image, Button, Grid, Header } from 'semantic-ui-react'

const UserView = ({
  profile,
  user
}) =>
  <Grid celled className='main-container'>
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src={profile.image || '/images/productholder.png'} className='profile--image' />
      </Grid.Column>
      <Grid.Column width={10}>
        <Header as='h4'>{profile.description}</Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <Header as='h1'>{profile.username}</Header>
        <Button onClick={() => {}} basic color='green'>Send friend request</Button>
      </Grid.Column>
      <Grid.Column width={10}>
        something
      </Grid.Column>
      <Grid.Column width={3}>
        something
      </Grid.Column>
    </Grid.Row>
  </Grid>

export default UserView
