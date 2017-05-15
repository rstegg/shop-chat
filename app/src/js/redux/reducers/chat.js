const initialState = {
  messages: [],
  rooms: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'RECEIVE_HOME_CHAT_MESSAGE':
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload.message]
      })
    case 'RECEIVE_HOME_CHAT_MESSAGES':
      return Object.assign({}, state, {
        messages: action.payload.messages || []
      })
    case 'RECEIVE_ROOM_CHAT_MESSAGE':
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload.message]
      })
    case 'RECEIVE_ROOM_CHAT_MESSAGES':
      return Object.assign({}, state, {
        messages: action.payload.messages || []
      })
    case 'JOIN_ROOM_SUCCESS':
      return Object.assign({}, state, {
        rooms: [...state.rooms, action.payload.room],
        messages: action.payload.messages || []
      })
    case 'SEND_MESSAGE_FAILURE':
    default:
      return state
  }
}
