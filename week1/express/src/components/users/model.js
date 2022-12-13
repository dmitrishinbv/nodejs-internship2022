const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String, required: true, unique: true, index: true, trim: true,
    },
    firstName: {
        type: String, index: true, required: true, trim: true,
    },
    lastName: {
        type: String, required: false, trim: true,
    },
    password: {
        type: String, required: true, trim: true,
    },
    registeredAt: { type: Date, default: Date.now() },
});

userSchema.pre('save', async function saveUser(next) {
    const user = this;

    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 8);

    return next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = {
    userModel,
    userSchema,
};
