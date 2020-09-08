require('dotenv').config();

module.exports = {
    development: {
        client: process.env.DB_ENGINE,
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },
    test: {
        client: process.env.DB_ENGINE,
        connection: {
            host: process.env.TEST_DB_HOST,
            database: process.env.TEST_DB_NAME,
            user: process.env.TEST_DB_USER,
            password: process.env.TEST_DB_PASS
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    }
};
