import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const dataConnection = new DataSource({
    type: 'postgres',
    host: process.env.DB_DOCKER_HOST,
    port: Number(process.env.DB_DOCKER_PORT),
    database: process.env.DB_BASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    migrations: [
        'src/shared/infra/typeorm/migrations/**/*.{js,ts}'
    ],
    entities: [
        'src/modules/cars/infra/typeorm/entities/**/*.{js,ts}',
        'src/modules/accounts/infra/typeorm/entities/**/*.{js,ts}',
    ],
});