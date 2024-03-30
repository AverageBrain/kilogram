type findValue = number | string

public interface BaseRepository<E> {
    save: (entity: E) => Promise<E>
    remove: (entity: E) => Promise<E>
    findById: (id: number) => Promise<E | null>
    findByIds: (ids: number[]) => Promise<E[]>
    findByField: (name: string, value: findValue) => Promise<E[]>
}
