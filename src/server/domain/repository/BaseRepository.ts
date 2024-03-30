import {BaseEntity} from "../entity/BaseEntity";

type findValue = number | string

export interface BaseRepository<E extends BaseEntity> {
    save: (entity: E) => Promise<E>
    update: (entity: E) => Promise<E>
    remove: (entity: E) => Promise<E>
    findById: (id: number) => Promise<E | null>
    findByIds: (ids: number[]) => Promise<E[]>
    findByField: (name: string, value: findValue) => Promise<E[]>
}
