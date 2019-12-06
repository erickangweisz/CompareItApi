const express = require('express');
const ProductController = require('../controllers/product');

const router = express.Router();

router.get(
    '/search',
    ProductController.search
);

module.exports = router;