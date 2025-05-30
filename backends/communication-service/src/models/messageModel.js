const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    groupId: { type: String, required: true },
    sender: {
        uid: { type: String },
        photo: { type: String },
        email: { type: String },
        name: { type: String }
    },
    groupCall: {
        ongoing: { type: Boolean, default: false },
        startedBy: { type: String },
        createdAt: { type: Date, default: Date.now }
    },
    readBy: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema)