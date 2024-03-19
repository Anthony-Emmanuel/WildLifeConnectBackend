const express = require("express");
const router = express.Router();
const {saveToken} = require("../controllers/tokenController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/saveToken", authenticateToken, saveToken);

module.exports = router;