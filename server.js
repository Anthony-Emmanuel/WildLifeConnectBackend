require("dotenv").config();

const express = require("express");
const animalRoutes = require("./routes/animalRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const { connectDB } = require("./config/db");

const app = express();

app.use(express.json());
app.use("/animals", animalRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);

const port = process.env.PORT || 3000;

// Used connectDB to establish database connection
connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error(
      "Could not start the server due to MongoDB connection error.",
      err
    );
  });
