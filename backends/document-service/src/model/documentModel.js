const mongoose = require('mongoose');


const documentSchema = new mongoose.Schema({
    state: {
        type: Buffer, // Store the Delta as a Buffer
        default: () => {
            // Default value as a JSON stringified Delta, converted to Buffer
            const delta = {
                ops: [
                    {
                        insert: "Hello world",
                        attributes: {
                            bold: true,
                            italic: true
                        }
                    },                ]
            };
            return Buffer.from(JSON.stringify(delta)); // Convert to Buffer
        },
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