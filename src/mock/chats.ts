import { User, Chat } from '../types';
import { users } from './users';

const findUserById = (id: string): User => {
  const user: User | undefined = users.find((user: User) => user.id === id);
  if (!user) {
    throw Error("Mock: Can't find user with id");
  }
  return user;
}

export const chats: Array<Chat> = [
  {
    id: '9',
    createdAt: '2024-03-30T12:38:31',
    updatedAt: '2024-03-30T12:38:31',
    user: findUserById('2'), 
    messages: [
      {
        id: '10',
        user: findUserById('1'),
        createdAt: '2024-03-30T12:38:31',
        updatedAt: '2024-03-30T12:38:31',
        text: 'Hello',
      },
      {
        id: '11',
        user: findUserById('2'),
        createdAt: '2024-03-30T12:41:31',
        updatedAt: '2024-03-30T12:41:31',
        text: 'Hi',
      },
      {
        id: '12',
        user: findUserById('2'),
        createdAt: '2024-03-30T12:43:31',
        updatedAt: '2024-03-30T12:43:31',
        text: 'How are you?',
      },
    ]
  }, 
]
