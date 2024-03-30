import pgPromise, {IDatabase, IMain} from 'pg-promise';

const pgp: IMain = pgPromise()

const connection: any = {
    host: '158.160.118.181',
    port: 5432,
    database: 'kilogram',
    user: 'kilogram',
    password: "kilogram"
}
export const db: IDatabase<any> = pgp(connection)