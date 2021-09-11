const express = require('express');
const { Model } = require('objection');
const dotenv = require('dotenv');
const logger = require('morgan');
const registerApi = require('./routes');
const cors = require('cors');
const Knex = require('knex');
const knexConfig = require('./knexfile');
require('colors');
// require('./parser');

dotenv.config();
// Model.knex(Knex(knexConfig[process.env.NODE_ENV]));

const app = express().use(express.json({ extended: false }));

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

registerApi(app);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    const server = app.listen(
        PORT,
        console.log(`Server running on port ${PORT} `.blue.bold)
    );

    process.on('unhandledRejection', err => {
        console.log(`Error: ${err.message}`.red.bold);
        server.close(() => process.exit(1));
    });
}

module.exports = app;
