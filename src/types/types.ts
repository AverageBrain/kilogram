type BaseItem = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type User = BaseItem & {
  name: string;
  username: string;
} 

export type Message = BaseItem & {
  user: User;
  text: string;
}

export type ChatListItem = BaseItem & { 
  name: string;
  lastMessage: string;
}

export type Chat = BaseItem & { 
  user: User;
  messages: Message[];
}
