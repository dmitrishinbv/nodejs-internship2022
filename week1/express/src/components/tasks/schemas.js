const Joi = require('joi');

const schemas = {
    taskPOST: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().allow(null, ''),
        createdBy: Joi.string().allow(null, ''),
        estimatedTime: Joi.number().integer().positive().allow(null, 0),
    }),
    taskPATCH: Joi.object().keys({
        estimatedTime: Joi.number().integer().positive().allow(null, 0),
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
