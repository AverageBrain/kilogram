type BaseItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
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
  lastMessage: Message;
}

export type Chat = BaseItem & { 
  user: User;
  messages: Message[];
}