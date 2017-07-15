export const joinChatThread = (threadId, user) =>
({
  type: 'WS/JOIN_THREAD',
  payload: {
    threadId,
    user
  }
})

export const leaveChatThread = (threadId, user) =>
({
  type: 'WS/LEAVE_THREAD',
  payload: {
    threadId,
    user
  }
})

export const sendThreadChatMessage = (text, threadId, user) =>
({
  type: 'WS/SEND_THREAD_CHAT_MESSAGE',
  payload: {
    text,
    threadId,
    user,
  }
})

export const fetchThreadChatMessages = user =>
({
  type: 'WS/FETCH_THREAD_CHAT_MESSAGES',
  payload: {
    user
  }
})
