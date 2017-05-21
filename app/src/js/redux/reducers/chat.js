const initialState = {
  messages: [],
  threadId: null,
  offer: {
    isOpen: false
  },
  fetchable: true
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'OPEN_OFFER_WINDOW':
      return Object.assign({}, state, {
        offer: {
          ...state.offer,
          isOpen: true
        }
      })
    case 'CLOSE_OFFER_WINDOW':
      return Object.assign({}, state, {
        offer: {
          ...state.offer,
          isOpen: false
        }
      })
    case 'RECEIVE_ROOM_CHAT_MESSAGE':
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload.message],
        fetchable: true
      })
    case 'RECEIVE_ROOM_CHAT_MESSAGES':
      return Object.assign({}, state, {
        messages: action.payload.messages || [],
        fetchable: true
      })
    case 'JOIN_ROOM':
      return Object.assign({}, state, {
        fetchable: false
      })
    case 'JOIN_ROOM_SUCCESS':
      return Object.assign({}, state, {
        messages: action.payload.messages || [],
        threadId: action.payload.threadId,
        fetchable: true
      })
    case 'SEND_MESSAGE_FAILURE':
    default:
      return state
  }
}
