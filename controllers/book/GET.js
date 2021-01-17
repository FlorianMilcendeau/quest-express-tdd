const router = require('express').Router();

const Book = require('../../models/book');

router.get('/bookmarks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Book.findOne({ id });

    if (!result) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      sqlMessage: error.sqlMessage,
      sql: error.sql,
    });
  }
});

module.exports = router;
