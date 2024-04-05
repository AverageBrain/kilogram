import {UserChat} from "@prisma/client";
import {prisma} from "../domain/PrismaClient";

export class ChatService {
    // Check user have access to chat
    async getChatWithUserAccess(chatId: number, userId: number): Promise<UserChat | null> {
        return prisma.userChat.findFirst({where: {chatId: chatId, userId: userId}});
    }
}