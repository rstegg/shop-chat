import React from 'react'
import { Image, Header } from 'semantic-ui-react'

import ShopMenu from 'components/SocialMenu'
import ProfileLabel from 'elements/ProfileLabel'

import ShopChatPage from 'components/Chat'

import GridLayout from 'components/layouts/Grid'
import Products from './Products'

const UserView = ({
  shop,
  user,
  joinShop
}) =>
  <GridLayout
    Image={<Image src={shop.image || '/images/productholder.png'} className='shop--image' />}
    Canopy={<Products />}
    ChatBox={<ShopChatPage thread={shop} threadType='shop' />}
    Header={<Header as='h1'>{shop.name}</Header>}
    SubHeader={!!shop.description && <Header as='h4'>{shop.description}</Header>}
    Gutter={shop.user && <ProfileLabel username={shop.user.username} image={shop.user.image} />}
    GutterRight={<ShopMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />} />


export default UserView
