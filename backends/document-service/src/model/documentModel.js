const mongoose = require('mongoose');

const defaultDelta = { ops: [{insert: "hello World"}] };

const documentSchema = new mongoose.Schema({
    state: {
        type: Buffer, // Store the Delta as a Buffer
        default: Buffer.from(JSON.stringify(defaultDelta)),
    },
    title: {
        type: String,
        default: "Untitle document",
    },
    owner: {
        email: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
        }
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