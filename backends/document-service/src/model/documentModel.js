const mongoose = require('mongoose');

const defaultDelta = { ops: [{insert: "hello World"}] };

const documentSchema = new mongoose.Schema({
    state: {
        type: Buffer, // Store the Delta as a Buffer
        default: Buffer.from(JSON.stringify(defaultDelta)),
    },
    title: {
        type: String,
        default: "Untitled document",
    },
    owner: {
        email: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
        },
        name: {
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
        },
        name: {
            type: String,
        },
        role: {
            type: String,
            default: "Viewer"
        }
    }],
    accessStatus: {
        isRestricted: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            default: "Viewer"
        }
        
    },
    preview: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Document', documentSchema);