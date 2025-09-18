const express = require("express");
const {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const router = express.Router();

router.get("/", getAllPortfolios);
router.get("/:id", getPortfolioById);
router.post("/", createPortfolio);
router.delete("/:id", deletePortfolio);

module.exports = router;
