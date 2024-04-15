import { ChatListItemType, ChatType } from '../types';
import { chats, findUserById } from './chats';

export const findChatById = (id: number): ChatType => {
  const chat: ChatType | undefined = chats.find((chat) => chat.id === id);
  if (!chat) {
    throw Error("Mock: Can't find chat with id");
  }
  return chat;
}

export const chatList: ChatListItemType[] = [
  {
    id: 9,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    name: findUserById(2).name,
    lastMessage: 'Hello',
  }, 
  {
    id: 10,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    name: findUserById(1).name,
    lastMessage: 'Blinded by me, you can\'t see a thing',
  }, 
  {
    id: 11,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    name: findUserById(3).name,
    lastMessage: 'I wake up screaming from dreaming',
  }, 
]
