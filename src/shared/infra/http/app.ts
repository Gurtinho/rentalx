import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import '@shared/container';
import { dataConnection } from '@src/shared/infra/typeorm/data-source';
import { router } from '@shared/infra/http/routes';
import swaggerFile from '@src/swagger.json';
import { AppError } from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: 'Error',
        message: `Internal Server Error: ${err.message}`
    })
});

const database = async () => {
    if (process.env.NODE_ENV != 'test') {
        await dataConnection.initialize().catch((err) => {
            throw new Error(`database connection error: ${err}`);
        }).then(() => {
            console.log('Database connected ⚡');
        })
    }
}
database()

export { app }