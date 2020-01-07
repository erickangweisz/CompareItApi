const express = require('express');
const serverFiles = require('./services/server-files');
const httpHeaders = require('./middlewares/http-header');
const routes = require('./routes');

const app = express();

app.use(serverFiles);
app.use(httpHeaders);
app.use(routes);

module.exports = app;