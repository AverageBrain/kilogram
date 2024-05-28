import { UserType, ChatType } from '../types';
import { TypeOfChat } from '../types/types';
import { users } from './users';

export const findUserById = (id: number): UserType => {
  const user: UserType | undefined = users.find((user: UserType) => user.id === id);
  if (!user) {
    throw Error("Mock: Can't find user with id");
  }

  return user;
};

export const chats: ChatType[] = [
  {
    id: 9,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    users: [findUserById(2)],
    name: 'test1',
    type: TypeOfChat.Chat,
    messages: [
      {
        id: 10,
        chatId: 9,
        userId: 2,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: '*Hello*',
      },
      {
        id: 11,
        chatId: 9,
        userId: 2,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: '**Hi**',
      },
      {
        id: 12,
        chatId: 9,
        userId: 2,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: 'How are you? `import dayjs;`',
      },
    ],
  },
  {
    id: 10,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    users: [findUserById(1)],
    name: 'test2',
    type: TypeOfChat.Chat,
    messages: [
      {
        id: 13,
        chatId: 10,
        userId: 2,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: 'Blinded by me, you can\'t see a thing\nJust call my name, \'cause I\'ll hear you scream\nMaster, master',
      },
      {
        id: 14,
        chatId: 10,
        userId: 1,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: 'Twisting your mind and smashing your dreams',
      },
      {
        id: 15,
        chatId: 10,
        userId: 1,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: 'Master of puppets, I\'m pulling your strings',
      },
    ],
  },
  {
    id: 11,
    createdAt: new Date('2024-03-30T12:38:31'),
    updatedAt: new Date('2024-03-30T12:38:31'),
    users: [findUserById(3)],
    name: 'test3',
    type: TypeOfChat.Chat,
    messages: [
      {
        id: 13,
        chatId: 11,
        userId: 1,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: 'I wake up screaming from dreaming',
      },
      {
        id: 14,
        chatId: 11,
        userId: 3,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: 'I should not be left to my own devices. They come with prices and vices. I end up in crisis',
      },
      {
        id: 15,
        chatId: 11,
        userId: 3,
        createdAt: new Date('2024-03-30T12:38:31'),
        updatedAt: new Date('2024-03-30T12:38:31'),
        text: 'When my depression works the graveyard shift, all of the people I\'ve ghosted stand there in the room',
      },
    ],
  },
];
