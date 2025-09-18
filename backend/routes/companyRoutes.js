const express = require("express");
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  deleteCompany,
} = require("../controllers/companyController");

const router = express.Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/", createCompany);
router.delete("/:id", deleteCompany);

module.exports = router;
