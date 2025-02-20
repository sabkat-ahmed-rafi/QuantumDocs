const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: true
    },
    notes: [{
        value: {
            type: String,
            required: true
        },
        name: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Notes', noteSchema);