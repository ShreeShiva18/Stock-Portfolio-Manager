const Company = require("../models/companyModel");

exports.getAllCompanies = (req, res) => {
  Company.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getCompanyById = (req, res) => {
  const companyId = req.params.id;
  Company.getById(companyId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
};

exports.createCompany = (req, res) => {
  const company = req.body;
  Company.create(company, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Company added successfully", data: results });
  });
};

exports.deleteCompany = (req, res) => {
  const companyId = req.params.id;
  Company.delete(companyId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Company deleted successfully" });
  });
};
