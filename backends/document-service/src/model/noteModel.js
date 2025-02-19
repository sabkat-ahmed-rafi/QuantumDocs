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
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Notes', noteSchema);