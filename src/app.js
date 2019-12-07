const express = require('express');
const httpHeaders = require('./middlewares/http-header');
const routes = require('./routes');

const app = express();
app.use(httpHeaders);
app.use(routes);

module.exports = app;