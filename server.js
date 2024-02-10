require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Animals = require("./models/animals");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/animals", async (req, res) => {
  try {
    const animals = await Animals.create(req.body);
    res.status(200).json(animals);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}),
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
