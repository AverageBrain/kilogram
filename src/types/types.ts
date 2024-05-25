type BaseItemType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UserType = BaseItemType & {
  name: string;
  username: string;
  bio?: string;
  lastSeen?: string;
}

export type MessageType = BaseItemType & {
  chatId: number;
  userId: number;
  text: string;
  inTime?: Date;
  reactions?: MessageReactionType[]
}

export type MessageReactionType = BaseItemType & {
  reactionType: ReactionType;
  userId: number;
}

export type ReactionType = BaseItemType & {
  emoji: string;
}

export type ReactionWithMessageInfoType = BaseItemType & {
  reactionTypeId: number;
  messageId: number;
  userId: number;
}

export type ChatListItemType = BaseItemType & {
  name: string;
  lastMessage: string;
}

export enum TypeOfChat {
  Chat = 'chat',
  Group = 'group',
}

export type ChatType = BaseItemType & {
  name: string;
  users: UserType[]; // users not contains self user
  joinKey?: string; // only for group
  messages: MessageType[];
  type: TypeOfChat;
}

export type MetadataType = {
  title: string;
  description?: string;
  imageUrl?: string;
}

export type GroupFormType = {
  name: string;
  userIds: number[];
};
