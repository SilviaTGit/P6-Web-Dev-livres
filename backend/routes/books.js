const express = require('express');
const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');
const bookCtrl = require('../controllers/books');

const router = express.Router();

/* POST request */
router.post('/', auth, multerConfig.upload, multerConfig.processImage, bookCtrl.createBook);

/* GET request */
router.get('/', bookCtrl.getAllBooks);

/* GET the 3 most rated books */
router.get('/bestrating', bookCtrl.getBestRating);

/* Requests with :id must be defined after those without parameters, otherwise Express will consider them as parameters */

/* GET request for one book */
router.get('/:id', bookCtrl.getOneBook);

/* PUT request */
router.put('/:id', auth, multerConfig.upload, multerConfig.processImage, bookCtrl.modifyBook);

/* DELETE request */
router.delete('/:id', auth, bookCtrl.deleteBook);

/* Add a review */
router.post('/:id/rating', auth, bookCtrl.ratingBook);

module.exports = router;