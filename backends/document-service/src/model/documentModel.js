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

}, { timestamps: true })

module.exports = mongoose.model('Document', documentSchema);