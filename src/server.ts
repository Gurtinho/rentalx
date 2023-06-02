import express from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import { dataConnection } from '@src/database/data-source';
import { router } from 'routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

async function server() {
    await dataConnection.initialize().catch((err) => {
        throw new Error(`database connection error: ${err}`);
    });
    console.log('Database connected ⚡');
    app.listen(3333, () => {
        console.log('running server 🔥');
    });
}
server();