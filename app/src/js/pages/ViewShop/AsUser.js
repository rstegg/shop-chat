import React from 'react'
import { Image, Button, Grid, Header } from 'semantic-ui-react'

import ShopMenu from 'components/ProductMenu'
import ProfileLabel from 'elements/ProfileLabel'

import ShopChatPage from 'components/Chat'

const UserView = ({
  shop,
  user,
  joinShop
}) =>
  <Grid celled className='main-container'>
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src={shop.image || '/images/productholder.png'} className='shop--image' />
      </Grid.Column>
      <Grid.Column width={10}>
        <Header as='h4'>{shop.description}</Header>
      </Grid.Column>
      <Grid.Column width={3}>
        <ShopChatPage room={shop} roomType='shop' />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <Header as='h1'>{shop.name}</Header>
        <Button onClick={() => joinShop(shop.id, user)} basic color='green'>Join Shop</Button>
      </Grid.Column>
      <Grid.Column width={10}>
        { shop.user && <ProfileLabel username={shop.user.username} image={shop.user.image} /> }
      </Grid.Column>
      <Grid.Column width={3}>
        <ShopMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />
      </Grid.Column>
    </Grid.Row>
  </Grid>

export default UserView
