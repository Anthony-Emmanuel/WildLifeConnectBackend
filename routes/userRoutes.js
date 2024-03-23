const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken"); // Adjust the path as necessary

const {
  registerUser,
  loginUser,
  searchUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/search/:username", searchUser);

router.delete("/:userId", authenticateToken, deleteUser);

module.exports = router;
