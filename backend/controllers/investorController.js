const Investor = require("../models/investorModel");

exports.getAllInvestors = (req, res) => {
  Investor.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getInvestorById = (req, res) => {
  const investorId = req.params.id;
  Investor.getById(investorId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
};

exports.createInvestor = (req, res) => {
  const investor = req.body;
  Investor.create(investor, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Investor added successfully", data: results });
  });
};

exports.deleteInvestor = (req, res) => {
  const investorId = req.params.id;
  Investor.delete(investorId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Investor deleted successfully" });
  });
};
