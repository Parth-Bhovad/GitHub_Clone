require("dotenv").config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

console.log(process.env.CLOUD_API_KEY);
console.log(process.env.CLOUD_NAME);
console.log(process.env.CLOUD_API_SECRET);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'GitHub Clone',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => `user-${req.userId}-avatar`, // Unique filename per user
    },
  });

  module.exports = {
    cloudinary,
    storage
  }