import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Image, Grid, Header, Label, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

import ShopMenu from '../../components/ProductMenu'
import Dropzone from '../../components/Dropzone'
import InputField from '../../elements/InputField'
import EditorField from '../../elements/EditorField'

import { editShop, uploadEditShopImage, editShopField } from '../../redux/actions/shops'

const Avatar = ({image, uploadEditShopImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadEditShopImage}>
    <Image src={image || '/images/productholder.png'} />
  </Dropzone>

const EditField = ({children, fieldComponent, onClick, isEditing, placeholder, label, name, value, type, onSubmit}) =>
  isEditing ?
  <Field
    component={fieldComponent || InputField}
    type={type || 'text'}
    label={label}
    placeholder={placeholder}
    name={name}
    onKeyUp={e => {
      if(e.keyCode === 13) {
        onSubmit(e.target.value)
      }}
    }
    onClick={v => onSubmit(v)}
    />
  :
  <div onClick={onClick}>
    {children}
  </div>

const AdminView = ({
  editShop,
  editShopField,
  uploadEditShopImage,
  image,
  shop,
  user,
  deleteShop
}) =>
  <Grid celled className='main-container'>
    <Grid.Row>
      <Grid.Column width={3}>
        <Avatar image={image || shop.image} uploadEditShopImage={img => uploadEditShopImage(img[0], shop, user)} />
      </Grid.Column>
      <Grid.Column width={10}>
        <EditField
          fieldComponent={EditorField}
          isEditing={shop.focused === 'description'}
          placeholder='Description' name='description'
          onClick={() => editShopField('description')} onSubmit={v => editShop({...shop, description: v}, user)}>
          <Header as='h4'>{shop.description || 'Add a description'}</Header>
        </EditField>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <EditField
          isEditing={shop.focused === 'name'}
          placeholder='Name' name='name'
          onClick={() => editShopField('name')} onSubmit={v => editShop({...shop, name: v}, user)}>
          <Header as='h1'>{shop.name}</Header>
        </EditField>
        <Button onClick={() => deleteShop(shop.id, user)} basic color='red'>Delete Shop</Button>
      </Grid.Column>
      <Grid.Column width={10}>
        {shop.user &&
          <Label to={`/user/${shop.user.username}`} from={`/shop/${shop.slug}`} as={NavLink} basic image>
            <img src={shop.user.image || '/images/placeholder.png'} alt={user.username} /> {shop.user.username}
          </Label>
        }
      </Grid.Column>
      <Grid.Column width={3}>
        <ShopMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />
      </Grid.Column>
    </Grid.Row>
  </Grid>


const ConnectedAdminView = reduxForm({
  form: 'editShop',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate
})(AdminView)

const mapStateToProps = state =>
({
  user: state.user,
  shop: state.shops.current,
  image: state.shops.image,
  initialValues: state.shops.current
})

const mapDispatchToProps = dispatch =>
({
  editShop: (shop, user) => dispatch(editShop(shop, user)),
  uploadEditShopImage: (img, shop, user) => dispatch(uploadEditShopImage(img, shop, user)),
  editShopField: field => dispatch(editShopField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
