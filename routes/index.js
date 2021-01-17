const router = require('express').Router();
const book = require('../controllers/book/');

router.use('/', book);
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

module.exports = router;
