import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'GitHub Clone',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => `user-${req.userId}-avatar`, // Unique filename per user
  },
});

export { cloudinary, storage };