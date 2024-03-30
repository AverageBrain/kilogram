import {BaseRepository, FindValue} from "./BaseRepository";
import {User} from "../entity/User";
import {db} from "./Pool";

export class UserRepository implements BaseRepository<User> {
    async save(entity: User) {
        const data = await db.one(
            'INSERT INTO "user" (username, name) VALUES($[username], $[name]) RETURNING id, createdAt, updatedAt',
            entity
        )
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: User) {
        entity.updatedAt = new Date()
        const data = await db.none(
            'UPDATE "user" SET updatedAt = $[updatedAt], username = $[username], name = $[name] WHERE id = $[id]', entity
        )
        return entity
    }

    async remove(entity: User) {
        await db.none(
            'DELETE FROM "user" WHERE id = $[id]',
            entity
        )
        return entity
    }

    async findById(id: number) {
        return await db.oneOrNone('SELECT * FROM "user" where id = $[id]', {
            table: 'Table Name',
            id: id
        })
    }

    findByIds: (ids: number[]) => Promise<User[]>;
    findByField: (name: string, value: FindValue) => Promise<User[]>;
}