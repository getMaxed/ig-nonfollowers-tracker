const errorHandler = require('../middleware/error');
const example = require('./example');

module.exports = app => {
    app.use('/api/v1/example', example).use(errorHandler);
};
