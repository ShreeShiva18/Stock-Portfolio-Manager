const Transaction = require("../models/transactionModel");

exports.getAllTransactions = (req, res) => {
  Transaction.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getTransactionById = (req, res) => {
  const transactionId = req.params.id;
  Transaction.getById(transactionId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
};

exports.createTransaction = (req, res) => {
  const transaction = req.body;
  Transaction.create(transaction, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Transaction added successfully", data: results });
  });
};

exports.deleteTransaction = (req, res) => {
  const transactionId = req.params.id;
  Transaction.delete(transactionId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Transaction deleted successfully" });
  });
};
