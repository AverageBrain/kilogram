public class ChatRepository implements BaseRepository<Chat> {
    async save(entity: Chat) {
        return entity
    }

    remove: (entity: Chat) => Promise<Chat>;
    findById: (id: number) => Promise<Chat>;
    findByIds: (ids: number[]) => Promise<Chat[]>;
    findByField: (name: string, value: findValue) => Promise<Chat[]>;
}