import React from 'react'
import { connect } from 'react-redux'

import { Form } from 'semantic-ui-react'

import { editProduct } from 'actions/products'

const PublicField = ({product, user, editProduct, style}) =>
  <Form.Checkbox
    label='Public'
    toggle
    style={style}
    checked={!!product.is_public}
    onChange={(_,data) => editProduct({ ...product, is_public: data.checked }, user)} />

const mapStateToProps = ({products, user}) =>
({
  product: products.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  editProduct: (product, user) => dispatch(editProduct(product, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicField)
