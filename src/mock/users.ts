import { UserType, ChatType } from '../types';
import { TypeOfChat } from '../types/types';
import { chats } from './chats';

const toChat = (user: UserType): ChatType => {
  return {
    id: chats.length + 1,
    name: 'test',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    users: [user],
    type: TypeOfChat.Chat,
    messages: [],
  }
}

export const searchUsersByUsername = async (prefix: string) => {
  const filteredUsers = users
    .filter(user => user.username.startsWith(prefix))
    .map(user => toChat(user));
  return filteredUsers;
};

export const users: UserType[] = [
  {
    id: 1,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    name: 'Anton',
    username: 'average-brain',
    lastSeen: new Date('2024-03-30T12:38:31'),
    bio: 'ррррррр...',
  },
  {
    id: 2,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    name: 'Polina',
    username: 'buchurella',
    lastSeen: new Date('2024-03-30T12:38:31'),
  },
  {
    id: 3,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    name: 'Vova',
    username: 'phoenixNazarov',
  },
  {
    id: 4,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    name: 'Vlad',
    username: 'SvVlad',
  },
  {
    id: 5,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    name: 'Yuliana',
    username: 'Yuliana427',
  },
]
