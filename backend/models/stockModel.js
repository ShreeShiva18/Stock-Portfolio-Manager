const db = require("../config/db");

const Stock = {
  getAll: (callback) => {
    const sql = "SELECT * FROM stocks_info";
    db.query(sql, callback);
  },

  getById: (stockId, callback) => {
    const sql = "SELECT * FROM stocks_info WHERE stock_id = ?";
    db.query(sql, [stockId], callback);
  },

  create: (stock, callback) => {
    const sql = `
      INSERT INTO stocks_info (portfolio_id, stock, stock_id, current_market_price, invested_amount, current_value, no_of_shares, returns)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        stock.portfolio_id,
        stock.stock,
        stock.stock_id,
        stock.current_market_price,
        stock.invested_amount,
        stock.current_value,
        stock.no_of_shares,
        stock.returns,
      ],
      callback
    );
  },

  delete: (stockId, callback) => {
    const sql = "DELETE FROM stocks_info WHERE stock_id = ?";
    db.query(sql, [stockId], callback);
  },
};

module.exports = Stock;
