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
  reactions: MessageReactionType[]
}

export type MessageReactionType = BaseItemType & {
  reactionType: ReactionType;
  userId: number;
}

export type ReactionType = BaseItemType & {
  emoji: string
}

export type ChatListItemType = BaseItemType & {
  name: string;
  lastMessage: string;
}

export type ChatType = BaseItemType & {
  user: UserType;
  messages: MessageType[];
}
