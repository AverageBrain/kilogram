import {BaseRepository} from "./BaseRepository";
import {Message} from "../entity/Message";
import {db} from "./Pool";

export class MessageRepository extends BaseRepository<Message> {
    protected excInfo = {
        table: 'message'
    }

    async save(entity: Message): Promise<Message> {
        const data = await db.one(
            'INSERT INTO $[table~] (chatId, userId, text) ' +
            'VALUES($[chatId], $[userId], [text]) ' +
            'RETURNING id, createdAt, updatedAt',
            {...entity, ...this.excInfo}
        )
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: Message): Promise<Message> {
        entity.updatedAt = new Date()
        await db.none(
            'UPDATE $[table~] ' +
            'SET updatedAt = $[updatedAt], chatId = $[chatId], userId = $[userId], text = $[text] ' +
            'WHERE id = $[id]', {...entity, ...this.excInfo}
        )
        return entity
    }
}