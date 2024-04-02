import { UserType, ChatType } from '../types';
import { users } from './users'

export const findUserById = (id: string): UserType => {
  const user: UserType | undefined = users.find((user: UserType) => user.id === id);
  if (!user) {
    throw Error("Mock: Can't find user with id");
  }
  return user;
}

export const chats: ChatType[] = [
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
  {
    id: '10',
    createdAt: '2024-03-30T12:38:31',
    updatedAt: '2024-03-30T12:38:31',
    user: findUserById('1'), 
    messages: [
      {
        id: '13',
        user: findUserById('2'),
        createdAt: '2024-03-30T12:38:31',
        updatedAt: '2024-03-30T12:38:31',
        text: 'Blinded by me, you can\'t see a thing\nJust call my name, \'cause I\'ll hear you scream\nMaster, master',
      },
      {
        id: '14',
        user: findUserById('1'),
        createdAt: '2024-03-30T12:41:31',
        updatedAt: '2024-03-30T12:41:31',
        text: 'Twisting your mind and smashing your dreams',
      },
      {
        id: '15',
        user: findUserById('1'),
        createdAt: '2024-03-30T12:43:31',
        updatedAt: '2024-03-30T12:43:31',
        text: 'Master of puppets, I\'m pulling your strings',
      },
    ]
  }, 
  {
    id: '11',
    createdAt: '2024-03-30T12:41:31',
    updatedAt: '2024-03-30T12:41:31',
    user: findUserById('3'), 
    messages: [
      {
        id: '13',
        user: findUserById('1'),
        createdAt: '2024-03-30T14:43:31',
        updatedAt: '2024-03-30T14:43:31',
        text: 'I wake up screaming from dreaming',
      },
      {
        id: '14',
        user: findUserById('3'),
        createdAt: '2024-03-30T14:12:31',
        updatedAt: '2024-03-30T14:12:31',
        text: 'I should not be left to my own devices. They come with prices and vices. I end up in crisis',
      },
      {
        id: '15',
        user: findUserById('3'),
        createdAt: '2024-03-30T13:51:31',
        updatedAt: '2024-03-30T13:51:31',
        text: 'When my depression works the graveyard shift, all of the people I\'ve ghosted stand there in the room',
      },
      
      
    ]
  }, 
]
