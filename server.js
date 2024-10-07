const express = require('express');
const next = require('next');
const { join } = require('path');
const bodyParser = require('body-parser'); // Add body-parser middleware
const tetrisSubmitScore = require('./src/api/tetrisSubmitScore');
const getScores = require('./src/api/getScores');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Add body-parser middleware to parse JSON
    server.use(bodyParser.json());

    // Use the API routes
    server.use('/api/tetrisSubmitScore', tetrisSubmitScore);
    server.use('/api/getScores', getScores);

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
