const mongoose = require('mongoose');

const updatesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },

    description: {
        type: String,
        required: [true, 'Description is required']
    },
    fileUrl: {
        type: String,
        required:false
    },
    fileId: { type: String },
    type: {
        type: String,
        required: true,
        enum: ['news', 'announcement']

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('updates', updatesSchema);




