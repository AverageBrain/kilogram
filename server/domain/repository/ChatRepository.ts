import {BaseRepository, FindValue} from "./BaseRepository";
import {Chat} from "../entity/Chat";
import {db} from "./Pool";

export class ChatRepository implements BaseRepository<Chat> {
    async save (entity: Chat) {

    }
    update: (entity: Chat) => Promise<Chat>;
    remove: (entity: Chat) => Promise<Chat>;
    findById: (id: number) => Promise<Chat | null>;
    findByIds: (ids: number[]) => Promise<Chat[]>;
    findByField: (name: string, value: FindValue) => Promise<Chat[]>;
    findByFieldFirst: (name: string, value: FindValue) => Promise<Chat | null>;
}