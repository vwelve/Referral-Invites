import mysql from 'mysql2/promise';
import config from './config';

export default async (query: string, params?: Array<string | number | undefined>) => {
    const connection = await mysql.createConnection(config.db);
    const [ results ] = await connection.execute(query, params);

    return results;
}