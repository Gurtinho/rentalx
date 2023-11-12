import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const node_env = process.env.NODE_ENV == 'test'
const host = node_env ? 'localhost' : process.env.DB_DOCKER_HOST
const port = node_env ? 5433 : Number(process.env.DB_DOCKER_PORT)
const database = node_env ? 'rentalx_test' : process.env.DB_BASE

export const dataConnection = new DataSource({
    type: 'postgres',
    host,
    port, 
    database,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    migrations: [
        'src/shared/infra/typeorm/migrations/**/*.{js,ts}'
    ],
    entities: [
        'src/modules/cars/infra/typeorm/entities/**/*.{js,ts}',
        'src/modules/accounts/infra/typeorm/entities/**/*.{js,ts}',
        'src/modules/rentals/infra/typeorm/entities/**/*.{js,ts}'
    ],
})