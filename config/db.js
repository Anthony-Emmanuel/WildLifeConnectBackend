require("dotenv").config();
const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Database connection failed. Exiting now...", err);
    process.exit(1);
  }
};
