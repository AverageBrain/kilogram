import {BaseRepository, FindValue} from "./BaseRepository";
import {User} from "../entity/User";
import {db} from "./Pool";

export class UserRepository implements BaseRepository<User> {
    private excInfo = {
        "table": 'user'
    }


    async save(entity: User) {
        const data = await db.one(
            'INSERT INTO $[table~] (username, name, githubId) VALUES($[username], $[name], $[githubId]) RETURNING id, createdAt, updatedAt',
            {...entity, ...this.excInfo}
        )
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: User) {
        entity.updatedAt = new Date()
        await db.none(
            'UPDATE $[table~] SET updatedAt = $[updatedAt], username = $[username], name = $[name], githubId = $[githubId] WHERE id = $[id]', {...entity, ...this.excInfo}
        )
        return entity
    }

    async remove(entity: User) {
        await db.none(
            'DELETE FROM $[table~] WHERE id = $[id]',
            {...entity, ...this.excInfo}
        )
        return entity
    }

    async findById(id: number) {
        return await db.oneOrNone<User>('SELECT * FROM $[table~] where id = $[id]', {
            id: id,
            ...this.excInfo
        })
    }

    async findByIds(ids: number[]) {
        return await db.manyOrNone<User>('SELECT * FROM $[table~] where id in $[ids]', {
            ids: ids,
            ...this.excInfo
        })
    }

    async findByField(name: string, value: FindValue) {
        return await db.manyOrNone<User>('SELECT * FROM $[table~] where $[column~] = $[value]', {
            column: name,
            value: value,
            ...this.excInfo
        })
    }

    async findByFieldFirst(name: string, value: FindValue) {
        return await db.oneOrNone<User>('SELECT * FROM $[table~] where $[column~] = $[value] LIMIT 1', {
            column: name,
            value: value,
            ...this.excInfo
        })
    }
}