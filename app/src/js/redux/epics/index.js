import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { braintreeCardRequest } from './braintree'
import { fetchProducts, fetchSingleProduct, createProduct, uploadProductImage, uploadEditProductImage, editProduct, deleteProduct, shareProduct } from './products'
import { fetchShops, fetchSingleShop, createShop, uploadShopImage, uploadEditShopImage, editShop, deleteShop } from './shops'
import { uploadProfileImage, editProfile, fetchProfile } from './profile'
import { saveAccountSettings } from './account'
import { saveAddressSettings } from './address'

export default combineEpics(
  braintreeCardRequest,
  fetchProducts,
  fetchSingleProduct,
  createProduct,
  editProduct,
  deleteProduct,
  shareProduct,
  fetchSingleShop,
  fetchShops,
  createShop,
  editShop,
  deleteShop,
  loginSubmit,
  signupSubmit,
  saveAccountSettings,
  saveAddressSettings,
  uploadProfileImage,
  uploadProductImage,
  uploadEditProductImage,
  uploadShopImage,
  uploadEditShopImage,
  editProfile,
  fetchProfile,
)
