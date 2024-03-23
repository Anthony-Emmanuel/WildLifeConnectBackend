const bcrypt = require("bcryptjs"); // Changed to bcryptjs
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.registerUser = async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;
  try {
    // Now using bcryptjs's hash function
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error);
      res.status(409).json({ message: "Username or email already exists." });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred. Please try again later." });
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Consolidate the response here
      res.json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.searchUser = async (req, res) => {
  const { username } = req.params;
  try {
    const query = req.query.query;
    const regex = new RegExp(query, "i");

    const searchResults = await User.find({
      $or: [{ username: regex }, { email: regex }],
    });
    res.json(searchResults);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "An error occurred while searching users" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    //Verifying that the user deleting the account is the account owner.
    if (req.user.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this account" });
    }
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Account deletion error:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
