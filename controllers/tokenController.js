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

exports.saveToken = async (req, res) => {
  singleUpload(req, res, async function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return res
        .status(422)
        .json({ message: "Image upload failed", error: err.message });
    }
    if (!req.body.imageUrl) {
      return res
        .status(422)
        .json({ message: "No image file found in the request" });
    }

    // Construct the S3 file key
    const fileKey = `tokens/${Date.now().toString()}-${req.body.imageUrl.originalname}`;

    // Prepare the parameters for the S3 upload
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
      Body: req.body.imageUrl.buffer,
      // ACL: "public-read",
    };

    try {
      // Upload the file to S3
      await s3Client.send(new PutObjectCommand(uploadParams));
      // Update req.file.location to be used in createPost
      req.body.imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
      try {
        // Assuming the user is authenticated and you have the user ID
        const userId = req.user.userId; // Replace with actual user ID
    
        // Create a new token object
        const newToken = {
          imageUrl: req.body.imageUrl,
          animalName: req.body.animalName,
          rarity: req.body.rarity,
        };
    
        // Find the user and push the new token to the tokens array
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.tokens.push(newToken);
        await user.save();
    
        res.status(200).json({ message: 'Token saved successfully' });
      } catch (error) {
          console.error('Error saving token:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
    } catch (uploadError) {
      console.error("Error uploading file to S3:", uploadError);
      return res.status(500).json({
        message: "Failed to upload image to S3",
        error: uploadError.message,
      });
    }
  });
}