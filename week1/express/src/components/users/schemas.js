const Joi = require('joi');

const schemas = {
    userPOST: Joi.object().keys({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().allow(null, ''),
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
    }),
    userPATCH: Joi.object().keys({
        firstName: Joi.string().min(2).max(50),
        lastName: Joi.string().allow(null, ''),
        password: Joi.string().min(6).max(20),
        email: Joi.string().email(),
    }),
    userParams: Joi.object().keys({
        id: Joi.string(),
        email: Joi.string(),
    }),
    findAllParams: Joi.object().keys({
        limit: Joi.number().integer().positive(),
        page: Joi.number().integer(),
        page_size: Joi.number().integer().positive(),
    }),
};

module.exports = schemas;
