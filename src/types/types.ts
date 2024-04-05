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
  userId: number, // that's enough for now
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
