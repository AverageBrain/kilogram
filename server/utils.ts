import { Message } from '@prisma/client';

import * as types from '../src/types';

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) => arr.reduce((groups, item) => {
  (groups[key(item)] ||= []).push(item);

  return groups;
}, {} as Record<K, T[]>);

export const getIdCondition = (afterId: number) => (afterId === -1 ? undefined : { lt: afterId });

export const getDateCondition = (date?: Date) => (date ? { lt: date } : undefined);

export function convertPrismaMessage(
  prismaMessage: Message,
  reactions: types.MessageReactionType[],
  fileUrls: string[],
  inTime?: Date,
): types.MessageType {
  return {
    id: prismaMessage.id,
    createdAt: prismaMessage.createdAt,
    updatedAt: prismaMessage.updatedAt,
    chatId: prismaMessage.chatId,
    userId: prismaMessage.userId,
    text: prismaMessage.text,
    inTime,
    reactions,
    fileUrls,
  };
}

export function convertPrismaReaction(prismaReaction: types.MessageReactionType): types.MessageReactionType {
  return {
    id: prismaReaction.id,
    createdAt: prismaReaction.createdAt,
    updatedAt: prismaReaction.updatedAt,
    reactionType: prismaReaction.reactionType,
    userId: prismaReaction.userId,
  };
}
