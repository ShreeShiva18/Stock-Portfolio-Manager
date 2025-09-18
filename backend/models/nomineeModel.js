const db = require("../config/db");

const Nominee = {
  getAll: (callback) => {
    const sql = "SELECT * FROM nominee_details";
    db.query(sql, callback);
  },

  getById: (nomineeId, callback) => {
    const sql = "SELECT * FROM nominee_details WHERE nominee_user_ID = ?";
    db.query(sql, [nomineeId], callback);
  },

  create: (nominee, callback) => {
    const sql = `
      INSERT INTO nominee_details (user_ID, Nominee_name, relationship, nominee_user_ID, address, phone_no)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [nominee.user_ID, nominee.Nominee_name, nominee.relationship, nominee.nominee_user_ID, nominee.address, nominee.phone_no],
      callback
    );
  },

  delete: (nomineeId, callback) => {
    const sql = "DELETE FROM nominee_details WHERE nominee_user_ID = ?";
    db.query(sql, [nomineeId], callback);
  },
};

module.exports = Nominee;
