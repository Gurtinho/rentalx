import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const dataConnection = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_BASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    migrations: [
        'src/database/migrations/*.ts'
    ],
    entities: [
        'src/modules/cars/entities/*.ts',
    ],
});