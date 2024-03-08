const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const User = require("../models/userSchema");

// Initialize the S3 client with AWS v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const singleUpload = upload.single("image");

exports.uploadImageToS3 = (req, res, next) => {
  singleUpload(req, res, async function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return res
        .status(422)
        .json({ message: "Image upload failed", error: err.message });
    }
    if (!req.file) {
      return res
        .status(422)
        .json({ message: "No image file found in the request" });
    }

    // Construct the S3 file key
    const fileKey = `posts/${Date.now().toString()}-${req.file.originalname}`;

    // Prepare the parameters for the S3 upload
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
      Body: req.file.buffer,
      // ACL: "public-read",
    };

    try {
      // Upload the file to S3
      await s3Client.send(new PutObjectCommand(uploadParams));
      // Update req.file.location to be used in createPost
      req.file.location = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
      next(); // Proceed to next middleware
    } catch (uploadError) {
      console.error("Error uploading file to S3:", uploadError);
      return res.status(500).json({
        message: "Failed to upload image to S3",
        error: uploadError.message,
      });
    }
  });
};
exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(422).json({ message: "Image not uploaded correctly" });
    }

    const imageUrl = req.file.location; // URL from S3

    // Assuming req.user.userId contains the ID of the logged-in user
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push the new post into the user's posts array
    user.posts.push({ imageUrl, caption });
    await user.save();

    res
      .status(201)
      .json({
        message: "Post created successfully",
        post: { imageUrl, caption },
      });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: error.message });
  }
};
