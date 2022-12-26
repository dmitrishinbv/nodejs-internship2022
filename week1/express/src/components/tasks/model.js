const mongoose = require('mongoose');

const db = require('../../config/mongoConnection');

const { Schema } = mongoose;

const taskSchema = new Schema({

    assignee: { type: Schema.Types.ObjectId },
    title: {
        type: String, index: true, required: true, trim: true,
    },
    description: {
        type: String, required: false, trim: true,
    },
    createdBy: {
        type: String, required: false, enum: ['Manager', 'Project Manager', 'QA', 'Teach Lead'],
    },
    estimatedTime: { type: Number, default: 0 },
    status: {
        type: String,
        required: false,
        enum: ['new', 'in progress', 'done'],
        default: 'new',
    },
});

const taskModel = db.model('Task', taskSchema);

module.exports = {
    taskModel,
};
