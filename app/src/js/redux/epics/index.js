import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { fetchStripeCards, addStripeCard, fetchStripeBanks, addStripeBank, fetchStripeBitcoins, addStripeBitcoin } from './stripe'
import { fetchProducts, fetchSingleProduct, createProduct, uploadProductImage, uploadEditProductImage, uploadGalleryProductImage, deleteProductGalleryImage,
  uploadEditProductLayout, uploadEditProductTheme, editProduct, deleteProduct, shareProduct } from './products'
import { fetchShops, fetchSingleShop, createShop, uploadShopImage, uploadEditShopImage, editShop, deleteShop } from './shops'
import { uploadProfileImage, editProfile, fetchProfile } from './profile'
import { saveAccountSettings } from './account'
import { saveAddressSettings } from './address'

export default combineEpics(
  fetchStripeCards,
  addStripeCard,
  fetchStripeBanks,
  addStripeBank,
  fetchStripeBitcoins,
  addStripeBitcoin,
  fetchProducts,
  fetchSingleProduct,
  createProduct,
  editProduct,
  deleteProduct,
  deleteProductGalleryImage,
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
  uploadGalleryProductImage,
  uploadEditProductLayout,
  uploadEditProductTheme,
  uploadShopImage,
  uploadEditShopImage,
  editProfile,
  fetchProfile,
)
