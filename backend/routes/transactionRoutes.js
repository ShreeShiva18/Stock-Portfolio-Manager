const express = require("express");
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
