const express = require("express");
const {
  getAllBanks,
  getBankById,
  createBank,
  deleteBank,
} = require("../controllers/bankController");

const router = express.Router();

router.get("/", getAllBanks);
router.get("/:id", getBankById);
router.post("/", createBank);
router.delete("/:id", deleteBank);

module.exports = router;
