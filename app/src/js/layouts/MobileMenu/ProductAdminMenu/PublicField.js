import React from 'react'
import { connect } from 'react-redux'

import { Checkbox } from 'semantic-ui-react'

import { editProduct } from 'actions/products'

const PublicField = ({ product, user, editProduct, style }) =>
  <Checkbox
    label='Public'
    toggle
    style={style}
    checked={!!product.isPublic}
    onChange={(_,data) => editProduct({ ...product, isPublic: data.checked }, user)} />

const mapStateToProps = ({ products, user }) =>
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
