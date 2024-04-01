import {BaseEntity} from "../entity/BaseEntity";
import {db} from "./Pool";

export type FindValue = number | string

export abstract class BaseRepository<E extends BaseEntity> {
    protected abstract excInfo: {
        table: string
    }

    abstract save(entity: E): Promise<E>
    abstract update(entity: E): Promise<E>
    async remove(entity: E): Promise<E> {
        await db.none(
            'DELETE FROM $[table~] WHERE id = $[id]',
            {...entity, ...this.excInfo}
        )
        return entity
    }
    async findById(id: number): Promise<E | null> {
        return await db.oneOrNone<E>('SELECT * FROM $[table~] where id = $[id]', {
            id: id,
            ...this.excInfo
        })
    }
    async findByIds(ids: number[]): Promise<E[]> {
        return await db.manyOrNone<E>('SELECT * FROM $[table~] where id in $[ids]', {
            ids: ids,
            ...this.excInfo
        })
    }
    async findByField(name: string, value: FindValue): Promise<E[]> {
        return await db.manyOrNone<E>('SELECT * FROM $[table~] where $[column~] = $[value]', {
            column: name,
            value: value,
            ...this.excInfo
        })
    }
    async findByFieldFirst(name: string, value: FindValue): Promise<E | null> {
        return await db.oneOrNone<E>('SELECT * FROM $[table~] where $[column~] = $[value] LIMIT 1', {
            column: name,
            value: value,
            ...this.excInfo
        })
    }
}
