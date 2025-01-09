const mongoose = require('mongoose');


const documentSchema = new mongoose.Schema({
    state: {
        type: Buffer,
        default: Buffer.from('Hello world'),
    },
    title: {
        type: String,
        default: "title",
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