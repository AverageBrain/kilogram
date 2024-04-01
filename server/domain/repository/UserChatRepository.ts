import {BaseRepository, FindValue} from "./BaseRepository";
import {UserChat} from "../entity/UserChat";

export class UserChatRepository implements BaseRepository<UserChat> {
    save: (entity: UserChat) => Promise<UserChat>;
    update: (entity: UserChat) => Promise<UserChat>;
    remove: (entity: UserChat) => Promise<UserChat>;
    findById: (id: number) => Promise<UserChat | null>;
    findByIds: (ids: number[]) => Promise<UserChat[]>;
    findByField: (name: string, value: FindValue) => Promise<UserChat[]>;
}