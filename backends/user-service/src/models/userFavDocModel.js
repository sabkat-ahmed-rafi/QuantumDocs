const mongoose = require('mongoose');

const userFavDocSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true, 
        unique: true,
        lowercase: true,
    },
    favouriteDocuments: {
        type: [String],
        default: []
    }
});


module.exports = mongoose.model("FavouriteDocument", userFavDocSchema);