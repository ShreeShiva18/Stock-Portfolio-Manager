const Stock = require("../models/stockModel");

exports.getAllStocks = (req, res) => {
  Stock.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getStockById = (req, res) => {
  const stockId = req.params.id;
  Stock.getById(stockId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
};

exports.createStock = (req, res) => {
  const stock = req.body;
  Stock.create(stock, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Stock added successfully", data: results });
  });
};

exports.deleteStock = (req, res) => {
  const stockId = req.params.id;
  Stock.delete(stockId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Stock deleted successfully" });
  });
};
