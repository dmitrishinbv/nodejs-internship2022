const Joi = require('joi');

const schemas = {
    userPOST: Joi.object().keys({
        name: Joi.string().min(2).max(50).required(),
        username: Joi.string().min(2).max(30).required(),
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
        website: Joi.string().uri({
            scheme: [
                /http?/, /https?/,
            ],
        }),
    }),
    userPATCH: Joi.object().keys({
        id: Joi.number().integer().positive(),
        name: Joi.string().min(2).max(50),
        username: Joi.string().min(2).max(30),
        password: Joi.string().min(6).max(20),
        email: Joi.string().email(),
        website: Joi.string().uri({
            scheme: [
                /http?/, /https?/,
            ],
        }),
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
