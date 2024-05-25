import {User, UserChat} from "@prisma/client";
import {prisma} from "../domain/PrismaClient";
import {SSEService} from "./SSEService";
import {FileStorageService} from "./FileStorageService";
import {MessageWithFileUrls} from "../models/MessageWithFileUrls";

const sseService = new SSEService()

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
    // Check user have access to chat
    async getChatWithUserAccess(chatId: number, userId: number): Promise<UserChat | null> {
        return prisma.userChat.findFirst({where: {chatId: chatId, userId: userId}});
    }

    async sendMessage(
        user: User,
        message: { chatId: number, text: string, fileKeys: string[] },
    ): Promise<MessageWithFileUrls> {
        const userChats = await prisma.userChat.findMany({where: {chatId: message.chatId}})
        if (!userChats.find((chat) => chat.userId === user.id)) {
            throw new Error("User has no access to the chat")
        }

        await Promise.all(userChats.map(async (userChat) => {
            userChat.updatedAt = new Date()
            return prisma.userChat.update({data: userChat, where: {id: userChat.id}});
        }));

        const prismaMessage = await prisma.message.create({
            data: {
                chatId: message.chatId,
                text: message.text,
                fileKeys: message.fileKeys,
                userId: user.id,
            }
        });
        const fileUrls = await this.getFileUrls(prismaMessage.fileKeys)

        const sendMessage: MessageWithFileUrls = {
            message: prismaMessage,
            fileUrls: fileUrls,
        }

        const chatUsers = await prisma.userChat.findMany({where: {chatId: userChats[0].chatId}});

        chatUsers.forEach(uc => sseService.publishMessage(uc.userId, "newMessage", sendMessage));

        return sendMessage;
    }
    
    async getMessageById(messageId: number) {
        const message = await prisma.message.findUnique({where: {id: messageId}});
        if (message == null) {
            throw new Error("Message not founded");
        }
        return message;
    }

    async getReactionTypeById(reactionTypeId: number) {
        const reactionType = await prisma.reactionType.findUnique({where: {id: reactionTypeId}});
        if (reactionType == null) {
            throw new Error("ReactionType not founded");
        }
        return reactionType;
    }

    async updateMessageUpdatedAt(message: MessageType) {
        message.updatedAt = new Date();
        return prisma.message.update({data: message, where: {id: message.id}});
    }

    async updateUserChats(message: MessageType, user: User) {
        const userChats = await prisma.userChat.findMany({where: {chatId: message.chatId}});
        if (!userChats.find((chat) => chat.userId === user.id)) {
            throw new Error("User has no access to the chat");
        }

        await Promise.all(userChats.map(async (userChat) => {
            userChat.updatedAt = new Date();
            return prisma.userChat.update({data: userChat, where: {id: userChat.id}});
        }));

        return userChats;
    }

    async setReaction(user: User, reactionMessageIn: {messageId: number, reactionTypeId: number}) {
        const message = await this.getMessageById(reactionMessageIn.messageId);

        const reactionType = await this.getReactionTypeById(reactionMessageIn.reactionTypeId);
        
        await this.updateMessageUpdatedAt(message);

        const userChats = await this.updateUserChats(message, user);
        
        const curReactionMessage = await prisma.messageReaction.findFirst({
            where: {messageId: message.id, userId: user.id}
        });
        const reactionMessage = !curReactionMessage 
            ? await prisma.messageReaction.create({
                data: {
                    userId: user.id,
                    reactionTypeId: reactionType.id,
                    messageId: message.id
                }
            }) 
            : await prisma.messageReaction.update({
                data: {reactionTypeId: reactionMessageIn.reactionTypeId}, 
                where: {id: curReactionMessage.id}
            });

        const chatUsers = await prisma.userChat.findMany({where: {chatId: userChats[0].chatId}});

        chatUsers.forEach(uc => sseService.publishMessage(uc.userId, "newReaction", reactionMessage));

        return {
            id: reactionMessage.id,
            createdAt: reactionType.createdAt,
            updatedAt: reactionType.updatedAt,
            reactionType: {
                id: reactionType.id,
                createdAt: reactionType.createdAt,
                updatedAt: reactionType.updatedAt,
                emoji: reactionType.emoji
            },
            userId: user.id,
        }
    }

    async removeReaction(user: User, reactionMessageIn: {messageId: number, reactionTypeId: number}) {
        const message = await this.getMessageById(reactionMessageIn.messageId);
        
        await this.updateMessageUpdatedAt(message);

        const userChats = await this.updateUserChats(message, user);
        
        const removedReaction = await prisma.messageReaction.findFirst({
            where: { 
                AND: [
                    { userId: user.id },
                    { messageId: reactionMessageIn.messageId },
                    { reactionTypeId: reactionMessageIn.reactionTypeId },
                ]
            }
        });

        if (removedReaction == null) {
            throw new Error("Reaction not found");
        }

        if (removedReaction.userId != user.id) {
            throw new Error("Access denied");
        }

        const chatUsers = await prisma.userChat.findMany({where: {chatId: userChats[0].chatId}});

        chatUsers.forEach(uc => sseService.publishMessage(uc.userId, "removeReaction", removedReaction));

        return prisma.messageReaction.delete({where: {id: removedReaction.id}});

    async getFileUrls(fileKeys: string[]): Promise<string[]> {
        return Promise.all(fileKeys.map(key => {
            return FileStorageService.getFilePresignedUrl(key)
        }))
    }
}