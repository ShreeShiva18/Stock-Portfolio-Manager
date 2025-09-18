const db = require("../config/db");

const Transaction = {
  getAll: (callback) => {
    const sql = "SELECT * FROM transactions";
    db.query(sql, callback);
  },

  getById: (transactionId, callback) => {
    const sql = "SELECT * FROM transactions WHERE UTR = ?";
    db.query(sql, [transactionId], callback);
  },

  create: (transaction, callback) => {
    const sql = `
      INSERT INTO transactions (portfolio_id, stock_id, buying_price, selling_price, quantity, amount, DATE, account_no, UTR)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        transaction.portfolio_id,
        transaction.stock_id,
        transaction.buying_price,
        transaction.selling_price,
        transaction.quantity,
        transaction.amount,
        transaction.DATE,
        transaction.account_no,
        transaction.UTR,
      ],
      callback
    );
  },

  delete: (transactionId, callback) => {
    const sql = "DELETE FROM transactions WHERE UTR = ?";
    db.query(sql, [transactionId], callback);
  },
};

module.exports = Transaction;
