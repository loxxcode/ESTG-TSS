const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

cloudinary.config({
  cloud_name: 'dqfva5mma',
  api_key: '697867121638287',
  api_secret: 'DLbZoVEal6d7sVQxSKen-kx9_VA',
});



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname); // e.g., ".pdf"
    const filenameWithoutExt = path.basename(file.originalname, ext); // "report"

    let resourceType = 'image';
    if (['.pdf', '.txt', '.docx'].includes(ext.toLowerCase())) {
      resourceType = 'raw';
    }

    return {
      folder: 'ESTG_uploads',
      allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'txt', 'docx'],
      resource_type: resourceType,
      public_id: filenameWithoutExt, // Set the file name
      use_filename: true, // Optional, reinforces filename use
      unique_filename: false, // Avoid Cloudinary adding random string
    };
  },
});
module.exports = {
  cloudinary,
  storage,
};
