const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinaryConfig');
const upload = multer({ storage });
const router = express.Router();
const event_model = require('../models/event_schema.js');
const middleware = require("../middleware/AuthMiddleware")
const Account = require("../models/account_schema");
const mongoose = require("mongoose")
 
// GET all event for content creator
router.get('/all_events', async (req, res) => {
  try {

    data = await event_model.find();
    return res.status(200).json({ message: 'success', data });

  } catch (err) {
    return res.status(500).json({ message: 'Failed', err });
  }

});

// GET all event news for admin
router.get('/events', middleware.ensureAuthenticated, async (req, res) => {
  try {

    const user = await Account.findById(req.session.Userid)
    let data;

    if (user.role === 'Admin') {
      data = await event_model.find();

    } else if (user.role === 'Content_creator') {

      data = await event_model.find({ author: user._id });
    }

    return res.status(200).json({ message: 'success', data });

  } catch (err) {
    return res.status(500).json({ message: 'Failed', err });
  }

});

// POST new event news
router.post('/upload_events', upload.single('file'), middleware.ensureAuthenticated, async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file?.path;
    const authorId = req.session.Userid

    if (!title || !imageUrl || !description) {
      return res.status(400).json({ message: 'No Event uploaded' });
    }

    const newEvent = new event_model({
      title,
      imageUrl,
      description,
      author: authorId
    });

    await newEvent.save();
    return res.status(201).json({ message: 'Successfully uploaded event' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to upload' });
  }
});

// GET event news by ID
router.get('/single_event/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalid event id" });
  }
  try {
    const data = await event_model.findById(id);
    if (!data) {
      return res.status(404).json({ message: "invalid event id" });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: "Failed", err });
  }
});

// PUT (update) event news by ID
router.put('/update_event/:id', upload.single('file'), middleware.ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title, description, } = req.body;
  const imageUrl = req.file?.path;
  const authorId = req.session.Userid


  const updated_data = {
    title,
    imageUrl,
    description,
    author: authorId

  };
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalid update id" });
  }
  try {
    const data = await event_model.findByIdAndUpdate(id, updated_data, { new: true });
    if (!data) {
      return res.status(404).json({ message: "invalid event id" });
    }
    res.status(201).json({ message: "Successfully updated event/news", data });
  } catch (err) {
    return res.status(400).json({ message: "Failed", err });
  }
});

// DELETE event news by ID
router.delete('/delete_event/:id', middleware.ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalid event id" });
  }
  try {
    const data = await event_model.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "invalid event id" });
    }
    return res.status(200).json({ message: "Successfully deleted event/news" });
  } catch (err) {
    return res.status(400).json({ message: "Failed", err });
  }
});

module.exports = router;
