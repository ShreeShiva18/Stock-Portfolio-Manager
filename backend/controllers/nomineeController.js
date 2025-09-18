const Nominee = require("../models/nomineeModel");

exports.getAllNominees = (req, res) => {
  Nominee.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getNomineeById = (req, res) => {
  const nomineeId = req.params.id;
  Nominee.getById(nomineeId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
};

exports.createNominee = (req, res) => {
  const nominee = req.body;
  Nominee.create(nominee, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Nominee added successfully", data: results });
  });
};

exports.deleteNominee = (req, res) => {
  const nomineeId = req.params.id;
  Nominee.delete(nomineeId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Nominee deleted successfully" });
  });
};
