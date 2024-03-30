import {BaseRepository, FindValue} from "./BaseRepository";
import {User} from "../entity/User";
import {db} from "./Pool";

export class UserRepository implements BaseRepository<User> {
    async save(entity: User) {
        const data = await db.one(
            'INSERT INTO "user" (username, name, githubId) VALUES($[username], $[name], $[githubId]) RETURNING id, createdAt, updatedAt',
            entity
        )
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: User) {
        entity.updatedAt = new Date()
        await db.none(
            'UPDATE "user" SET updatedAt = $[updatedAt], username = $[username], name = $[name], githubId = $[githubId] WHERE id = $[id]', entity
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
        return await db.oneOrNone<User>('SELECT * FROM "user" where id = $[id]', {
            id: id
        })
    }

    async findByIds(ids: number[]) {
        return await db.many<User>('SELECT * FROM "user" where id in $[ids]', {
            ids: ids
        })
    }
    async findByField (name: string, value: FindValue) {
        return await db.many<User>('SELECT * FROM "user" where id in $[ids]', {
            ids: ids
        })
    }
    findByFieldFirst: (name: string, value: FindValue) => Promise<User | null>;

}