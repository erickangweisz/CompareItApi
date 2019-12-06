const Router = require('express');
const ProductController = require('../controllers/product');

const router = Router();

router.get(
    '/search/:term',
    ProductController.search
);


// app.route('/book')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   });

module.exports = router;