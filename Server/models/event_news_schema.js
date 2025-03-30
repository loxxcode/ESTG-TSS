const mongoose = require('mongoose');

const eventNewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: String,
    required: [true, 'Tags are required'],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EventNews', eventNewsSchema);



