const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
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

module.exports = mongoose.model('Announcement', announcementSchema);




