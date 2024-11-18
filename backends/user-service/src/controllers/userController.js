const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {

        const { name, email, password, bio } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            bio
        });

        await newUser.save();

        res.status(201).json({ message: 'Document created successfully', user: newUser });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}