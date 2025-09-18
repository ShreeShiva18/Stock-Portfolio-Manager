const express = require("express");
const {
  getAllInvestors,
  getInvestorById,
  createInvestor,
  deleteInvestor,
} = require("../controllers/investorController");

const router = express.Router();

router.get("/", getAllInvestors);
router.get("/:id", getInvestorById);
router.post("/", createInvestor);
router.delete("/:id", deleteInvestor);

module.exports = router;
