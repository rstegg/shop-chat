import {
  joinChatThread,
  leaveChatThread,
  sendThreadChatMessage,
} from '@actions/chat'

const actionPayload = (type, payload) =>
({
  type,
  payload
})

test('action join chat', () => {
  const threadId = 1
  const user = {
    name: 'My Name',
    email: 'test@test.com',
    username: 'user'
  }
  expect(joinChatThread(threadId, user)).toEqual(actionPayload('WS/JOIN_THREAD', { threadId, user }))
})

test('action leave chat', () => {
  const threadId = 1
  const user = {
    name: 'My Name',
    email: 'test@test.com',
    username: 'user'
  }
  expect(leaveChatThread(threadId, user)).toEqual(actionPayload('WS/LEAVE_THREAD', { threadId, user }))
})

test('action send message', () => {
  const text = 'hello'
  const threadId = 1
  const user = {
    name: 'My Name',
    email: 'test@test.com',
    username: 'user'
  }
  expect(sendThreadChatMessage(text, threadId, user))
  .toEqual(actionPayload('WS/SEND_THREAD_CHAT_MESSAGE', { text, threadId, user }))
})
