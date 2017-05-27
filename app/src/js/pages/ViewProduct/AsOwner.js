import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Label, Dimmer, Loader, Grid, Image, Header, Checkbox, Rail, Segment } from 'semantic-ui-react'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import ProductChatPage from 'components/Chat'
import SocialMenu from 'components/SocialMenu'
import Dropzone from 'components/Dropzone'

import EditorField from 'elements/EditorField'
import SelectField from 'elements/SelectField'

import { editProduct, deleteProduct, uploadEditProductImage, onUploadEditProductImageFailure, editProductField } from 'actions/products'

const Avatar = ({product, uploadEditProductImage, onUploadEditProductImageFailure}) =>
  <Dropzone className='ui image editable avatar-image' onDrop={uploadEditProductImage} onDropRejected={onUploadEditProductImageFailure}>
    {product.image_loading && <Dimmer active><Loader /></Dimmer>}
    <Image src={product.image || '/images/productholder.png'} />
    {product.image_error && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

const options = [
  { key: 'fixed', value: 'fixed', text: 'Fixed' },
  { key: 'open', value: 'open', text: 'Open' }
]

const SelectTypeField = props =>
  <SelectField {...props} label={<Header as='h2'>List as</Header>} placeholder='Price type' options={options} />

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
  <Field component={CheckboxField} name='is_public' onSubmit={is_public => editProduct({...product, is_public}, user)} />

const PriceField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Price' name='price'
    onClick={() => editProductField('price')} onClickOutside={() => editProductField(null)}
    onSubmit={price => editProduct({...product, price}, user)}>
    <Header as='h4'>${product.price || '0.00'}</Header>
  </EditorField>

const PriceTypeField = ({product, user, editProduct}) =>
  <Field component={SelectTypeField} name='price_type' onSubmit={price_type => editProduct({...product, price_type}, user)} />

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
      onUploadEditProductImageFailure,
      product,
      user,
      priceTypeValue,
    } = this.props
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Card>
              <Avatar
                product={product}
                uploadEditProductImage={img => uploadEditProductImage(img[0], product, user)}
                onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
              <Card.Content>
                <Segment>
                  <Card.Header>
                    <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </Card.Header>
                </Segment>
                <Segment>
                  <PriceTypeField product={product} user={user} editProduct={editProduct} />
                  { priceTypeValue === 'fixed' &&
                    <Segment>
                      <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                    </Segment>
                  }
                </Segment>
                <Segment>
                  <Card.Description>
                    <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </Card.Description>
                </Segment>
              </Card.Content>
              <Card.Content extra>
                  <Segment>
                    <PublicField product={product} user={user} editProduct={editProduct} />
                  </Segment>
                  <Segment>
                    <Button fluid basic color='red' onClick={() => deleteProduct(product.id, user)} style={{justifyContent: 'center'}}>Remove listing</Button>
                  </Segment>
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

const selector = formValueSelector('editProduct')

const mapStateToProps = state =>
({
  user: state.user,
  product: state.products.current,
  priceTypeValue: selector(state, 'price_type'),
  initialValues: state.products.current
})

const mapDispatchToProps = dispatch =>
({
  deleteProduct: (productId, user) => dispatch(deleteProduct(productId, user)),
  editProduct: (product, user) => dispatch(editProduct(product, user)),
  uploadEditProductImage: (img, product, user) => dispatch(uploadEditProductImage(img, product, user)),
  onUploadEditProductImageFailure: () => dispatch(onUploadEditProductImageFailure()),
  editProductField: field => dispatch(editProductField(field)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
