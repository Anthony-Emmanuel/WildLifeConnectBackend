const tf = require("@tensorflow/tfjs-node");
const jimp = require("jimp");
const path = require("path");

let model = null;
async function loadModel() {
  const modelPath = path.join(__dirname, "../trained_model/model.json");
  model = await tf.loadLayersModel("file://" + modelPath);
  console.log("Model loaded");
  return model;
}

loadModel();

exports.getPrediction = async (req, res) => {
  try {
    const imagePath = req.body.imageUrl;

    const preprocessedInput = await preprocess(imagePath);

    const prediction = model.predict(preprocessedInput);
    const predictionData = prediction.dataSync();

    const predictionIndex = tf.argMax(predictionData).dataSync()[0];
    const animalName = getAnimalName(predictionIndex + 1);

    res.json({ animal: animalName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
};

async function preprocess(imagePath) {
  const image = await jimp.read(imagePath);
  image.normalize().rgba(false);
  const resizedImage = image.resize(180, 180, jimp.RESIZE_BEZIER);

  const bgrData = [];
  for (let i = 0; i < resizedImage.bitmap.data.length; i += 4) {
    bgrData.push(resizedImage.bitmap.data[i + 2] / 255);
    bgrData.push(resizedImage.bitmap.data[i + 1] / 255);
    bgrData.push(resizedImage.bitmap.data[i] / 255);
  }

  const inputTensor = tf.tensor(bgrData, [180, 180, 3], "float32");
  const expandedTensor = inputTensor.expandDims(0);

  return expandedTensor;
}

function getAnimalName(value) {
  const animals = {
    1: "Bat",
    2: "Buffalo",
    3: "Civet",
    4: "Deer",
    5: "Dugong",
    6: "Elephant",
    7: "Goat",
    8: "Leatherback Turtle",
    9: "Leopard",
    10: "Loris",
    11: "Mongoose",
    12: "Otter",
    13: "Pangolin",
    14: "Porcupine",
    15: "Rabbit",
    16: "Sheep",
    17: "Sloth Bear",
    18: "Wild Boar",
  };

  return animals[value] || null;
}
