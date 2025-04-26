const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('event', eventSchema);



