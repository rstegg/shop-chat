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
    image_error: false,
    is_public: false
  },
  list: [],
  fetchable: true,
  isFetching: null
}

export default function(state = initialState, action) {
  switch(action.type) {
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
          gallery: [...state.current.gallery, { image: '/images/productholder.png' } ]
        }
      })
    case 'DELETE_PRODUCT_GALLERY_IMAGE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          gallery: [...state.current.gallery.slice(0, action.payload.index), ...state.current.gallery.slice(action.payload.index + 1)]
        }
      })
    case 'OPEN_CHANGE_PRODUCT_LAYOUT':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: 'layout'
        }
      })
    case 'OPEN_ADD_PRODUCT_OPTIONS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: 'options'
        }
      })
    case 'OPEN_ADD_PRODUCT_ELEMENT':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: 'element'
        }
      })
    case 'OPEN_ADD_PRODUCT_MEDIA':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          editMode: 'media'
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
    case 'CLOSE_ADD_PRODUCT_ELEMENT':
    case 'CLOSE_ADD_PRODUCT_OPTIONS':
    case 'CLOSE_ADD_PRODUCT_MEDIA':
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
          theme_loading: true,
          theme_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_THEME_SUCCESS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          ...action.payload.product,
          theme_loading: false,
          theme_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_THEME_FAILURE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          theme_loading: false,
          theme_error: true
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
          image_loading: true,
          image_error: false
        }
      })
    case 'UPLOAD_PRODUCT_IMAGE_FAILURE':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: null,
          image_loading: false,
          image_error: true
        }
      })
    case 'UPLOAD_PRODUCT_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: action.payload.image,
          image_loading: false,
          image_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_IMAGE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: null,
          image_loading: true,
          image_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: action.payload.image,
          image_loading: false,
          image_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_IMAGE_FAILURE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          image: null,
          image_loading: false,
          image_error: true
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
              image_loading: true,
              image_error: false
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
                image_loading: false,
                image_error: false
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
              image_loading: false,
              image_error: true
            },
            ...state.current.gallery.slice(action.payload.index + 1)
          ]
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_LAYOUT':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          layout_loading: true,
          layout_error: false
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_LAYOUT_SUCCESS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          ...action.payload.product,
          layout_loading: false,
          layout_error: false,
          editMode: null
        }
      })
    case 'UPLOAD_EDIT_PRODUCT_LAYOUT_FAILURE':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          layout_loading: false,
          layout_error: true
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
