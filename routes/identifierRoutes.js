const express = require("express");
const router = express.Router();
const identifier = require("../controllers/identifierController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/saveNget", authenticateToken, identifier.saveNget);

module.exports = router;