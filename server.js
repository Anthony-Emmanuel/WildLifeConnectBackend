require("dotenv").config(); // Add this line at the top of your file

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use environment variable for MongoDB URI
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
