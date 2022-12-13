const Joi = require('joi');

const schemas = {
    userPOST: Joi.object().keys({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().allow(null, ''),
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
    }),
    userPATCH: Joi.object().keys({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().allow(null, ''),
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
    }),
    userId: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }),
    findAllParams: Joi.object().keys({
        limit: Joi.number().integer().positive(),
        page: Joi.number().integer().positive(),
        page_size: Joi.number().integer().positive(),
    }),
};

module.exports = schemas;
