const CrudDao = require('./CrudDao');

class Book extends CrudDao {
  static table = 'bookmark';
}

module.exports = Book;
