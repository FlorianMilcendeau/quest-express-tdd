const router = require('express').Router();

const POST = require('./POST');
const GET = require('./GET');

router.use('/', POST);
router.use('/', GET);

module.exports = router;
