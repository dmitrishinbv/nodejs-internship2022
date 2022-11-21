const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const middleware = require('../config/middleware');
const router = require('../config/router');

const app = express();

app.use(morgan(':method :url :status :res[content-length] bytes - :response-time ms'));

middleware.init(app);

router.init(app);

app.set('port', process.env.PORT || 3000);

module.exports = app;
