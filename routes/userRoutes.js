const express = require("express");
const router = express.Router();
const { registerUser, loginUser, searchUser } = require("../controllers/userController");

// Match the POST request to /users/register to the registerUser controller method
router.post("/register", registerUser);

// Match the POST request to /users/login to the loginUser controller method
router.post("/login", loginUser);

router.get("/search/:username", searchUser);

module.exports = router;
