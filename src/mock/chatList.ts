import { User, ChatListItem } from '../types';
import { users } from './users'

const findUserById = (id: string): User => {
  const user: User | undefined = users.find((user: User) => user.id === id);
  if (!user) {
    throw Error("Mock: Can't find user with id");
  }
  return user;
}


export const chatList: ChatListItem[] = [
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
    lastMessage: 'Goodbye',
  }, 
]
