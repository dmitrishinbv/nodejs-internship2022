const express = require('express');
const http = require('http');

const UsersRouter = require('../components/users/router');
const TasksRouter = require('../components/tasks/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/v1/user', UsersRouter);
        app.use('/v1/users', UsersRouter);
        app.use('/v1/task', TasksRouter);
        app.use('/v1/tasks', TasksRouter);

        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        app.use(router);
    },
};
