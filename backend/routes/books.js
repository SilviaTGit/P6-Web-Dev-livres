const express = require('express');
const auth = require('../middleware/auth');
const multerConfig = require('../middleware/multer-config');
const bookCtrl = require('../controllers/books');

const router = express.Router();

/* POST request */
router.post('/', auth, multerConfig.upload, multerConfig.processImage, bookCtrl.createBook);

/* GET request */
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);

/* PUT request */
router.put('/:id', auth, multerConfig.upload, multerConfig.processImage, bookCtrl.modifyBook);

/* DELETE request */
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;