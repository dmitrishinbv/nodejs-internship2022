const TaskService = require('./service');

async function findAll(req, res) {
    try {
        const tasks = await TaskService.findAll(req.query, req.user);

        return res.status(200).json({
            data: tasks,
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
        const result = await TaskService.create(req.body, req.user);

        if (result && result.error) {
            return res.status(500).json({
                error: result.error,
            });
        }

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

        const data = id === 'all' ? await TaskService.aggregateUserTasks(req.user.user_id)
            : await TaskService.findById(id, req.user);

        if (data) {
            return res.status(200).json({
                data,
            });
        }

        return res.status(404).json({
            error: `Task with id ${id} not found`,
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
        const result = await TaskService.deleteById(id, req.user);

        const status = result.acknowledged && result.deletedCount ? 200 : 404;
        const data = status === 200 ? { message: 'Success', data: result }
            : { error: `Task with id ${id} not found`, data: null };

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
            result = await TaskService.updateById(id, req.user, req.body);
        }

        const status = result ? 200 : 404;
        const data = result ? { message: 'Success', data: result }
            : { error: `Task with id ${id} not found`, data: null };

        return res.status(status).json(data);
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
