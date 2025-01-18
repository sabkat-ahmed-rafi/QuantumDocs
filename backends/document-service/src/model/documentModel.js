const mongoose = require('mongoose');


const documentSchema = new mongoose.Schema({
    state: {
        type: Buffer, // Store the Delta as a Buffer
    },
    title: {
        type: String,
        default: "Untitle document",
    },
    owner: {
        type: String,
        required: true,
    },
    sharedPersons: [{
        email: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('Document', documentSchema);