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
      res.json(animal);
    } else {
      res.status(404).send("Animal not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animals(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
