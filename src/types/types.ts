type BaseItemType = {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type UserType = BaseItemType & {
  name: string;
  username: string;
} 

export type MessageType = BaseItemType & {
  user: UserType;
  text: string;
}

export type ChatListItemType = BaseItemType & { 
  name: string;
  lastMessage: string;
}

export type ChatType = BaseItemType & { 
  user: UserType;
  messages: MessageType[];
}
