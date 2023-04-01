import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import swaggerFile from './swagger.json';
import { dataConnection } from './database/data-source';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

dataConnection.initialize().then(() => {
    console.log('Database connected ⚡');
    app.listen(3333, () => {
        console.log('running server 🔥');
    });
}).catch((err) => {
    console.log(`database connection error: ${err}`);
});