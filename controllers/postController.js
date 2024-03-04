const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const Post = require("../models/postSchema");

// Configure AWS S3 with environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Configure multer to use S3 for storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `posts/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

// Middleware to handle single image upload
const singleUpload = upload.single("image");

exports.uploadImageToS3 = (req, res, next) => {
  singleUpload(req, res, function (err) {
    if (err) {
      console.error("Error uploading image:", err); // Log the error for debugging
      return res
        .status(422)
        .json({ message: "Image upload failed", error: err.message });
    }
    if (!req.file) {
      return res
        .status(422)
        .json({ message: "No image file found in the request" });
    }
    // If successful, proceed to the next middleware or function
    next();
  });
};

exports.createPost = async (req, res) => {
  try {
    const { userId, caption } = req.body;
    // Add validation to check if a user with userId exists

    // Confirm that the image has been uploaded and req.file is available
    if (!req.file) {
      return res.status(422).json({ message: "Image not uploaded correctly" });
    }
    const imageUrl = req.file.location; // URL from S3

    const newPost = new Post({
      userId: mongoose.Types.ObjectId(userId), // Ensure that userId is cast to ObjectId
      caption,
      imageUrls: [imageUrl],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};
