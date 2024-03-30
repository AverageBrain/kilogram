import pgPromise, {IDatabase, IMain} from 'pg-promise';

const pgp: IMain = pgPromise()

const connection: any = {
    host: 'localhost',
    port: 5432,
    database: 'killogram',
    user: 'killogram',
    password: "killogram"
}
export const db: IDatabase<any> = pgp(connection)