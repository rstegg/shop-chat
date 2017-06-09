import React, { Component } from 'react'

import { Sidebar, Header, Segment, Menu, Button, Icon } from 'semantic-ui-react'

class ProductLayoutMenu extends Component {
  render() {
    const { isOpen, layout, updateLayout, closeLayoutPicker, children } = this.props
    return (
      <div>
        <Sidebar.Pushable as={Segment} style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0'}}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={isOpen} icon='labeled' vertical inverted>
            <Header block inverted>Layouts</Header>
            <Menu.Item active={layout === 'grid'} onClick={() => layout === 'grid' ? closeLayoutPicker() : updateLayout('grid')}>
              <Icon name='block layout' size='massive' />
              Grid
            </Menu.Item>
              <Menu.Item active={layout === 'image'} onClick={() => layout === 'image' ? closeLayoutPicker() : updateLayout('image')}>
                <Icon name='image' size='massive' />
                Image
              </Menu.Item>
              <Menu.Item active={layout === 'gallery'} onClick={() => layout === 'gallery' ? closeLayoutPicker() : updateLayout('gallery')}>
                <Icon name='indent' size='massive' />
                Gallery
              </Menu.Item>
              <Menu.Menu style={{position: 'absolute', width: '100%', bottom: '25px'}}>
                <Menu.Item>
                  <Button basic color='teal' onClick={closeLayoutPicker} size='huge'>Done</Button>
                </Menu.Item>
              </Menu.Menu>
          </Sidebar>
          <Sidebar.Pusher>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </div>
    )
  }
}

export default ProductLayoutMenu
