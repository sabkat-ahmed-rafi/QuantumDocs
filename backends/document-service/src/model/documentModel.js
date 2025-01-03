const mongoose = require('mongoose');


const documentSchema = new mongoose.Schema({
    state: {
        type: Buffer,
        default: Buffer.from(''),
    },
    title: {
        type: String,
        default: "",
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