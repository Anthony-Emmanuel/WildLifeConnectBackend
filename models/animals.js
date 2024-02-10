const mongoose = require("mongoose");

// Utility for common field definition
const requiredString = { type: String, required: true };
const optionalString = { type: String, required: false };
const requiredNumber = { type: Number, required: true };
const optionalNumber = { type: Number, required: false };

// Updated to include taxonomy and adjust for other fields in your data
const taxonomySchema = new mongoose.Schema({
  kingdom: optionalString,
  phylum: optionalString,
  class: optionalString,
  order: optionalString,
  family: optionalString,
  genus: optionalString,
  scientific_name: optionalString,
});

const characteristicsSchema = new mongoose.Schema({
  prey: optionalString,
  main_prey: optionalString, // added to accommodate different naming
  name_of_young: optionalString,
  group_behavior: optionalString,
  estimated_population_size: optionalString,
  biggest_threat: optionalString,
  most_distinctive_feature: optionalString,
  distinctive_feature: optionalString, // added for the same reason
  other_name: optionalString,
  gestation_period: optionalString,
  litter_size: optionalString,
  average_litter_size: optionalString, // added for consistency
  habitat: optionalString,
  predators: optionalString,
  diet: optionalString,
  type: optionalString,
  common_name: optionalString,
  number_of_species: optionalString,
  location: optionalString,
  group: optionalString,
  color: optionalString,
  skin_type: optionalString,
  top_speed: optionalString,
  lifespan: optionalString,
  weight: optionalString,
  length: optionalString,
  height: optionalString, // added since some entries have height
  age_of_sexual_maturity: optionalString,
  age_of_weaning: optionalString,
  water_type: optionalString, // added for aquatic animals
  optimum_ph_level: optionalString, // specific to aquatic environments
  favorite_food: optionalString, // added to accommodate 'favorite_food'
  slogan: optionalString, // added for 'slogan'
  nesting_location: optionalString, // specific to nesting animals
  temperament: optionalString, // for behavior description
});

const animalSchema = new mongoose.Schema(
  {
    conservation_status: requiredString,
    name: requiredString,
    taxonomy: taxonomySchema, // embedded taxonomy schema
    locations: { type: [String], required: true },
    characteristics: characteristicsSchema, // updated characteristics schema
    imageUrl: optionalString,
  },
  {
    timestamps: true,
  }
);

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
