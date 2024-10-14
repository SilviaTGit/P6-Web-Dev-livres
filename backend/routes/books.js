const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const bookCtrl = require('../controllers/books');

/* POST request */
router.post('/', auth, bookCtrl.createBook);

/* GET request */
router.get('/', auth, bookCtrl.getAllBooks);
router.get('/:id', auth, bookCtrl.getOneBook);

/* PUT request */
router.put('/:id', auth, bookCtrl.modifyBook);

/* DELETE request */
router.delete('/:id', auth, bookCtrl.deleteBook);

  module.exports = router;