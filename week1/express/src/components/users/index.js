const UserService = require('./service');

async function findAll(req, res) {
    try {
        const users = await UserService.findAll();

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

        return res.status(result.status).json({
            message: result.message,
            data: result.data,
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
        const user = await UserService.findById(req.params.id);

        if (user && user.length) {
            return res.status(200).json({
                data: user,
            });
        }

        return res.status(404).json({
            error: `User id=${req.params.id} not found`,
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
        const result = await UserService.deleteById(req.params.id);

        return res.status(result.status).json({
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function update(req, res) {
    try {
        const result = await UserService.update(Number(req.params.id), req.body);

        return res.status(result.status).json({
            message: result.message,
            data: result.data,
        });
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
};
