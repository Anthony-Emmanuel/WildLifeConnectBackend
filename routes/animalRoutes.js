const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");

router.get("/", animalController.getAllAnimals);
router.get("/names/:name", animalController.getAnimalByName);
router.post("/", animalController.createAnimal);

module.exports = router;
