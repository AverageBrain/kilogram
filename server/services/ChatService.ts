import {User, UserChat} from "@prisma/client";
import {prisma} from "../domain/PrismaClient";
import {SSEService} from "./SSEService";

const sseService = new SSEService()

export class ChatService {
    // Check user have access to chat
    async getChatWithUserAccess(chatId: number, userId: number): Promise<UserChat | null> {
        return prisma.userChat.findFirst({where: {chatId: chatId, userId: userId}});
    }

    async sendMessage(user: User, message: { chatId: number, text: string }) {
        const userChats = await prisma.userChat.findMany({where: {chatId: message.chatId}})
        if (!userChats.find((chat) => chat.userId === user.id)) {
            throw new Error("User has no access to the chat")
        }

        await Promise.all(userChats.map(async (userChat) => {
            userChat.updatedAt = new Date()
            return prisma.userChat.update({data: userChat, where: {id: userChat.id}});
        }));

        const sendMessage = await prisma.message.create({
            data: {
                chatId: message.chatId,
                text: message.text,
                userId: user.id
            }
        })

        const chatUsers = await prisma.userChat.findMany({where: {chatId: userChats[0].chatId}})

        chatUsers.forEach(uc => sseService.publishMessage(uc.userId, "newMessage", sendMessage))

        return sendMessage
    }

}