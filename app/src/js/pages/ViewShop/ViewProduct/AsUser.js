import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Grid, Segment, Header, Image, Button, List } from 'semantic-ui-react'
import { path } from 'ramda'

import SocialMenu from 'components/SocialMenu'

import { productBuyNow, productAddToCart } from 'actions/orders'

const productUserId = path(['user', 'id'])
const productUsername = path(['user', 'username'])

const productUserAvatar = path(['user', 'image'])

const productShopSlug = path(['shop', 'slug'])
const productShopName = path(['shop', 'name'])
const productShopImage = path(['shop', 'image'])

const UserView = ({
  orders,
  product,
  user,
  switchToProductAdmin,
  productBuyNow,
  productAddToCart,
}) =>
  <Grid celled='internally' className='product__container'>
    <Grid.Column width={6} stretched>
      <Segment basic>
        <Segment>
          <Image src={product.image || '/images/productholder.png'} className='product--image avatar-image' />
        </Segment>
        <Segment>
          <Header as='h1'>{product.name}</Header>
        </Segment>
        <Segment>
          <Header as='h4'>{product.description || 'No description'}</Header>
        </Segment>
        <Segment>
          <Header as='h4'>${product.price || '0.00'}</Header>
        </Segment>
        <Segment>
          <Button.Group vertical fluid>
            <NavLink to='/checkout/review'>
              <Button type='button' basic color='green' onClick={() => productBuyNow(product)} style={{justifyContent: 'center'}}>Buy now</Button>
            </NavLink>
            <Button fluid basic color='green' onClick={() => productAddToCart(product)} style={{justifyContent: 'center'}}>Add to cart</Button>
          </Button.Group>
        </Segment>
        {user.id === productUserId(product) ?
          <Segment style={{display: 'flex', justifyContent: 'center'}}>
            <Button basic onClick={switchToProductAdmin}>Edit Product</Button>
          </Segment>
          :
          <Segment>
            <Button.Group vertical fluid>
              <NavLink to='/checkout/review'>
                <Button type='button' basic color='green' onClick={() => productBuyNow(product)} style={{justifyContent: 'center'}}>Buy now</Button>
              </NavLink>
              <Button fluid basic color='green' onClick={() => productAddToCart(product)} style={{justifyContent: 'center'}}>Add to cart</Button>
            </Button.Group>
          </Segment>
        }
      </Segment>
    </Grid.Column>
    <Grid.Column width={10}>
      <List bulleted>
        <List.Header>About the Product</List.Header>
        <List.Item>
          Conditioner contains more than just a masterful blend of harmless conditioning ingredients to help do the job, Silk18 is formulated with a maximized portion of silk amino acids. These aren't fake chemicals: naturally derived from silk are eighteen different silk amino acids which have marvelous benefits to “behind-the-scenes” of conditioning.
        </List.Item>
        <List.Item>
          Helps with frizziness, dry hair, curly hair, static reduction, and gently conditions to result in soft, shiny, and easy-to-manage hair. Additionally, Silk18 conditioner is safe for color treated hair (sulfate free).
        </List.Item>
        <List.Item>
          Contains a holistic synergy of conditioning agents and natural ingredients to condition all hair types. Signature Silk18 formula contains eighteen different silk amino acids to deliver silky softness and assure moisture retention,, jojoba and argan oils to strengthen, protect, and provide shine, botanical keratin to replenish low keratin levels (a common cause of frizzy hair).
        </List.Item>
        <List.Item>
          No artificial fragrances, coloring, sulfates, or any harmful ingredients. 100% natural vanilla provides a delicious and warm aroma that appeals to both men and women alike. Made in the USA and cruelty-free (not tested on animals).
        </List.Item>
        <List.Item>
          Whereas shampoo cleans the hair, conditioning is essential for both feel and appearance. Maple Holistics Silk18 conditioner is the perfect shower aid and compatible with any shampoo.
        </List.Item>
      </List>
      <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
      <Segment compact style={{display: 'flex', justifyContent: 'space-between'}}>
        <NavLink to={`/user/${productUsername(product)}`}>
          <Button basic color='orange' compact>
            more from <Image avatar src={productUserAvatar(product) || '/images/placeholder.png'} /> {productUsername(product)}
          </Button>
        </NavLink>
        <NavLink to={`/shop/${productShopSlug(product)}`}>
          <Button basic color='red' compact>
            more from <Image avatar src={productShopImage(product) || '/images/productholder.png'} /> {productShopName(product)}
          </Button>
        </NavLink>
      </Segment>
    </Grid.Column>
  </Grid>

const mapStateToProps = ({orders}) =>
({
  orders
})

const mapDispatchToProps = dispatch =>
({
  productBuyNow: product => dispatch(productBuyNow(product)),
  productAddToCart: product => dispatch(productAddToCart(product)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView)
