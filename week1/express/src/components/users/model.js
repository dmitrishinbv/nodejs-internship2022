const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const db = require('../../config/mongoConnection');

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

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 8);

    return next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = { ...this.getUpdate() };

    if (update.password) {
        update.password = await bcrypt.hash(update.password, 8);
        this.setUpdate(update);
    }

    return next();
});

const userModel = db.model('User', userSchema);

module.exports = {
    userModel,
};
