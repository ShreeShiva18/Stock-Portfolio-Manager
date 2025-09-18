const db = require("../config/db");

const Bank = {
  getAll: (callback) => {
    const sql = "SELECT * FROM bank_details";
    db.query(sql, callback);
  },

  getById: (accountId, callback) => {
    const sql = "SELECT * FROM bank_details WHERE account_no = ?";
    db.query(sql, [accountId], callback);
  },

  create: (bank, callback) => {
    const sql = `
      INSERT INTO bank_details (user_ID, name, account_no, IFSC_Code, bank_branch)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [bank.user_ID, bank.name, bank.account_no, bank.IFSC_Code, bank.bank_branch],
      callback
    );
  },

  delete: (accountId, callback) => {
    const sql = "DELETE FROM bank_details WHERE account_no = ?";
    db.query(sql, [accountId], callback);
  },
};

module.exports = Bank;
