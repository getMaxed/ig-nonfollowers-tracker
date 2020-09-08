const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (process.env.NODE_ENV !== 'test') {
        console.log(err.stack ? err.stack.red : err);
        console.log('********************************');
        err.message && console.log(err.message.underline.brightMagenta.bold);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: (error.statusCode && error.message) || 'Server Error'
    });
};

module.exports = errorHandler;
