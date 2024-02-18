require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Animals = require("./models/animalsSchema");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// API endpoint to get all animals
app.get("/animals", async (req, res) => {
  try {
    const animals = await Animals.find(); // Use 'Animals', matching your import
    res.json(animals);
  } catch (error) {
    res.status(500).send(error);
  }
});

//getting animal by name
app.get("/animals/names/:name", async (req, res) => {
  try {
    const animalName = req.params.name;
    const animal = await Animals.findOne({ name: animalName }); // Assuming 'name' is the field in your schema
    if (animal) {
      res.json(animal);
    } else {
      res.status(404).send("Animal not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/animals", async (req, res) => {
  try {
    console.log(req.body);

    const animals = await Animals.insertMany(req.body);

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
