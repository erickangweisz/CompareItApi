const express = require('express');
const ProductRoutes = require('./product');

const router = express.Router();
const apiPath = '/api';

router.use(apiPath, ProductRoutes);

module.exports = router;