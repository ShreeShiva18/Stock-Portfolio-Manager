const db = require("../config/db");

const Portfolio = {
  getAll: (callback) => {
    const sql = "SELECT * FROM portfolio";
    db.query(sql, callback);
  },

  getById: (portfolioId, callback) => {
    const sql = "SELECT * FROM portfolio WHERE user_ID = ?";
    db.query(sql, [portfolioId], callback);
  },

  create: (portfolio, callback) => {
    const sql = `
      INSERT INTO portfolio (user_ID, Demat_acc_no, current_holdings, total_investment, total_returns, PnL_in_percentage)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        portfolio.user_ID,
        portfolio.Demat_acc_no,
        portfolio.current_holdings,
        portfolio.total_investment,
        portfolio.total_returns,
        portfolio.PnL_in_percentage,
      ],
      callback
    );
  },

  delete: (portfolioId, callback) => {
    const sql = "DELETE FROM portfolio WHERE user_ID = ?";
    db.query(sql, [portfolioId], callback);
  },
};

module.exports = Portfolio;
