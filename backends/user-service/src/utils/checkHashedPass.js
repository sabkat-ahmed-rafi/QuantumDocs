const bcrypt = require('bcryptjs');

module.exports = (userSchema) => {
    // Method to compare passwords
    userSchema.methods.comparePassword = async function (plainPassword) {
        return bcrypt.compare(plainPassword, this.password);
    };
};