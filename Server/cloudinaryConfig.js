const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dqfva5mma',
  api_key: '697867121638287',
  api_secret: 'DLbZoVEal6d7sVQxSKen-kx9_VA',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ESTG_uploads', 
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf','txt'],
  },
});

module.exports = {
  cloudinary,
  storage,
};
