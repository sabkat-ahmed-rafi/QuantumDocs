const bcrypt = require('bcryptjs');

module.exports = (userSchema) => {
    // Middleware to hash passwords before saving
    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });

    // Middleware to hash passwords before updating
    userSchema.pre('findOneAndUpdate', async function (next) {
        const update = this.getUpdate();
        if (update.password) {
            const hashedPassword = await bcrypt.hash(update.password, 10);
            this.setUpdate({ ...update, password: hashedPassword });
        }
        next();
    });
};
