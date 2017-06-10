import React from 'react'
import { connect } from 'react-redux'

import { Header, Menu, Button, Icon } from 'semantic-ui-react'

import { closeAddProductMedia, uploadAddProductMedia, } from 'actions/products'

const ProductMediaMenu = ({ product, user, uploadAddProductMedia, closeAddProductMedia }) =>
  <Menu icon='labeled' vertical inverted style={{width: '100%', height: '100%'}}>
    <Header block inverted>Medias</Header>
    <Menu.Item onClick={() => uploadAddProductMedia('video', product, user)}>
      <Icon name='video' size='massive' />
      Video
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductMedia('line-chart', product, user)}>
      <Icon name='line chart' size='massive' />
      Line chart
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductMedia('bar-chart', product, user)}>
      <Icon name='bar chart' size='massive' />
      Bar chart
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductMedia('pie-chart', product, user)}>
      <Icon name='pie chart' size='massive' />
      Pie chart
    </Menu.Item>
    <Menu.Item onClick={() => uploadAddProductMedia('activity-feed', product, user)}>
      <Icon name='newspaper' size='massive' />
      Activity feed
    </Menu.Item>
    <Menu.Menu style={{position: 'absolute', width: '100%', bottom: '25px'}}>
      <Menu.Item>
        <Button basic color='teal' onClick={closeAddProductMedia} size='huge'>Close</Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>

const mapStateToProps = ({products, user}) =>
({
  product: products.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  uploadAddProductMedia: (options, product, user) => dispatch(uploadAddProductMedia(options, product, user)),
  closeAddProductMedia: () => dispatch(closeAddProductMedia()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductMediaMenu)
