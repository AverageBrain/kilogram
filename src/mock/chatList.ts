import { ChatListItemType, ChatType } from '../types';
import { chats } from './chats';

export const findChatById = (id: string): ChatType => {
  const chat: ChatType | undefined = chats.find((chat) => chat.id === id);
  if (!chat) {
    throw Error("Mock: Can't find chat with id");
  }
  return chat;
}

export const chatList: ChatListItemType[] = [
  {
    id: '9',
    createdAt: '2024-03-30T12:38:31',
    updatedAt: '2024-03-30T12:38:31',
    name: '1',
    lastMessage: 'Hello',
  }, 
  {
    id: '10',
    createdAt: '2024-03-30T12:38:31',
    updatedAt: '2024-03-30T12:38:31',
    name: '2',
    lastMessage: 'Blinded by me, you can\'t see a thing',
  }, 
]