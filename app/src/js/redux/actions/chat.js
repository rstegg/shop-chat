export const leaveChatThread = (threadId, user) =>
({
  type: 'WS/LEAVE_THREAD',
  payload: {
    threadId,
    user
  }
})

export const sendThreadChatMessage = (text, user, threadId) =>
({
  type: 'WS/SEND_THREAD_CHAT_MESSAGE',
  payload: {
    text,
    user,
    threadId
  }
})

export const fetchThreadChatMessages = (user, shop) =>
({
  type: 'WS/FETCH_THREAD_CHAT_MESSAGES',
  payload: {
    user
  }
})

export const joinChatThread = (threadId, user) =>
({
  type: 'WS/JOIN_THREAD',
  payload: {
    threadId,
    user
  }
})
