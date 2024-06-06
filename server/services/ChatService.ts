import { User } from '@prisma/client';

import * as types from '../../src/types';
import { prisma } from '../domain/PrismaClient';
import { FileStorageService } from './FileStorageService';
import MainNotificationService from './MainNotificationService';
import { convertPrismaMessage } from '../utils';

const notificationService = new MainNotificationService();

type MessageType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  chatId: number;
  text: string;
  fileKeys: string[];
};

export class ChatService {
  async getFileUrls(fileKeys: string[]): Promise<string[]> {
    return Promise.all(fileKeys.map((key) => FileStorageService.getFilePresignedUrl(key)));
  }

  private async getMessageById(messageId: number) {
    return prisma.message.findFirstOrThrow({ where: { id: messageId } });
  }

  private async getReactionTypeById(reactionTypeId: number) {
    return prisma.reactionType.findFirstOrThrow({ where: { id: reactionTypeId } });
  }

  private async updateMessageUpdatedAt(message: MessageType) {
    return prisma.message.update({ data: { updatedAt: new Date() }, where: { id: message.id } });
  }

  private async updateUserChats(chatId: number, user: User) {
    const chat = await prisma.chat.findUniqueOrThrow({
      where: { id: chatId },
      include: { members: true },
    });
    if (!chat.members.find((c) => c.userId === user.id)) {
      throw new Error('User has no access to the chat');
    }

    await prisma.$transaction(
      chat.members.map((userChat) => prisma.userChat.update({
        data: { updatedAt: new Date() },
        where: { id: userChat.id },
      })),
    );

    return chat;
  }

  async sendMessage(
    user: User,
    message: { chatId: number; text: string; fileKeys: string[] },
  ): Promise<types.MessageType> {
    const chat = await this.updateUserChats(message.chatId, user);

    const prismaMessage = await prisma.message.create({
      data: {
        chatId: message.chatId,
        text: message.text,
        fileKeys: message.fileKeys,
        userId: user.id,
      },
    });
    const fileUrls = await this.getFileUrls(prismaMessage.fileKeys);

    const sendMessage: types.MessageType = convertPrismaMessage(prismaMessage, [], fileUrls);

    notificationService.publishMessages(chat.members.map((uc) => uc.userId), 'newMessage', {
      message: sendMessage,
      chat,
      user,
    });

    return sendMessage;
  }

  async setReaction(user: User, reactionMessageIn: { messageId: number; reactionTypeId: number }) {
    const message = await this.getMessageById(reactionMessageIn.messageId);
    const reactionType = await this.getReactionTypeById(reactionMessageIn.reactionTypeId);
    await this.updateMessageUpdatedAt(message);
    const chat = await this.updateUserChats(message.chatId, user);
    const curReactionMessage = await prisma.messageReaction.findFirst({
      where: { messageId: message.id, userId: user.id },
    });
    const reactionMessage = !curReactionMessage
      ? await prisma.messageReaction.create({
        data: {
          userId: user.id,
          reactionTypeId: reactionType.id,
          messageId: message.id,
        },
      })
      : await prisma.messageReaction.update({
        data: { reactionTypeId: reactionMessageIn.reactionTypeId },
        where: { id: curReactionMessage.id },
      });

    notificationService.publishMessages(chat.members.map((uc) => uc.userId), 'newReaction', {
      ...reactionMessage,
      chat,
      user,
    });

    return {
      id: reactionMessage.id,
      createdAt: reactionType.createdAt,
      updatedAt: reactionType.updatedAt,
      reactionType: {
        id: reactionType.id,
        createdAt: reactionType.createdAt,
        updatedAt: reactionType.updatedAt,
        emoji: reactionType.emoji,
      },
      userId: user.id,
    };
  }

  async removeReaction(user: User, reactionMessageIn: { messageId: number; reactionTypeId: number }) {
    const message = await this.getMessageById(reactionMessageIn.messageId);
    await this.updateMessageUpdatedAt(message);
    const chat = await this.updateUserChats(message.chatId, user);
    const removedReaction = await prisma.messageReaction.findFirstOrThrow({
      where: {
        AND: [
          { userId: user.id },
          { messageId: reactionMessageIn.messageId },
          { reactionTypeId: reactionMessageIn.reactionTypeId },
        ],
      },
    });
    notificationService.publishMessages(chat.members.map((uc) => uc.userId), 'removeReaction', removedReaction);

    return prisma.messageReaction.delete({ where: { id: removedReaction.id } });
  }
}
