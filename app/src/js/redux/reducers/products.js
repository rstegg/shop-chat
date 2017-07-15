const initialState = {
  current: {
    purchasingQuantity: 1,
    isAdmin: false,
    isCropperOpen: false,
    activeTheme: false,
    activeThemeColor: null,
    imagePreview: null,
    editMode: null,
    layout: null,
    gallery: [],
    themes: {
      primary: {
        rgb: {
          r: '255',
          g: '255',
          b: '255',
          a: '1'
        }
      },
      secondary: {
        rgb: {
          r: '255',
          g: '255',
          b: '255',
          a: '1'
        }
      },
      background: {
        rgb: {
          r: '255',
          g: '255',
          b: '255',
          a: '1'
        }
      },
      segment: {
        rgb: {
          r: '255',
          g: '255',
          b: '255',
          a: '1'
        }
      },
      font: {
        rgb: {
          r: '0',
          g: '0',
          b: '0',
          a: '1'
        }
      },
    }
  },
  new: {
    name: '',
    imageError: false,
    isPublic: false
  },
  list: [],
  fetchable: true,
  isFetching: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'PRODUCT_SET_QUANTITY':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        purchasingQuantity: action.payload.quantity
      }
    })
  case 'OPEN_CREATE_PRODUCT_CROPPER':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        isCropperOpen: true,
        imagePreview: action.payload.image
      }
    })
  case 'CLOSE_CREATE_PRODUCT_CROPPER':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        isCropperOpen: false,
        imagePreview: null
      }
    })
  case 'ADD_GALLERY_IMAGE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        gallery: [ ...state.current.gallery, { image: '/images/productholder.png' } ]
      }
    })
  case 'DELETE_PRODUCT_GALLERY_IMAGE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        gallery: [ ...state.current.gallery.slice(0, action.payload.index), ...state.current.gallery.slice(action.payload.index + 1) ]
      }
    })
  case 'OPEN_CHANGE_PRODUCT_LAYOUT':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        editMode: 'layout'
      }
    })
  case 'OPEN_EDIT_PRODUCT_THEME':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        editMode: 'theme'
      }
    })
  case 'CLOSE_CHANGE_PRODUCT_LAYOUT':
  case 'CLOSE_EDIT_PRODUCT_THEME':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        editMode: null
      }
    })
  case 'OPEN_EDIT_PRODUCT_CROPPER':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isCropperOpen: true,
        imagePreview: action.payload.image
      }
    })
  case 'CLOSE_EDIT_PRODUCT_CROPPER':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isCropperOpen: false,
        imagePreview: null
      }
    })
  case 'OPEN_EDIT_PRODUCT_THEME_COLOR':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        activeTheme: action.payload.theme
      }
    })
  case 'CLOSE_EDIT_PRODUCT_THEME_COLOR':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        activeTheme: false,
        activeThemeColor: null
      }
    })
  case 'EDIT_PRODUCT_THEME_COLOR':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        activeThemeColor: action.payload.color
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_THEME':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        activeTheme: false,
        activeThemeColor: null,
        themeLoading: true,
        themeError: false
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_THEME_SUCCESS':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        ...action.payload.product,
        themeLoading: false,
        themeError: false
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_THEME_FAILURE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        themeLoading: false,
        themeError: true
      }
    })
  case 'OPEN_ADD_GALLERY_PRODUCT_CROPPER':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isGalleryCropperOpen: true,
        galleryActiveIndex: action.payload.index,
        imagePreview: action.payload.image
      }
    })
  case 'CLOSE_ADD_GALLERY_PRODUCT_CROPPER':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isGalleryCropperOpen: false,
        galleryActiveIndex: null,
        imagePreview: null
      }
    })
  case 'SWITCH_TO_PRODUCT_ADMIN':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isAdmin: true
      }
    })
  case 'SWITCH_TO_PRODUCT_USER':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        isAdmin: false,
        editMode: null,
        activeTheme: false,
        activeThemeColor: null
      }
    })
  case 'FETCH_PRODUCTS':
    return Object.assign({}, state, {
      fetchable: false
    })
  case 'FETCH_PRODUCTS_SUCCESS':
    return Object.assign({}, state, {
      list: action.payload.products
    })
  case 'CREATE_PRODUCT_SUCCESS':
    return Object.assign({}, state, {
      new: {
        ...initialState.new,
        isCreated: true
      }
    })
  case 'EDIT_PRODUCT_FIELD':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        focused: action.payload.field
      }
    })
  case 'EDIT_PRODUCT':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        focused: null
      }
    })
  case 'EDIT_PRODUCT_SUCCESS':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        ...action.payload.product,
        isEdited: true
      }
    })
  case 'DELETE_PRODUCT_SUCCESS':
    return Object.assign({}, state, {
      current: null
    })
  case 'UPLOAD_PRODUCT_IMAGE':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        image: null,
        imageLoading: true,
        imageError: false
      }
    })
  case 'UPLOAD_PRODUCT_IMAGE_FAILURE':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        image: null,
        imageLoading: false,
        imageError: true
      }
    })
  case 'UPLOAD_PRODUCT_IMAGE_SUCCESS':
    return Object.assign({}, state, {
      new: {
        ...state.new,
        image: action.payload.image,
        imageLoading: false,
        imageError: false
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_IMAGE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        image: null,
        imageLoading: true,
        imageError: false
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_IMAGE_SUCCESS':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        image: action.payload.image,
        imageLoading: false,
        imageError: false
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_IMAGE_FAILURE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        image: null,
        imageLoading: false,
        imageError: true
      }
    })
  case 'UPLOAD_GALLERY_PRODUCT_IMAGE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        gallery: [
          ...state.current.gallery.slice(0, action.payload.index),
          {
            image: null,
            imageLoading: true,
            imageError: false
          },
          ...state.current.gallery.slice(action.payload.index + 1)
        ]
      }
    })
  case 'UPLOAD_GALLERY_PRODUCT_IMAGE_SUCCESS':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        gallery: [
          ...state.current.gallery.slice(0, action.payload.index),
          {
            image: action.payload.image,
            imageLoading: false,
            imageError: false
          },
          ...state.current.gallery.slice(action.payload.index + 1)
        ]
      }
    })
  case 'UPLOAD_GALLERY_PRODUCT_IMAGE_FAILURE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        gallery: [
          ...state.current.gallery.slice(0, action.payload.index),
          {
            image: null,
            imageLoading: false,
            imageError: true
          },
          ...state.current.gallery.slice(action.payload.index + 1)
        ]
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_LAYOUT':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        layoutLoading: true,
        layoutError: false
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_LAYOUT_SUCCESS':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        ...action.payload.product,
        layoutLoading: false,
        layoutError: false,
        editMode: null
      }
    })
  case 'UPLOAD_EDIT_PRODUCT_LAYOUT_FAILURE':
    return Object.assign({}, state, {
      current: {
        ...state.current,
        layoutLoading: false,
        layoutError: true
      }
    })
  case 'FETCH_SINGLE_PRODUCT':
    return Object.assign({}, state, {
      isFetching: action.payload.productId
    })
  case 'FETCH_SINGLE_PRODUCT_SUCCESS':
    return Object.assign({}, state, {
      current: action.payload.product,
      isFetching: null
    })
  case 'SET_CURRENT_PRODUCT':
    return Object.assign({}, state, {
      current: action.payload.product
    })
  case 'REFRESH_PRODUCTS':
    return initialState
  case 'FETCH_PRODUCTS_FAILURE':
  case 'FETCH_SINGLE_PRODUCT_FAILURE':
  case 'CREATE_PRODUCT_FAILURE':
  case 'EDIT_PRODUCT_FAILURE':
  default:
    return state
  }
}
