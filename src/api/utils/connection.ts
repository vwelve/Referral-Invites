import mysql, { RowDataPacket } from 'mysql2/promise';
import config from './config';

export default {
    execute: async (query: string, params?: Array<string | number | undefined>) => {
        const connection = await mysql.createConnection(config.db);
        const [ results ] = await connection.execute(query, params);
        await connection.end();

        return results;
    },
    query: async (query: string, params?: Array<string | number | undefined>) => {
        const connection = await mysql.createConnection(config.db);
        const [ results ] = await connection.query<RowDataPacket[]>(query, params);
        await connection.end();

        return results;
    }
}