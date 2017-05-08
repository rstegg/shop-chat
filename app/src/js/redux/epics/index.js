import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { fetchProducts, fetchSingleProduct, createProduct, uploadProductImage, uploadFreeProductImage, editProduct, deleteProduct, shareProduct } from './products'
import { fetchShops, fetchSingleShop, createShop, uploadShopImage, uploadEditShopImage, editShop, deleteShop } from './shops'
import { uploadAvatar, editProfile, fetchProfile } from './profile'

export default combineEpics(
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
  uploadAvatar,
  uploadProductImage,
  uploadFreeProductImage,
  uploadShopImage,
  uploadEditShopImage,
  editProfile,
  fetchProfile,
)
