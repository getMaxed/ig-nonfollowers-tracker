const { Example } = require('../models/Example');
const asyncErrorHandler = require('../middleware/errorAsync');

/*
|--------------------------------------------------------------------------
| GET /example/
|--------------------------------------------------------------------------
*/

exports.getExamples = asyncErrorHandler(async (req, res, next) => {
    const data = await Example.query().select();

    return res.status(200).json({
        success: true,
        data
    });
});
