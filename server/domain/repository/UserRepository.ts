import {BaseRepository} from "./BaseRepository";
import {User} from "../entity/User";
import {db} from "./Pool";

export class UserRepository extends BaseRepository<User> {
    protected excInfo = {
        table: 'user'
    }

    async save(entity: User): Promise<User> {
        const data = await db.one(
            'INSERT INTO $[table~] (username, name, githubId) ' +
            'VALUES($[username], $[name], $[githubId]) ' +
            'RETURNING id, createdAt, updatedAt',
            {...entity, ...this.excInfo}
        )
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: User): Promise<User> {
        entity.updatedAt = new Date()
        await db.none(
            'UPDATE $[table~] ' +
            'SET updatedAt = $[updatedAt], username = $[username], name = $[name], githubId = $[githubId] ' +
            'WHERE id = $[id]', {...entity, ...this.excInfo}
        )
        return entity
    }
}