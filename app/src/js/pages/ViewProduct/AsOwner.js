import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Card, Grid, Image, Header, Checkbox, Rail } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { path } from 'ramda'

import Dropzone from 'components/Dropzone'

import EditorField from 'elements/EditorField'

import { editProduct, deleteProduct, uploadEditProductImage, editProductField } from 'actions/products'

import ProductChatPage from 'components/Chat'
import SocialMenu from 'components/SocialMenu'

const productUsername = path(['user', 'username'])

const productUserAvatar = path(['user', 'image'])

const renderType = (price_type, price) =>
  price_type === 'fixed' ? `Price: $${price}` : 'Purchases welcome'

const Avatar = ({image, uploadEditProductImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadEditProductImage}>
    <Image src={image || '/images/productholder.png'} />
  </Dropzone>

const CheckboxField = ({ input: { value, onChange }, onSubmit }) =>
  <Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => {
      onChange(data.checked)
      onSubmit(data.checked)
    }} />

const NameField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={product.focused === 'name'}
    placeholder='Name' name='name'
    onClick={() => editProductField('name')} onClickOutside={() => editProductField(null)}
    onSubmit={name => editProduct({...product, name}, user)}>
    <Header as='h1'>{product.name}</Header>
  </EditorField>

const DescriptionField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Description' name='description'
    onClick={() => editProductField('description')} onClickOutside={() => editProductField(null)}
    onSubmit={description => editProduct({...product, description}, user)}>
    <Header as='h4'>{product.description || 'Add a description'}</Header>
  </EditorField>

const PublicField = ({product, user, editProduct}) =>
  <Field component={CheckboxField} name='is_public' onSubmit={v => editProduct({...product, is_public: v}, user)} />

class AdminView extends Component {
  componentWillUnmount() {
    this.props.editProductField(null)
  }
  render() {
    const {
      deleteProduct,
      editProduct,
      editProductField,
      uploadEditProductImage,
      product,
      user
    } = this.props
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Card>
              <Avatar image={product.image || '/images/productholder.png'} uploadEditProductImage={img => uploadEditProductImage(img[0], product, user)} />
              <Card.Content>
                <Card.Header>
                  <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                </Card.Header>
                  <NavLink to={`/user/${product.user.username}`}>
                    started by <Image avatar src={productUserAvatar(product) || '/images/placeholder.png'} /> {productUsername(product)}
                  </NavLink>
                <Card.Meta>{renderType(product.price_type, product.price)}</Card.Meta>
                <Card.Description>
                  <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group vertical fluid>
                  <PublicField product={product} user={user} editProduct={editProduct} />
                  <Button basic color='red' onClick={() => deleteProduct(product.id, user)} style={{justifyContent: 'center'}}>Delete</Button>
                </Button.Group>
              </Card.Content>
            </Card>
            <Rail attached position='right'>
              <ProductChatPage thread={product} threadType='product' />
            </Rail>
          </Grid.Row>
          <Grid.Row>
            <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}


const ConnectedAdminView = reduxForm({
  form: 'editProduct',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate
})(AdminView)

const mapStateToProps = ({products, user}) =>
({
  user: user,
  product: products.current,
  initialValues: products.current
})

const mapDispatchToProps = dispatch =>
({
  deleteProduct: (productId, user) => dispatch(deleteProduct(productId, user)),
  editProduct: (product, user) => dispatch(editProduct(product, user)),
  uploadEditProductImage: (img, product, user) => dispatch(uploadEditProductImage(img, product, user)),
  editProductField: field => dispatch(editProductField(field)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
