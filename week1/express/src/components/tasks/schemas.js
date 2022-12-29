const Joi = require('joi');

const schemas = {
    taskPOST: Joi.object().keys({
        title: Joi.string().required(),
        assignee: Joi.string(),
        description: Joi.string().allow(null, ''),
        createdBy: Joi.string().valid(null, 'Manager', 'Project Manager', 'QA', 'Teach Lead'),
        estimatedTime: Joi.number().integer().positive().allow(null, 0),
        status: Joi.string().valid(null, 'new', 'in progress', 'done'),
    }),
    taskPATCH: Joi.object().keys({
        estimatedTime: Joi.number().integer().positive().allow(null, 0),
        status: Joi.string(),
    }),
    taskID: Joi.object().keys({
        id: Joi.string().required(),
    }),
    findAllParams: Joi.object().keys({
        limit: Joi.number().integer().positive(),
        page: Joi.number().integer(),
        page_size: Joi.number().integer().positive(),
    }),
};

module.exports = schemas;
