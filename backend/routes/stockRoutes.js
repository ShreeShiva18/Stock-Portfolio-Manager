const express = require("express");
const {
  getAllStocks,
  getStockById,
  createStock,
  deleteStock,
} = require("../controllers/stockController");

const router = express.Router();

router.get("/", getAllStocks);
router.get("/:id", getStockById);
router.post("/", createStock);
router.delete("/:id", deleteStock);

module.exports = router;
