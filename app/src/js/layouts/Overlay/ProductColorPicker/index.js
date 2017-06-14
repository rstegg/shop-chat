import React from 'react'
import { connect } from 'react-redux'
import { path } from 'ramda'

import { Modal, Segment, Header, Button } from 'semantic-ui-react'

import { SketchPicker } from 'react-color'

import { editProductThemeColor, uploadEditProductTheme, closeEditProductThemeColor } from 'actions/products'

const getActiveColor = path(['activeThemeColor'])
const getInitialTheme = (theme, obj) => path([theme], obj)

const ColorPicker = ({ product, user, editProductThemeColor, uploadEditProductTheme, closeEditProductThemeColor}) =>
  !!product.activeTheme &&
  <Modal open={!!product.activeTheme} onClose={closeEditProductThemeColor}>
    <Modal.Content>
      <Segment basic style={{display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
        <Header>{product.activeTheme} color</Header>
        <SketchPicker
          color={getActiveColor(product) || getInitialTheme(product.activeTheme, product.themes)}
          onChangeComplete={color => editProductThemeColor(product.activeTheme, color)}
        />
        <Segment basic compact>
          <Button color='red' onClick={closeEditProductThemeColor} inverted size='huge'>
            Cancel
          </Button>
          <Button color='green' onClick={() => uploadEditProductTheme(product.activeTheme, product.activeThemeColor, product, user)} inverted size='huge'>
            Save
          </Button>
        </Segment>
      </Segment>
    </Modal.Content>
  </Modal>

const mapStateToProps = ({user, products}) =>
({
  product: products.current,
  user,
})

const mapDispatchToProps = dispatch =>
({
  editProductThemeColor: (theme, color) => dispatch(editProductThemeColor(theme, color)),
  uploadEditProductTheme: (theme, color, product, user) => dispatch(uploadEditProductTheme(theme, color, product, user)),
  closeEditProductThemeColor: () => dispatch(closeEditProductThemeColor())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPicker)
