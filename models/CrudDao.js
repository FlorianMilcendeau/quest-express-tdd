const connection = require('../config/connection');

class CrudDao {
  static table;

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${this.table} SET ?`;

      connection.query(sql, [data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static findOne(data) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${this.table} WHERE ?`;

      connection.query(sql, [data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  /* static updateById(id, data) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${this.table} SET ? WHERE id = ?`;

      connection.query(sql, [data, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${this.table} WHERE id = ?`;

      connection.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } */
}

module.exports = CrudDao;
