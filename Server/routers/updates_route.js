const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinaryConfig.js');
const upload = multer({ storage });
const router = express.Router();
const updates_model = require('../models/updates_schema.js');
const middleware = require("../middleware/AuthMiddleware.js")

// GET all updates news
router.get('/updates', middleware.ensureAuthenticated, async (req, res) => {
  try {
    const user = await Account.findById(req.session.Userid)
    let data;

    if (user.role === 'Admin') {
      data = await updates_model.find();

    } else if (user.role === 'Content_creator') {

      data = await updates_model.find({ author: user._id });
    }
    return res.status(200).json({ message: 'success', data });
  } catch (err) {
    return res.status(500).json({ message: 'Failed', err });
  }
});

// POST new updates 
router.post('/upload_update', upload.single('file'), middleware.ensureAuthenticated, async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const fileUrl = req.file?.path;
    const authorId = req.session.Userid

    if (!title || !fileUrl || !description || !type) {
      return res.status(400).json({ message: 'No updates uploaded' });
    }

    const newupdates = new updates_model({
      title,
      fileUrl,
      description,
      type,
      author: authorId

    });

    await newupdates.save();
    return res.status(201).json({ message: 'Successfully uploaded updates' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to upload' });
  }
});

// GET updates news by ID
router.get('/single_update/:id', middleware.ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await updates_model.findById(id);
    // if (!mongoose.Types.ObjectId.isValid("680cace52f794a774caa144b")) {
    //   return res.status(404).json({ message: "invalid update id" });
    // }
    if (!data) {
      return res.status(404).json({ message: "invalid update id" });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: "Failed", err });
  }
});

// PUT (update) updates news by ID
router.put('/edit_update/:id', upload.single('file'), middleware.ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title, description, type } = req.body;
  const fileUrl = req.file?.path;
  const authorId = req.session.Userid

  const updated_data = {
    title,
    fileUrl,
    description,
    type,
    authorId
  };

  try {
    const data = await updates_model.findByIdAndUpdate(id, updated_data, { new: true });
    if (!data) {
      return res.status(404).json({ message: "invalid updates id" });
    }
    res.status(201).json({ message: "Successfully edited update", data });
  } catch (err) {
    return res.status(400).json({ message: "Failed", err });
  }
});

// DELETE updates news by ID
router.delete('/delete_update/:id', middleware.ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await updates_model.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "invalid updates id" });
    }
    return res.status(200).json({ message: "Successfully deleted update" });
  } catch (err) {
    return res.status(400).json({ message: "Failed", err });
  }
});

module.exports = router;
