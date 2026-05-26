const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadContract");

const {
  createContract,
  getContracts
} = require("../controllers/contractController");

router.post(
  "/create",

  upload.fields([
    { name: "frontIdImage", maxCount: 1 },
    { name: "backIdImage", maxCount: 1 },
    { name: "signatureImage", maxCount: 1 }
  ]),

  createContract
);

router.get("/all", getContracts);

module.exports = router;