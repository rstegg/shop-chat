import React from 'react'
import { Image, Header } from 'semantic-ui-react'
import { path } from 'ramda'

import ShopMenu from 'components/SocialMenu'
import ProfileLabel from 'elements/ProfileLabel'

import ShopChatPage from 'components/Chat'

import GridLayout from 'components/layouts/Grid'
import Products from './Products'

const getUsername = path(['user', 'username'])
const getUserImage = path(['user', 'image'])

const UserView = ({
  shop,
  user,
  joinShop
}) =>
  <GridLayout
    Image={<Image src={shop.image || '/images/productholder.png'} className='shop--image avatar-image' />}
    Canopy={<Products />}
    ChatBox={<ShopChatPage thread={shop} threadType='shop' />}
    Header={<Header as='h1'>{shop.name}</Header>}
    SubHeader={!!shop.description && <Header as='h4'>{shop.description}</Header>}
    Gutter={<ProfileLabel username={getUsername(shop)} image={getUserImage(user)} />}
    GutterRight={<ShopMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />} />


export default UserView
