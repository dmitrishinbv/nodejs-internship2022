const jwt = require('jsonwebtoken');
const UserService = require('./service');

async function findAll(req, res) {
    try {
        const users = UserService.findAll(req.query);

        return res.status(200).json({
            data: users,
        });
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
        const id = req.params.id || req.query.id;

        const user = UserService.findById(Number(id));

        if (user && user.length) {
            return res.status(200).json({
                data: user,
            });
        }

        return res.status(404).json({
            error: `User with id ${id} not found`,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function deleteById(req, res) {
    try {
        const id = req.params.id || req.query.id;
        const result = UserService.deleteById(id);

        const status = result.length ? 200 : 404;
        const data = result.length ? { message: 'Success', data: result }
            : { error: `User with id ${id} not found`, data: result };

        return res.status(status).json(data);
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
        const result = UserService.update(Number(id), req.body);

        const status = result.length ? 200 : 404;
        const data = result.length ? { message: 'Success', data: result }
            : { error: `User with id ${id} not found`, data: result };

        return res.status(status).json(data);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function userSign(req, res) {
    try {
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
                    expiresIn: '1h',
                },
            );

            res.status(200).setHeader('Authorization', user.token);

            return res.json(user);
        }

        return res.status(401).json({ message: 'The username and password your provided are invalid' });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

module.exports = {
    findAll,
    create,
    findById,
    deleteById,
    update,
    userSign,
};
