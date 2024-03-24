const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

const {
  registerUser,
  loginUser,
  searchUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/search/:username", searchUser);

router.delete("/deleteByEmail", authenticateToken, deleteUser);

module.exports = router;
