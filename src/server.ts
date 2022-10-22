import express from 'express';
const app = express();

app.get('/', (request, response) => {
    return response.status(201).json({ name: 'gustavo' });
});

app.listen(3333, () => console.log('server is running'));