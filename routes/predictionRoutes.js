const express = require("express");
const router = express.Router();
const { getPrediction } = require("../controllers/predictionController");

router.post("/getPrediction", getPrediction);

module.exports = router;