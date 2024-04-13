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
}

export type ChatListItemType = BaseItemType & { 
  name: string;
  lastMessage: string;
}

export type ChatType = BaseItemType & { 
  users: UserType[]; // users not contains self user
  messages: MessageType[];
  type: 'chat' | 'group';
}
