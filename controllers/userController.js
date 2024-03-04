const User = require("../models/userSchema");

exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
