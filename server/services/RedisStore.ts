import {createClient} from 'redis';
import {SSEService} from "./SSEService";
import {prisma} from "../domain/PrismaClient";

const client = await createClient({url: 'redis://redis:kilogram@158.160.118.181:6379'})
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

const expire: Map<number, any> = new Map();

const sseService = new SSEService()

export class RedisStore {
    async setOnline(userId: number) {
        if (expire.has(userId)) {
            clearTimeout(expire.get(userId))
            expire.delete(userId)
        } else {
            await this.notifyUsers(true, userId)
        }
        await client.set(userId.toString(), 'true')
    }

    async setOffline(userId: number) {
        expire.set(userId, setTimeout(async () => {
            await client.del(userId.toString())
            await this.notifyUsers(false, userId)
        }, 60_000))
    }

    async notifyUsers(status: boolean, userId: number) {
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

    async getStatus(userId: number): Promise<boolean> {
        const res = await client.get('key')
        return res != null;
    }
}