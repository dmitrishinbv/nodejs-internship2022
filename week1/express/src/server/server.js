const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const middleware = require('../config/middleware');
const router = require('../config/router');

const app = express();

middleware.init(app);

router.init(app);

app.set('port', process.env.PORT || 3000);

module.exports = app;
