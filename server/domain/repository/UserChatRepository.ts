import {BaseRepository} from "./BaseRepository";
import {UserChat} from "../entity/UserChat";
import {db} from "./Pool";

export class UserChatRepository extends BaseRepository<UserChat> {
    protected excInfo = {
        table: 'user_chat'
    }

    async save(entity: UserChat): Promise<UserChat> {
        const data = await db.one(
            'INSERT INTO $[table~] (chatId, userId) ' +
            'VALUES($[chatId], $[userId]) ' +
            'RETURNING id, createdAt, updatedAt',
            {...entity, ...this.excInfo}
        )
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: UserChat): Promise<UserChat> {
        entity.updatedAt = new Date()
        await db.none(
            'UPDATE $[table~] ' +
            'SET updatedAt = $[updatedAt], chatId = $[chatId], userId = $[userId] ' +
            'WHERE id = $[id]', {...entity, ...this.excInfo}
        )
        return entity
    }
}