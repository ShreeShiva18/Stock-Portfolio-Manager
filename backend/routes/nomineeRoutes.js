const express = require("express");
const {
  getAllNominees,
  getNomineeById,
  createNominee,
  deleteNominee,
} = require("../controllers/nomineeController");

const router = express.Router();

router.get("/", getAllNominees);
router.get("/:id", getNomineeById);
router.post("/", createNominee);
router.delete("/:id", deleteNominee);

module.exports = router;
