const Portfolio = require("../models/portfolioModel");

exports.getAllPortfolios = (req, res) => {
  Portfolio.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id;
  Portfolio.getById(portfolioId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
};

exports.createPortfolio = (req, res) => {
  const portfolio = req.body;
  Portfolio.create(portfolio, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Portfolio added successfully", data: results });
  });
};

exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id;
  Portfolio.delete(portfolioId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Portfolio deleted successfully" });
  });
};
