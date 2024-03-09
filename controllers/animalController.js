const Animals = require("../models/animalsSchema");

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animals.find();
    res.json(animals);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAnimalByName = async (req, res) => {
  try {
    const animalName = req.params.name;
    const animal = await Animals.findOne({ name: animalName });
    if (animal) {
      print("it works");
      res.json(animal);
    } else {
      res.status(404).send("Animal not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createAnimals = async (req, res) => {
  try {
    if (!req.body || (Array.isArray(req.body) && req.body.length === 0)) {
      return res.status(400).json({ message: 'No data provided.' });
    }

    const animalsData = Array.isArray(req.body) ? req.body : [req.body];
    console.log("Data to insert:", animalsData); // Debugging line

    const createdAnimals = await Animals.insertMany(animalsData);
    res.status(201).json(createdAnimals);
  } catch (error) {
    console.error("Error inserting animals:", error.message); // More detailed logging
    res.status(500).json({ message: error.message });
  }
};