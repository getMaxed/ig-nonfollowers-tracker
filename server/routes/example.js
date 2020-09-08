const router = require('express').Router();
const { getExamples } = require('../controllers/example');

router.route('/').get(getExamples);

module.exports = router;
