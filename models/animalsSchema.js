const mongoose = require("mongoose");

// Utility for common field definition
const requiredString = { type: String, required: true };
const optionalString = { type: String, required: false };

const taxonomySchema = new mongoose.Schema({
  kingdom: optionalString,
  scientific_name: requiredString,
});

const characteristicsSchema = new mongoose.Schema({
  prey: optionalString,
  average_litter_size: optionalString,
  habitat: optionalString,
  predators: optionalString,
  diet: optionalString,
  type: optionalString,
  color: optionalString,
  skin_type: optionalString,
  top_speed: optionalString,
  lifespan: optionalString,
});

const animalSchema = new mongoose.Schema(
  {
    conservation_status: requiredString,
    name: requiredString,
    taxonomy: taxonomySchema,
    locations: { type: [String], required: true },
    characteristics: characteristicsSchema,
    imageUrl: optionalString,
  },
  {
    timestamps: true,
  }
);

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
