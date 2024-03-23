const express = require("express");
const router = express.Router();
const Tokens = require("../controllers/tokenController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/saveToken", authenticateToken, Tokens.saveToken);

router.get("/get/:username", Tokens.getUserTokens);

module.exports = router;