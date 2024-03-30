import {BaseRepository, FindValue} from "./BaseRepository";
import {Chat} from "../entity/Chat";
import {db} from "./Pool";
import {User} from "../entity/User";

export class ChatRepository implements BaseRepository<Chat> {
    private excInfo = {
        "table": 'user'
    }

    async save(entity: Chat) {
        const data = await db.one(
            'INSERT INTO $[table~] (username, name, githubId) VALUES($[username], $[name], $[githubId]) RETURNING id, createdAt, updatedAt',
            {...entity, ...this.excInfo}
        )
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: Chat) {
        entity.updatedAt = new Date()
        await db.none(
            'UPDATE $[table~] SET updatedAt = $[updatedAt], name = $[name] WHERE id = $[id]', {...entity, ...this.excInfo}
        )
        return entity
    }

    async remove(entity: Chat) {
        await db.none(
            'DELETE FROM $[table~] WHERE id = $[id]',
            {...entity, ...this.excInfo}
        )
        return entity
    }

    async findById(id: number) {
        return await db.oneOrNone<Chat>('SELECT * FROM $[table~] where id = $[id]', {
            id: id,
            ...this.excInfo
        })
    }
    findByIds: (ids: number[]) => Promise<Chat[]>;
    findByField: (name: string, value: FindValue) => Promise<Chat[]>;
    findByFieldFirst: (name: string, value: FindValue) => Promise<Chat | null>;
}