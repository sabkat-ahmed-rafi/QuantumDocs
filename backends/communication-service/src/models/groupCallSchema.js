const mongoose = require('mongoose');

const groupCallSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    ongoing: { type: Boolean, default: false },
    startedBy: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GroupCall', groupCallSchema);