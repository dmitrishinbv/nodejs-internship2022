const { userModel } = require('./model');

async function findAll() {
    try {
        return await userModel.find();
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

async function findById(id) {
    try {
        return await userModel.findOne({ _id: id });
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

async function findByEmail(email) {
    try {
        return await userModel.findOne({ email });
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

async function updateById(id, props) {
    return userModel.findOneAndUpdate({ _id: id }, props, { new: true });
}

async function updateByEmail(email, props) {
    return userModel.findOneAndUpdate({ email }, props, { new: true });
}

async function deleteById(id) {
    try {
        return await userModel.deleteOne({ _id: id });
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

async function deleteByEmail(email) {
    try {
        return await userModel.deleteOne({ email });
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

async function create(props) {
    const user = userModel(props);

    try {
        await user.save();
        console.log('User has been saved successfully');
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }

    return true;
}

module.exports = {
    create,
    findAll,
    findById,
    findByEmail,
    updateById,
    updateByEmail,
    deleteById,
    deleteByEmail,
};
