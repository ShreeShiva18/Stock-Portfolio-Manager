const db = require("../config/db");

const Company = {
  getAll: (callback) => {
    const sql = "SELECT * FROM company";
    db.query(sql, callback);
  },

  getById: (companyId, callback) => {
    const sql = "SELECT * FROM company WHERE stock_id = ?";
    db.query(sql, [companyId], callback);
  },

  create: (company, callback) => {
    const sql = `
      INSERT INTO company (stock_id, Company_name, company_id, established_on, date_of_issue, issue_size_in_CR)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        company.stock_id,
        company.Company_name,
        company.company_id,
        company.established_on,
        company.date_of_issue,
        company.issue_size_in_CR,
      ],
      callback
    );
  },

  delete: (companyId, callback) => {
    const sql = "DELETE FROM company WHERE stock_id = ?";
    db.query(sql, [companyId], callback);
  },
};

module.exports = Company;
