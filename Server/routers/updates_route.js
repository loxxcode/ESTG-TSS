const express = require('express');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinaryConfig');
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};
const upload = multer({ storage, fileFilter });
const router = express.Router();
const updates_model = require('../models/updates_schema');
const middleware = require("../middleware/AuthMiddleware");
const Account = require("../models/account_schema");
const mongoose = require("mongoose");

// GET all updates news for content creator
router.get('/all_updates', async (req, res) => {
  try {
    const data = await updates_model.find().populate("author");
    return res.status(200).json({ message: 'success', data });
  } catch (err) {
    return res.status(500).json({ message: 'Failed', err });
  }
});

// GET all updates news for admin or content creator
router.get('/updates', middleware.ensureAuthenticated, async (req, res) => {
  try {
    const user = await Account.findById(req.session.Userid);
    let data;

    if (user.role === 'Admin') {
      data = await updates_model.find().populate("author");
    } else if (user.role === 'Content_creator') {
      data = await updates_model.find({ author: user._id }).populate("author");
    }

    return res.status(200).json({ message: 'success', data });
  } catch (err) {
    return res.status(500).json({ message: 'Failed', err });
  }
});

// POST new update
router.post('/upload_update', upload.single('fileUrl'), middleware.ensureAuthenticated, async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const fileUrl = req.file?.path;
    const authorId = req.session.Userid;

    if (!title || !description || !type) {
      return res.status(400).json({ message: 'Title, description, and type are required' });
    }

    const newUpdate = new updates_model({
      title,
      fileUrl,
      description,
      type,
      author: authorId
    });

    await newUpdate.save();
    return res.status(201).json({ message: 'Successfully uploaded update', data: newUpdate });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to upload update', error });
  }
});

// GET update by ID
router.get('/single_update/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid update id" });
  }

  try {
    const data = await updates_model.findById(id).populate("author");
    if (!data) {
      return res.status(404).json({ message: "Update not found" });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: "Failed", err });
  }
});

// Helper to extract Cloudinary public ID from fileUrl
function getCloudinaryPublicId(fileUrl) {
  if (!fileUrl) return null;
  // Example: https://res.cloudinary.com/xxx/raw/upload/v1234567890/ESTG_uploads/filename.pdf
  // We want: ESTG_uploads/filename (without extension)
  const urlParts = fileUrl.split('/');
  const publicIdWithExt = urlParts[urlParts.length - 1];
  const publicId = publicIdWithExt.split('.')[0];
  const folder = urlParts[urlParts.length - 2];
  return `${folder}/${publicId}`;
}

// PUT update by ID (with file replacement + Cloudinary deletion)
router.put('/edit_update/:id', upload.single('fileUrl'), middleware.ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title, description, type } = req.body;
  const fileUrl = req.file?.path;
  const authorId = req.session.Userid;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid update id" });
  }

  try {
    const existingUpdate = await updates_model.findById(id);
    if (!existingUpdate) {
      return res.status(404).json({ message: "Update not found" });
    }

    // Delete old Cloudinary file if new file uploaded
    if (fileUrl && existingUpdate.fileUrl) {
      const publicId = getCloudinaryPublicId(existingUpdate.fileUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
        } catch (err) {
          console.error('Failed to delete old file from Cloudinary:', err);
        }
      }
    }

    const updated_data = {
      title,
      description,
      type,
      author: authorId
    };

    if (fileUrl) {
      updated_data.fileUrl = fileUrl;
    }

    const data = await updates_model.findByIdAndUpdate(id, updated_data, { new: true });
    return res.status(200).json({ message: "Successfully edited update", data });
  } catch (err) {
    return res.status(400).json({ message: "Failed to update", err });
  }
});

// DELETE update by ID (with Cloudinary file deletion)
router.delete('/delete_update/:id', middleware.ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid update id" });
  }

  try {
    const data = await updates_model.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "Update not found" });
    }

    // Delete Cloudinary file
    if (data.fileUrl) {
      const publicId = getCloudinaryPublicId(data.fileUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
        } catch (err) {
          console.error('Failed to delete file from Cloudinary:', err);
        }
      }
    }

    return res.status(200).json({ message: "Successfully deleted update and file" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to delete", err });
  }
});

module.exports = router;
