import { RedisStore } from "./RedisStore";

export type SSECallback = (data: string) => boolean
const listeners: Map<number, Map<string, SSECallback>> = new Map()


export class SSEService {
    redisStore = new RedisStore()


    async registerListen(userId: number, sseCallback: SSECallback): Promise<string> {
        if (!listeners.has(userId)) {
            listeners.set(userId, new Map())
        }
        const userListeners = listeners.get(userId)
        if (userListeners == undefined) {
            throw new Error('Unexpected error')
        }

        await this.redisStore.setOnline(userId)

        while (true) {
            const randomId = Math.floor(Math.random() * 10000000).toString()
            if (userListeners.has(randomId)) {
                continue
            }

            userListeners.set(randomId, sseCallback)
            return randomId
        }
    }

    async unregisterListen(userId: number, randomId: string) {
        listeners.get(userId)?.delete(randomId)
        await this.redisStore.setOffline(userId)
    }

    async publishMessage(toUserId: number, type: string, uuid: string, data: any) {
        const userListeners = listeners.get(toUserId)
        if (userListeners == undefined) {
            return
        }
        Array.from(userListeners.values()).forEach(
            c => c(JSON.stringify({ type: type, data: data, eventId: uuid }))
        )
    }
}