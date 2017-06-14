import React from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'

import { Modal, Segment, Header, Button } from 'semantic-ui-react'

import { SketchPicker } from 'react-color'

import { editShopThemeColor, uploadEditShopTheme, closeEditShopThemeColor } from 'actions/shops'

const getActiveColor = path(['activeThemeColor', 'rgb'])
const getInitialTheme = (theme, obj) => path([theme], obj)

const ShopColorPicker = ({ shop, user, editShopThemeColor, uploadEditShopTheme, closeEditShopThemeColor}) =>
  !!shop.activeTheme &&
  <Modal open={!!shop.activeTheme} onClose={closeEditShopThemeColor}>
    <Modal.Content>
      <Segment basic style={{display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
        <Header>{shop.activeTheme} color</Header>
        <SketchPicker
          color={getActiveRGB(shop) || getInitialTheme(shop.activeTheme, shop.themes)}
          onChangeComplete={color => editShopThemeColor(shop.activeTheme, color)}
        />
        <Segment basic compact>
          <Button color='red' onClick={closeEditShopThemeColor} inverted size='huge'>
            Cancel
          </Button>
          <Button color='green' onClick={() => uploadEditShopTheme(shop.activeTheme, shop.activeThemeColor, shop, user)} inverted size='huge'>
            Save
          </Button>
        </Segment>
      </Segment>
    </Modal.Content>
  </Modal>

const mapStateToProps = ({user, shops}) =>
({
  shop: shops.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  editShopThemeColor: (theme, color) => dispatch(editShopThemeColor(theme, color)),
  uploadEditShopTheme: (theme, color, shop, user) => dispatch(uploadEditShopTheme(theme, color, shop, user)),
  closeEditShopThemeColor: () => dispatch(closeEditShopThemeColor())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopColorPicker)
