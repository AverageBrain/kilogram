import {BaseRepository} from "./BaseRepository";
import {Chat} from "../entity/Chat";
import {db} from "./Pool";

export class ChatRepository implements BaseRepository<Chat> {
    async save(entity: Chat) {
        const data = await db.one('INSERT INTO users(name, active) VALUES($1, $2) RETURNING id', ['John', true])
        entity.id = data.id
        return entity
    }

    remove: (entity: Chat) => Promise<Chat>;
    findById: (id: number) => Promise<Chat>;
    findByIds: (ids: number[]) => Promise<Chat[]>;
    findByField: (name: string, value: findValue) => Promise<Chat[]>;
}