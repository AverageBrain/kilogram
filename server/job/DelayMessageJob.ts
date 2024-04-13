import {prisma} from "../domain/PrismaClient";
import {DelayMessage} from "@prisma/client";
import {ChatService} from "../services/ChatService";


const chatService = new ChatService()

export class DelayMessageJob {
    async checkAndSendInTimeMessage() {
        const needSendMessages = await prisma.delayMessage.findMany({where: {inTime: {lt: new Date()}}})
        needSendMessages.map(async i => {
            try {
                await this.sendDelayMessage(i)
            } catch (e) {
                console.warn('Cant send delay message id: ' + i.id)
            }
        })
        // setTimeout(this.checkAndSendInTimeMessage, 1000 * 60)
    }

    async sendDelayMessage(delayMessage: DelayMessage) {
        const user = await prisma.user.findUniqueOrThrow({where: {id: delayMessage.userId}})
        await chatService.sendMessage(user, delayMessage)
    }


    async run() {
        await this.checkAndSendInTimeMessage()
    }
}