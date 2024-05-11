import {prisma} from "../domain/PrismaClient";
import {DelayMessage} from "@prisma/client";
import {ChatService} from "../services/ChatService";


const chatService = new ChatService()

export class DelayMessageJob {
    async checkAndSendInTimeMessage() {
        const needSendMessages = await prisma.delayMessage.findMany({where: {inTime: {lt: new Date()}},
            orderBy: [{ inTime: 'desc' }, { id: 'desc' }]})
        needSendMessages.map(async i => {
            try {
                await this.sendDelayMessage(i)
            } catch (e) {
                console.warn('Can\'t send delay message with id: ' + i.id)
            }
        })
        setTimeout(this.checkAndSendInTimeMessage.bind(this), 1000 * 30)
    }

    async sendDelayMessage(delayMessage: DelayMessage) {
        const user = await prisma.user.findUniqueOrThrow({where: {id: delayMessage.userId}})
        await chatService.sendMessage(user, delayMessage)
        await prisma.delayMessage.delete({where: {id: delayMessage.id}})
    }

    async run() {
        await this.checkAndSendInTimeMessage()
    }
}