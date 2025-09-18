const Bank = require("../models/bankModel");

exports.getAllBanks = (req, res) => {
  Bank.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getBankById = (req, res) => {
  const accountId = req.params.id;
  Bank.getById(accountId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
};

exports.createBank = (req, res) => {
  const bank = req.body;
  Bank.create(bank, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Bank added successfully", data: results });
  });
};

exports.deleteBank = (req, res) => {
  const accountId = req.params.id;
  Bank.delete(accountId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Bank deleted successfully" });
  });
};
