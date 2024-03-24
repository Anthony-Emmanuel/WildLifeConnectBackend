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

exports.saveNget = async (req, res) => {
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
      const fileKey = `identifiers/${Date.now().toString()}-${req.file.originalname}`;
  
      // Prepare the parameters for the S3 upload
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileKey,
        Body: req.file.buffer,
      };
  
      try {
        // Upload the file to S3
        await s3Client.send(new PutObjectCommand(uploadParams));
        // Update req.file.location to be used in createPost
        req.file.location = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        
        // Send the file location back to the frontend
        return res.status(200).json({ location: req.file.location });
        
      } catch (uploadError) {
        console.error("Error uploading file to S3:", uploadError);
        return res.status(500).json({
          message: "Failed to upload image to S3",
          error: uploadError.message,
        });
      }
    });
  }