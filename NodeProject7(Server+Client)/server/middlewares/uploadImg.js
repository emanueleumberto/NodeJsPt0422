// Upload Foto
const { models } = require('mongoose');
const multer  = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Upload File nel Cloud tramite multer cloudinary
// Configuration 
cloudinary.config({
    cloud_name: process.env.APP_CLOUD_NAME,
    api_key: process.env.APP_API_KEY,
    api_secret: process.env.APP_API_SECRET
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads/',
      //format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => file.originalname,
    },
  });
   
  const upload = multer({ storage: storage });
  // Fine Upload File nel Cloud tramite multer cloudinary

// Export 
module.exports = upload;