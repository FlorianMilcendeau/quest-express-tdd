const router = require('express').Router();

const Book = require('../../models/book');

router.post('/bookmarks', async (req, res) => {
  const { ...book } = req.body;

  if (!Object.keys(book).length) {
    return res.status(422).json({ error: 'required field(s) missing' });
  }

  try {
    const result = await Book.create(book);

    const { insertId: id } = result;

    const currentBook = await Book.findOne(id);

    return res.status(201).json(currentBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      sqlMessage: error.sqlMessage,
      sql: error.sql,
    });
  }
});

module.exports = router;
