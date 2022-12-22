const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require('./service');

async function findAll(req, res) {
    try {
        const users = await UserService.findAll(req.query);

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

        if (result && result.error) {
            return res.status(500).json({
                error: result.error,
            });
        }

        return res.status(201).json({
            message: 'Created',
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

        const user = await UserService.findById(id);

        if (user) {
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
        const result = await UserService.deleteById(id);

        const status = result.acknowledged && result.deletedCount ? 200 : 404;
        const data = status === 200 ? { message: 'Success', data: result }
            : { error: `User with id ${id} not found`, data: null };

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
        let result;

        if (id) {
            result = await UserService.updateById(id, req.body);
        } else {
            const email = req.params.email || req.body.email;

            if (email) {
                result = await UserService.updateByEmail(email, req.body);
            }
        }

        const status = result ? 200 : 404;
        const data = result ? { message: 'Success', data: result }
            : { error: `User with id ${id} not found`, data: null };

        return res.status(status).json(data);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function userSign(req, res) {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await UserService.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'User with this email not found' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (user && passwordCompare) {
            const token = jwt.sign(
                { user_id: user.id, name: user.firstName },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '1h',
                },
            );

            res.status(200).setHeader('Authorization', token);

            return res.json({ token });
        }

        return res.status(401).json({ message: 'The password your provided is invalid' });
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
