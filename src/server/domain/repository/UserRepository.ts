import {BaseRepository, FindValue} from "./BaseRepository";
import {User} from "../entity/User";
import {db} from "./Pool";

export class UserRepository implements BaseRepository<User> {
    async save(entity: User) {
        const data = await db.one('INSERT INTO user(username, name) VALUES($1, $2) RETURNING id, createdAt, updatedAt', [entity.username, entity.name])
        entity.id = data.id
        entity.createdAt = data.createdAt
        entity.updatedAt = data.updatedAt
        return entity
    }

    async update(entity: User) {
        entity.updatedAt = new Date()
        const data = await db.one('INSERT INTO user(username, name) VALUES($1, $2) RETURNING id, createdAt, updatedAt', [entity.username, entity.name])
    }

    remove: (entity: User) => Promise<User>;
    findById: (id: number) => Promise<User | null>;
    findByIds: (ids: number[]) => Promise<User[]>;
    findByField: (name: string, value: FindValue) => Promise<User[]>;

}