const express = require('express');
const next = require('next');
const { join } = require('path');
const bodyParser = require('body-parser'); // Add body-parser middleware
const tetrisSubmitScore = require('./pages/api/tetrisSubmitScore');
const getScores = require('./pages/api/getScores');
const train = require('./pages/api/train'); 
const cors = require('cors'); // Cross-Origin requests


app.use(cors()); // Use CORS middleware

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
    server.use('/api/train', train);

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(process.env.PORT || 3000, (err) => {
        if (err) throw err;
        console.log(`> Server listening on port ${process.env.PORT || 3000}`);
        console.log('> Ready on http://localhost:3000');
    });

});
