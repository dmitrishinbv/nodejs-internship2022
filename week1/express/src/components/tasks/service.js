const mongoose = require('mongoose');
const { taskModel } = require('./model');
const { userModel } = require('../users/model');

const pageSize = 5; // default value

async function findAll(params, user) {
    try {
        const filter = { assignee: mongoose.Types.ObjectId(user.user_id) };
        const count = await taskModel.count(filter);

        let tasks;

        if (!Object.keys(params).length) {
            tasks = await taskModel.find(filter);
        } else {
            const size = params.page_size ? Number(params.page_size) : pageSize;

            if (params.page && !params.limit) {
                const page = Number(params.page);
                const limit = page === 0 ? size : size + size * page;

                tasks = await taskModel.find(filter).limit(limit).skip(limit - size);
            }

            if (params.limit && !params.page) {
                tasks = await taskModel.find(filter).limit(Number(params.limit));
            }
        }

        return { tasks, totalTasks: count };
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

async function findById(id, user) {
    try {
        return await taskModel.findOne({
            _id: id,
            assignee: user.user_id,
        });
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

async function updateById(id, user, props) {
    return taskModel.findOneAndUpdate({
        _id: id,
        assignee: user.user_id,
    }, props, { new: true });
}

async function deleteById(id, user) {
    try {
        return await taskModel.deleteOne({
            _id: id,
            assignee: user.user_id,
        });
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

async function create(props, user) {
    const data = props;

    if (!data.description) {
        data.description = '';
    }
    data.assignee = user.user_id;

    const task = taskModel(data);

    try {
        await task.save();
        console.log('Task has been saved successfully');
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }

    return true;
}

async function aggregateUserTasks(userId) {
    try {
        const result = await userModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(userId) },
            },
            {
                $lookup: {
                    from: 'tasks', localField: '_id', foreignField: 'assignee', as: 'tasks',
                },
            },
            {
                $project: {
                    name: { $concat: ['$firstName', ' ', '$lastName'] },
                    tasks: '$tasks',
                    totalTasks: { $size: '$tasks' },
                    totalEstimation: { $sum: '$tasks.estimatedTime' },
                },
            },
        ]);

        return result[0] || [];
    } catch (error) {
        console.error(error);

        return { error: error.message };
    }
}

module.exports = {
    create,
    findAll,
    findById,
    updateById,
    deleteById,
    aggregateUserTasks,
};
