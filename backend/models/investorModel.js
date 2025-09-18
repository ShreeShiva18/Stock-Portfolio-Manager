const db = require("../config/db");

const Investor = {
  getAll: (callback) => {
    const sql = "SELECT * FROM investor";
    db.query(sql, callback);
  },

  getById: (investorId, callback) => {
    const sql = "SELECT * FROM investor WHERE user_ID = ?";
    db.query(sql, [investorId], callback);
  },

  create: (investor, callback) => {
    const sql = `
      INSERT INTO investor (Name, Demat_acc_no, DOB, Phone_no, address, gender)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [investor.Name, investor.Demat_acc_no, investor.DOB, investor.Phone_no, investor.address, investor.gender],
      callback
    );
  },

  delete: (investorId, callback) => {
    const sql = "DELETE FROM investor WHERE user_ID = ?";
    db.query(sql, [investorId], callback);
  },
};

module.exports = Investor;
