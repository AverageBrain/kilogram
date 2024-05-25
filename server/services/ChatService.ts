import {User, UserChat} from "@prisma/client";
import {prisma} from "../domain/PrismaClient";
import {SSEService} from "./SSEService";
import {FileStorageService} from "./FileStorageService";
import {MessageWithFileUrls} from "../models/MessageWithFileUrls";

const sseService = new SSEService()

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
        })
        const fileUrls = await this.getFileUrls(prismaMessage.fileKeys)

        const sendMessage: MessageWithFileUrls = {
            message: prismaMessage,
            fileUrls: fileUrls,
        }

        const chatUsers = await prisma.userChat.findMany({where: {chatId: userChats[0].chatId}})

        chatUsers.forEach(uc => sseService.publishMessage(uc.userId, "newMessage", sendMessage))

        return sendMessage
    }

    async getFileUrls(fileKeys: string[]): Promise<string[]> {
        return Promise.all(fileKeys.map(key => {
            return FileStorageService.getFilePresignedUrl(key)
        }))
    }
}