import React from 'react'
import { NavLink } from 'react-router-dom'
import { Image, Button, Grid, Header, Label } from 'semantic-ui-react'

import ShopMenu from '../../components/ProductMenu'

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
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <Header as='h1'>{shop.name}</Header>
        <Button onClick={() => joinShop(shop.id, user)} basic color='green'>Join Shop</Button>
      </Grid.Column>
      <Grid.Column width={10}>
        {shop.user &&
          <Label to={`/user/${shop.user.username}`} from={`/shop/${shop.slug}`} as={NavLink} basic image>
            <img src={shop.user.image || '/images/placeholder.png'} alt={user.username} /> {shop.user.username}
          </Label>
        }
      </Grid.Column>
      <Grid.Column width={3}>
        <ShopMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />
      </Grid.Column>
    </Grid.Row>
  </Grid>

export default UserView
