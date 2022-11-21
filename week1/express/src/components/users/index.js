const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserService = require('./service');

function validateNumberParams(params, res) {
    res.status(200);
    params.forEach((param) => {
        const schema = Joi.number().integer().positive().required();
        const result = schema.validate(param.value);
        const { value, error } = result;
        const valid = error == null;

        if (!valid) {
            res.status(422).json({
                message: `Invalid input param '${param.name}' - ${error}`,
                value,
            });
        }
    });

    return res;
}

async function findAll(req, res) {
    try {
        const params = [];

        // validate query params
        if (req.query.limit) {
            params.push({ name: 'limit', value: req.query.limit });
        }

        if (req.query.page) {
            params.push({ name: 'page', value: req.query.page });
        }

        if (req.query.page_size) {
            params.push({ name: 'page_size', value: req.query.page_size });
        }

        const validateResult = validateNumberParams(params, res);

        if (validateResult.statusCode === 200) {
            const users = UserService.findAll(req.query);

            return res.status(200).json({
                data: users,
            });
        }

        return validateResult;
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function create(req, res) {
    try {
        const result = await UserService.create(req.body);

        return res.status(201).json({
            message: 'Created',
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function findById(req, res) {
    try {
        const { id } = req.params;
        const validateResult = validateNumberParams([{ name: 'id', value: id }], res);

        if (validateResult.statusCode === 200) {
            const user = UserService.findById(Number(id));

            if (user && user.length) {
                return res.status(200).json({
                    data: user,
                });
            }

            return res.status(404).json({
                error: `User with id ${id} not found`,
            });
        }

        return validateResult;
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function deleteById(req, res) {
    try {
        const { id } = req.params;
        const validateResult = validateNumberParams([{ name: 'id', value: id }], res);

        if (validateResult.statusCode === 200) {
            const result = UserService.deleteById(Number(id));

            if (result) {
                const status = result.length ? 200 : 404;
                const data = result.length ? { message: 'Success', data: result }
                    : { error: `User with id ${id} not found`, data: result };

                return res.status(status).json(data);
            }
        }

        return validateResult;
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id || req.body.id;
        const validateResult = validateNumberParams([{ name: 'id', value: id }], res);

        if (validateResult.statusCode === 200) {
            const result = UserService.update(Number(id), req.body);

            if (result) {
                const status = result.length ? 200 : 404;
                const data = result.length ? { message: 'Success', data: result }
                    : { error: `User with id ${id} not found`, data: result };

                return res.status(status).json(data);
            }
        }

        return validateResult;
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function userSign(req, res) {
    const { username, password } = req.body;

    if (!(username && password)) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = UserService.findByUsername(username);

    if (user && password === user.password) {
        user.token = jwt.sign(
            { user_id: user.id, name: user.username },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '1800s',
            },
        );

        return res.status(200).setHeader('Authorization', user.token).json(user);
    }

    return res.status(401).json({ message: 'The username and password your provided are invalid' });
}

module.exports = {
    findAll,
    create,
    findById,
    deleteById,
    update,
    userSign,
};
