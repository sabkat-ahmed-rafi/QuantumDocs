const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    documentId: {
        type: Number,
        required: true
    },
    notes: [{
        note: {
            type: String,
            required: true
        },
        name: {
            type: String,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Notes', noteSchema);