import {createClient} from 'redis';
import {SSEService} from "./SSEService";
import {prisma} from "../domain/PrismaClient";

const client = await createClient({url: 'redis://158.160.118.181:6379'})
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

const statusExpire: Map<number, any> = new Map();

export class RedisStore {
    protected onlineKey(userId: number): string {
        return 'userOnline:' + userId
    }

    async setOnline(userId: number) {
        if (statusExpire.has(userId)) {
            clearTimeout(statusExpire.get(userId))
            statusExpire.delete(userId)
        } else {
            await this.notifyUsers(true, userId)
        }
        await client.set(this.onlineKey(userId), 'true')
    }

    async setOffline(userId: number) {
        statusExpire.set(userId, setTimeout(async () => {
            await client.del(this.onlineKey(userId))
            await this.notifyUsers(false, userId)
        }, 5_000))
        const user = await prisma.user.findUnique({where: {id: userId}})
        if (user) {
            user.lastSeen = new Date()
            await prisma.user.update({data: user, where: {id: user.id}})
        }
    }

    /*
    * Notify users about online or offline for another users
    * */
    async notifyUsers(status: boolean, userId: number) {
        const sseService = new SSEService()
        const supportUser = await prisma.userChat.findMany({
            where: {AND: [{userId: userId}, {chat: {type: 'chat'}}]},
            include: {chat: {include: {members: true}}}
        })
        supportUser.forEach(
            su => su.chat.members
                .filter(i => i.userId != userId)
                .forEach(async u => {
                    await sseService.publishMessage(u.userId, 'userStatus', {status, userId})
                }))
    }

    async getStatus(userIds: number[]): Promise<Map<number, boolean>> {
        const keys = userIds.map(i => this.onlineKey(i))
        const statuses = await client.mGet(keys)

        const userStatus = new Map()
        for (let i = 0; i < userIds.length; i++) {
            if (statuses[i] == 'true')
                userStatus.set(userIds[i], true)
            else
                userStatus.set(userIds[i], false)
        }
        return userStatus
    }
}