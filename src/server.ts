import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import './shared/container';
import 'express-async-errors';
import { dataConnection } from './database/data-source';
import { router } from './routes';
import swaggerFile from './swagger.json';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction): Response => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error' + err.message
    });
});

dataConnection.initialize().then(() => {
    console.log('Database connected ⚡');
    app.listen(3333, () => {
        console.log('running server 🔥');
    });
}).catch((err) => {
    throw new AppError(`database connection error: ${err}`, 400);
});