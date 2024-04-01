import {BaseRepository, FindValue} from "./BaseRepository";
import {Message} from "../entity/Message";

export class MessageRepository implements BaseRepository<Message> {
    save: (entity: Message) => Promise<Message>;
    update: (entity: Message) => Promise<Message>;
    remove: (entity: Message) => Promise<Message>;
    findById: (id?: number) => Promise<Message | null>;
    findByIds: (ids: number[]) => Promise<Message[]>;
    findByField: (name: string, value: FindValue) => Promise<Message[]>;
}