const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();
const bookCtrl = require('../controllers/books');

/* POST request */
router.post('/', auth, multer, bookCtrl.createBook);

/* GET request */
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);

/* PUT request */
router.put('/:id', auth, multer, bookCtrl.modifyBook);

/* DELETE request */
router.delete('/:id', auth, bookCtrl.deleteBook);

  module.exports = router;