const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    habitat: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    conservationStatus: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
