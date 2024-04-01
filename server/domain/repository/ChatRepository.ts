import {BaseRepository} from "./BaseRepository";
import {Chat} from "../entity/Chat";
import {db} from "./Pool";

export class ChatRepository extends BaseRepository<Chat> {
    protected excInfo = {
        table: 'chat'
    }

    async save(entity: Chat): Promise<Chat> {
        const data = await db.one(
            'INSERT INTO $[table~] (name) ' +
            'VALUES($[name]) ' +
            'RETURNING id, createdAt, updatedAt',
            {...entity, ...this.excInfo}
        )
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: Chat): Promise<Chat> {
        entity.updatedAt = new Date()
        await db.none(
            'UPDATE $[table~] ' +
            'SET updatedAt = $[updatedAt], name = $[name] ' +
            'WHERE id = $[id]', {...entity, ...this.excInfo}
        )
        return entity
    }
}